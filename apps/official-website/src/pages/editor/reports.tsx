import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Cross2Icon,
  CubeIcon,
} from '@radix-ui/react-icons';
import { useModelContext } from '@vctrl/hooks/use-load-model';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@vctrl/shared/components';
import { cn } from '@vctrl/shared/lib/utils';

/**
 * Format the file size for display.
 *
 * @param bytes - The size in bytes.
 * @returns A human-readable file size string.
 */
const formatFileSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else {
    return `${bytes} bytes`;
  }
};

/**
 * A tag to display on a card to indicate how much smaller the model got.
 *
 * @param children - The children to render inside the tag.
 * @returns A JSX element for the improvement tag.
 */
const ImprovementTag = ({ children }: PropsWithChildren) => (
  <span className="inline-flex items-center gap-1 text-xs pl-2 font-medium text-lime-400">
    {children}
  </span>
);

interface ImprovementDescriptionProps {
  improvements: {
    totalSize: number;
  };
  initialFileSize: number;
  currentFileSize: number;
}

/**
 * A component to display the size savings of a model.
 *
 * @param improvements - An object with a single property, `totalSize`, which is the total number of bytes saved.
 * @param initialFileSize - The size of the model when it was first loaded.
 * @param currentFileSize - The size of the model after all optimisations have been applied.
 * @returns A JSX element that displays the size savings.
 */
const ImprovementDescription = ({
  improvements,
  initialFileSize,
  currentFileSize,
}: ImprovementDescriptionProps) => (
  <CardDescription>
    The total file size was reduced by
    <span className="flex items-center gap-2">
      <span className="font-semibold text-lime-400 text-lg flex items-center gap-2">
        <CubeIcon />
        {formatFileSize(improvements.totalSize)}
      </span>
      <span className="flex items-center gap-2">
        {formatFileSize(initialFileSize)} <ArrowRightIcon />{' '}
        {formatFileSize(currentFileSize)}
      </span>
    </span>
  </CardDescription>
);

interface ReportsProps {
  show: boolean;
  setShow: (showReports: boolean) => void;
}

/**
 * A component to display the size and optimization reports.
 *
 * @param show - Whether or not to show the reports.
 * @param setShow - A function to set whether or not to show the reports.
 * @returns A JSX element that displays the size savings.
 */
