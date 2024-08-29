import { AnimatePresence } from 'framer-motion';

import DropZone from '@/components/drop-zone';
import FileMenu from '@/components/file-menu';

import ModelViewer from '@vctrl/viewer/src/lib/vectreal-viewer';
import { useModelContext } from '@vctrl/hooks/src/use-load-model';

const Editor = () => {
  const { file } = useModelContext();

  return (
    <section className="h-dvh overflow-hidden mx-[-1rem]">
      <AnimatePresence mode="wait">
        {file?.model ? (
          <ModelViewer gridOptions={{ showGrid: true }} />
        ) : (
          <DropZone />
        )}
      </AnimatePresence>
      <FileMenu />
    </section>
  );
};

export default Editor;
