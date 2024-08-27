import { useReducer, useCallback, useRef, useEffect } from 'react';

import { ModelFileTypes, InputFileOrDirectory } from './types';
import { useLoadBinary, useLoadGltf } from './file-type-hooks';
import { readDirectory } from './utils';

import eventSystem from './event-system';
import reducer, { initialState } from './state';

function useLoadModel() {
  const uploadCompleteRef = useRef(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loadGltf } = useLoadGltf(dispatch);
  const { loadBinary } = useLoadBinary(dispatch);

  const getFileOfType = useCallback(
    (files: File[], fileType: ModelFileTypes) =>
      files.find((file) => file.name.endsWith('.' + fileType)),
    [],
  );

  const updateProgress = useCallback((progress: number) => {
    dispatch({ type: 'SET_PROGRESS', payload: progress });
    eventSystem.emit('UPLOAD_PROGRESS', progress);
  }, []);

  const processFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      dispatch({ type: 'SET_FILE_LOADING', payload: true });
      updateProgress(0);
      uploadCompleteRef.current = false;

      const gltfFile = getFileOfType(files, ModelFileTypes.gltf);
      const glbFile = getFileOfType(files, ModelFileTypes.glb);
      const usdzFile = getFileOfType(files, ModelFileTypes.usdz);

      const supportedFiles = [gltfFile, glbFile, usdzFile].filter(
        Boolean,
      ) as File[];

      if (supportedFiles.length > 1) {
        eventSystem.emit('MULTIPLE_3D_MODELS', supportedFiles);
        return;
      }

      const otherFiles = files.filter(
        (file) => file !== gltfFile && file !== glbFile && file !== usdzFile,
      );

      const updateFileProgress = (progress: number) => {
        updateProgress(progress);

        if (progress === 100) {
          uploadCompleteRef.current = true;
        }
      };

      if (gltfFile) {
        loadGltf(gltfFile, otherFiles, updateFileProgress);
      } else if (glbFile) {
        loadBinary(glbFile, ModelFileTypes.glb, () => updateFileProgress(100));
      } else if (usdzFile) {
        loadBinary(usdzFile, ModelFileTypes.usdz, () =>
          updateFileProgress(100),
        );
      } else {
        eventSystem.emit('UNSUPPORTED_FILE_TYPE', files);
        dispatch({ type: 'SET_FILE_LOADING', payload: false });
        return;
      }
    },
    [updateProgress, getFileOfType, loadGltf, loadBinary],
  );

  const handleFileUpload = useCallback(
    async (filesOrDirectories: InputFileOrDirectory) => {
      const allFiles: File[] = [];

      for (const item of filesOrDirectories) {
        if (item instanceof File) {
          allFiles.push(item);
        } else if ('kind' in item && item.kind === 'directory') {
          const directoryFiles = await readDirectory(item);
          allFiles.push(...directoryFiles);
        }
      }

      processFiles(allFiles);
    },
    [processFiles],
  );

  useEffect(() => {
    if (uploadCompleteRef.current && state.file) {
      eventSystem.emit('UPLOAD_COMPLETE', state.file);
      uploadCompleteRef.current = false;
    }
  }, [state.file]);

  return {
    ...state,
    on: eventSystem.on,
    off: eventSystem.off,
    handleFileUpload,
  };
}

export default useLoadModel;
