/* vectreal-core | vctrl/hooks
Copyright (C) 2024 Moritz Becker

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
