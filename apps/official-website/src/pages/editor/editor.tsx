import { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { toast } from 'sonner';
import { Vector3 } from 'three';

import { VectrealViewer } from '@vctrl/viewer';
import {
  ModelFile,
  ModelProvider,
  useModelContext,
} from '@vctrl/hooks/use-load-model';
import { useOptimizeModel } from '@vctrl/hooks/use-optimize-model';

import { EditorProvider, useEditorContext } from '../../components/providers';
import UploadInfoDialog from './upload-info-dialog';
import DropZone from './drop-zone';
import FileMenu from './file-menu';

const Editor = () => {
  const { isFileLoading, on, off, reset } = useModelContext();
  const { enableAutoRotate } = useEditorContext();

  const [hasShownInfo, setHasShownInfo] = useState(
    !!window.sessionStorage.getItem('hasShownInfo'),
  );

  const [hasInput, setHasInput] = useState(false);

  function handleReset() {
    setHasInput(false);
  }

  function handleNotLoadedFiles(files?: File[]) {
    toast.error(`Not loaded files: ${files?.map((f) => f.name).join(', ')}`);
  }

  function handleLoadComplete(data?: ModelFile | null) {
    if (data) {
      toast.success(`Loaded ${data.name}`);
    }
  }

  function handleLoadError(error: unknown) {
    console.error('Load error:', error);
    toast.error(error as string);

    setHasInput(false);
    reset();
  }

  useEffect(() => {
    on('load-reset', handleReset);
    on('not-loaded-files', handleNotLoadedFiles);
    on('load-complete', handleLoadComplete);
    on('load-error', handleLoadError);

    return () => {
      off('load-reset', handleReset);
      off('not-loaded-files', handleNotLoadedFiles);
      off('load-complete', handleLoadComplete);
      off('load-error', handleLoadError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFileLoading && !hasInput) {
      setHasInput(true);
    }
  }, [isFileLoading, hasInput]);

  function handleClose() {
    setHasShownInfo(true);
    // To avoid showing the dialog again during the session
    window.sessionStorage.setItem('hasShownInfo', 'true');
  }

  return (
    <section className="h-dvh overflow-hidden mx-[-1rem]">
      <UploadInfoDialog open={!hasShownInfo} onClose={handleClose} />

      {hasInput ? (
        <VectrealViewer
          key="model-viewer"
          gridOptions={{ showGrid: true }}
          controlsOptions={{
            autoRotate: enableAutoRotate,
          }}
          cameraOptions={{
            initialCameraPosition: new Vector3(0, 5, 5),
          }}
          loader={
            <Oval
              width="3rem"
              color="white"
              secondaryColor="white"
              strokeWidth="3"
            />
          }
        />
      ) : (
        <DropZone key="drop-zone" />
      )}

      <FileMenu />
    </section>
  );
};

const EditorPage = () => {
  const optimizer = useOptimizeModel();
  return (
    <EditorProvider>
      <ModelProvider optimizer={optimizer}>
        <Editor />
      </ModelProvider>
    </EditorProvider>
  );
};

export default EditorPage;
