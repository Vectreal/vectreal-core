import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UploadIcon } from '@radix-ui/react-icons';

import { useModelContext } from '@vctrl/hooks/src/use-load-model';

import { useIsMobile } from '@/lib/hooks';

import TypographyLead from './typography/typography-lead';
import TypographyMuted from './typography/typography-muted';
import { Card, CardContent } from './ui/card';

const AnimatedContainer = motion.div;
const DropZone = () => {
  const isMobile = useIsMobile();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone(
      isMobile // only set accept restrictions on desktop - for some reason doesn't work on IOS
        ? {}
        : {
            accept: {
              'model/gltf-binary': ['.glb'],
              'model/gltf+json': ['.gltf', '.bin'],
              'model/vnd.usdz+zip': ['.usdz'],
              'model/vnd.usda': ['.usda'],
              'image/jpeg': ['.jpeg', '.jpg'],
              'image/png': ['.png'],
            },
          },
    );

  const { handleFileUpload } = useModelContext();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      handleFileUpload(acceptedFiles);
    }
  }, [acceptedFiles, handleFileUpload]);

  const easeTransition = 'transition ease-in-out duration-300';
  const shadow = isDragActive
    ? 'shadow-xl border-zinc-500'
    : 'shadow-s border-zinc-800';

  return (
    <AnimatedContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      key="Drop-zone"
      className="w-full h-full p-4 pt-16 pb-24"
    >
      <Card
        className={`w-full h-full border-2 border-dashed cursor-pointer ${shadow} ${easeTransition} bg-transparent filter-drop-shadow`}
      >
        <CardContent className="w-full h-full p-0">
          <div
            {...getRootProps({
              className: `w-full h-full flex flex-col items-center justify-center gap-4 text-center`,
            })}
          >
            <UploadIcon className="w-8 h-8 mb-6" />
            <TypographyLead isHighlighted={isDragActive}>
              Click here, or drag and drop a 3D model
            </TypographyLead>
            <TypographyMuted>GLTF, GLB or USDZ</TypographyMuted>
            <input {...getInputProps()} />
          </div>
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default DropZone;
