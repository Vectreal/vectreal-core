import { Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MutatingDots } from 'react-loader-spinner';

import { clsx } from 'clsx';
import { Object3D, PerspectiveCamera, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Grid,
  GridProps as ThreeGridProps,
  OrbitControls,
  OrbitControlsProps,
  Stage,
} from '@react-three/drei';

import { useModelContext } from '@vctrl/hooks/src/use-load-model';

interface ModelProps {
  object: null | Object3D;
}

const Model = (props: ModelProps) => {
  const { object } = props;

  const model = object || null;

  if (!model) return null;

  return (
    <Stage
      center={{ top: true }}
      preset="rembrandt"
      intensity={0.1}
      adjustCamera={1.5}
      shadows="contact"
      environment="city"
    >
      <primitive object={model} />
    </Stage>
  );
};

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center absolute top-0 right-0 bottom-0 left-0">
      <MutatingDots
        height="100px"
        width="100px"
        color="#fff"
        secondaryColor="#fff"
      />
    </div>
  );
};

interface CameraProps {
  initialCameraPosition?: Vector3;
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
}

interface ControlsProps extends OrbitControlsProps {
  controlsTimeout?: number;
}

interface GridProps extends ThreeGridProps {
  showGrid: boolean;
}

interface VectrealViewerProps {
  model?: Object3D;
  className?: string;
  cameraOptions?: CameraProps;
  controlsOptions?: ControlsProps;
  gridOptions?: GridProps;
  loader?: () => JSX.Element;
}

const VectrealViewer = ({ model, ...props }: VectrealViewerProps) => {
  const [isControlsEnabled, setIsControlsEnabled] = useState(false);
  const { file, isFileLoading } = useModelContext();

  const { cameraOptions, gridOptions } = props;
  let { className, controlsOptions, loader: Loader } = props;

  // wait for the stage component to center the model
  // after 1 second enable the controls
  useEffect(() => {
    if (isControlsEnabled || isFileLoading || !file || !model) return;

    const timeoutId = setTimeout(
      () => setIsControlsEnabled(true),
      controlsOptions?.controlsTimeout || 1500,
    );

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  className = clsx('w-full h-full', className);

  const { initialCameraPosition, fov, aspect, near, far } = {
    initialCameraPosition: new Vector3(0, 5, 5),
    ...cameraOptions,
  };

  const camera = useMemo(() => {
    const camera = new PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(...initialCameraPosition.toArray());
    return camera;
  }, [aspect, far, fov, initialCameraPosition, near]);

  controlsOptions = {
    camera,
    enabled: controlsOptions?.enabled,
    maxPolarAngle: Math.PI / 2,
    autoRotate: true,
    makeDefault: true,
    ...controlsOptions,
  };

  const { showGrid = false, ...gridOptionsRest } = {
    cellSize: 0.5,
    sectionSize: 5,
    sectionColor: 'rgb(134, 73, 33)',
    cellColor: 'rgb(100, 100, 100)',
    fadeDistance: 25,
    fadeStrength: 1,
    args: [10, 10],
    followCamera: false,
    infiniteGrid: true,
    ...gridOptions,
  };

  Loader = Loader || Loading;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      key="model-viewer"
      className="w-full h-full"
    >
      {isFileLoading && <Loader />}

      <Suspense fallback={<Loader />}>
        <Canvas className={className} dpr={[1, 1.5]} camera={camera} shadows>
          <OrbitControls {...controlsOptions} />
          <Model object={model || file?.model || null} />
          {showGrid && <Grid {...(gridOptionsRest as GridProps)} />}
        </Canvas>
      </Suspense>
    </motion.div>
  );
};

export default VectrealViewer;