const Reports = ({ show, setShow }: ReportsProps) => {
  const { optimize, on, off } = useModelContext();
  const { report, getSize, reset: resetOptimize } = optimize;

  const [size, setSize] = useState<ReturnType<typeof getSize> | null>(null);
  const [initialCaptured, setInitialCaptured] = useState(false);
  const initialReports = useRef<{
    report: typeof report;
    size: typeof size;
  } | null>(null);

  /**
   * Reset function to reset all optimization state.
   */
  const reset = useCallback(() => {
    setSize(null);
    setShow(false);
    setInitialCaptured(false);
    resetOptimize();
    initialReports.current = null;
  }, [setShow, resetOptimize]);

  useEffect(() => {
    // Update the current size whenever the report changes
    setSize(getSize());
  }, [getSize, report]);

  useEffect(() => {
    // Capture the initial report and size before any optimizations
    if (!initialCaptured && report && size) {
      initialReports.current = { report, size };
      setInitialCaptured(true);
    }
  }, [initialCaptured, report, size]);

  useEffect(() => {
    // Reset the optimization state when a new model is loaded
    on('load-start', reset);

    return () => {
      off('load-start', reset);
    };
  }, [off, on, reset]);

  if (!report) {
    return null;
  }

  // Retrieve the initial reports and sizes
  const initial = initialReports.current;
  /**
   * Helper function to sum a specific property over an array of objects.
   *
   * @param items - Array of objects with a numeric property.
   * @param property - Name of the property to sum.
   * @returns Sum of the property values.
   */
  const sumProperty = <K extends string>(
    items: Record<K, number>[],
    property: K,
  ): number => items.reduce((total, item) => total + (item[property] || 0), 0);

  // Safely retrieve the initial totals
  const initialVerticesTotal = initial?.report?.meshes?.properties
    ? sumProperty(initial.report.meshes.properties, 'vertices')
    : 0;

  const initialPrimitivesTotal = initial?.report?.meshes?.properties
    ? sumProperty(initial.report.meshes.properties, 'glPrimitives')
    : 0;

  const initialTexturesSizeTotal = initial?.report?.textures?.properties
    ? sumProperty(initial.report.textures.properties, 'size')
    : 0;

  const initialFileSize = initial?.size?.fileSize || 0;

  // Safely retrieve the current totals
  const currentVerticesTotal = report?.meshes?.properties
    ? sumProperty(report.meshes.properties, 'vertices')
    : 0;

  const currentPrimitivesTotal = report?.meshes?.properties
    ? sumProperty(report.meshes.properties, 'glPrimitives')
    : 0;

  const currentTexturesSizeTotal = report?.textures?.properties
    ? sumProperty(report.textures.properties, 'size')
    : 0;

  const currentFileSize = size?.fileSize || 0;

  // Calculate the improvements
  const improvements = {
    verticesCount: initialVerticesTotal - currentVerticesTotal,
    primitivesCount: initialPrimitivesTotal - currentPrimitivesTotal,
    texturesSize: initialTexturesSizeTotal - currentTexturesSizeTotal,
    totalSize: initialFileSize - currentFileSize,
  };

  /**
   * Calculate the percentage improvement.
   *
   * @param improvement - The absolute improvement (positive or negative).
   * @param initialTotal - The initial total value.
   * @returns The percentage improvement (a value between -100 and 100).
   */
  const calculatePercentageImprovement = (
    improvement: number,
    initialTotal: number,
  ): number => {
    if (initialTotal === 0) {
      // Avoid division by zero; if initial total is zero, return 0% improvement
      return 0;
    }
    return Math.round((improvement / initialTotal) * 100);
  };

  // Calculate the percentage improvements
  const percentageImprovements = {
    verticesCount: calculatePercentageImprovement(
      improvements.verticesCount,
      initialVerticesTotal,
    ),
    primitivesCount: calculatePercentageImprovement(
      improvements.primitivesCount,
      initialPrimitivesTotal,
    ),
    texturesSize: calculatePercentageImprovement(
      improvements.texturesSize,
      initialTexturesSizeTotal,
    ),
    totalSize: calculatePercentageImprovement(
      improvements.totalSize,
      initialFileSize,
    ),
  };

  /**
   * Format the improvement percentage for display.
   *
   * @param percentage - The percentage improvement.
   * @returns A formatted string representing the improvement.
   */
  const formatImprovementPercentage = (percentage: number) => {
    if (percentage > 0) {
      return (
        <>
          <ArrowDownIcon />
          {`${percentage}%`}
        </>
      );
    } else if (percentage < 0) {
      return (
        <>
          <ArrowUpIcon />
          {`${Math.abs(percentage)}%`}
        </>
      );
    } else {
      return '0%';
    }
  };

  return (
    <Card
      className={cn(
        'fixed min-w-80 top-1/2 -translate-y-1/2 transition-all duration-300',
        show && 'opacity-100 left-4 visible',
        !show && 'opacity-0 -left-4 invisible',
      )}
    >
      <Button
        onClick={() => setShow(false)}
        variant="ghost"
        aria-label="Close reports"
        title="Close reports"
        className="absolute p-1 h-6 w-6 top-2 right-2"
      >
        <Cross2Icon />
      </Button>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        {improvements.totalSize > 0 ? (
          <ImprovementDescription
            improvements={improvements}
            initialFileSize={initialFileSize}
            currentFileSize={currentFileSize}
          />
        ) : (
          'No improvements yet'
        )}
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4">
          <li>
            <p>Vertices:</p> <small>{currentVerticesTotal} </small>
            <ImprovementTag>
              {formatImprovementPercentage(
                percentageImprovements.verticesCount,
              )}
            </ImprovementTag>
          </li>
          <li>
            <p>Primitives:</p> <small>{currentPrimitivesTotal} </small>
            <ImprovementTag>
              {formatImprovementPercentage(
                percentageImprovements.primitivesCount,
              )}
            </ImprovementTag>
          </li>
          <li>
            <p>Textures Size:</p>
            <small>{formatFileSize(currentTexturesSizeTotal)}</small>
            <ImprovementTag>
              {formatImprovementPercentage(percentageImprovements.texturesSize)}
            </ImprovementTag>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Reports;
