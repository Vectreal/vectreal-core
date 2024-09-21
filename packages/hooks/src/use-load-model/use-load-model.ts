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

import { useOptimizeModel } from '../use-optimize-model';

import eventSystem from './event-system';
import reducer, { initialState } from './state';
import {
  ModelFileTypes,
  InputFileOrDirectory,
  Action,
  ModelFile,
} from './types';
import { useLoadBinary, useLoadGltf } from './file-type-hooks';
import { readDirectory } from './utils';
import { createGltfLoader } from './loaders';

function useLoadModel(optimizer?: ReturnType<typeof useOptimizeModel>) {
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
    dispatch({ type: 'set-progress', payload: progress });
    eventSystem.emit('load-progress', progress);
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'reset-state' });
    eventSystem.emit('load-reset');
  }, []);

  const processFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;

      const gltfFile = getFileOfType(files, ModelFileTypes.gltf);
      const glbFile = getFileOfType(files, ModelFileTypes.glb);
      const usdzFile = getFileOfType(files, ModelFileTypes.usdz);

      const supportedFiles = [gltfFile, glbFile, usdzFile].filter(
        Boolean,
      ) as File[];

      if (supportedFiles.length > 1) {
        eventSystem.emit('multiple-models', supportedFiles);
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
        eventSystem.emit('not-loaded-files', files);
        dispatch({ type: 'set-file-loading', payload: false });
        return;
      }
    },
    [updateProgress, getFileOfType, loadGltf, loadBinary],
  );

  const load = useCallback(
    async (filesOrDirectories: InputFileOrDirectory) => {
      const allFiles: File[] = [];

      dispatch({ type: 'reset-state' });
      dispatch({ type: 'set-file-loading', payload: true });

      updateProgress(0);
      uploadCompleteRef.current = false;

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
    [processFiles, updateProgress],
  );

  useEffect(() => {
    if (uploadCompleteRef.current && state.file) {
      eventSystem.emit('load-complete', state.file);
      uploadCompleteRef.current = false;

      if (optimizer) {
        optimizer.load(state.file.model);
      }
    }
  }, [state.file, optimizer]);

  const optimizerIntegration = useOptimizerIntegration(
    optimizer,
    dispatch,
    state.file,
  );

  return {
    ...state,
    on: eventSystem.on,
    off: eventSystem.off,
    load,
    reset,
    optimize: optimizerIntegration,
  };
}

function useOptimizerIntegration(
  optimizer: ReturnType<typeof useOptimizeModel> | undefined,
  dispatch: React.Dispatch<Action>,
  file: ModelFile | null,
) {
  const dispatchNewModel = useCallback(
    (model: Uint8Array) => {
      const gltfLoader = createGltfLoader();

      gltfLoader.parse(
        model.buffer,
        '',
        (gltf) => {
          dispatch({
            type: 'set-file',
            payload: {
              model: gltf.scene,
              type: ModelFileTypes.glb,
              name: file?.name || 'optimized.glb',
            },
          });
        },
        (error) => {
          console.error('Error loading new model:', error);
        },
      );
    },
    [dispatch, file],
  );

  const runOptimization = useCallback(
    async (optimizationFunction: (() => Promise<void>) | undefined) => {
      if (!optimizer || !optimizationFunction) {
        console.warn('Optimizer or optimization function is not available');
        return;
      }

      try {
        await optimizationFunction();
        const optimizedModel = await optimizer.getModel();

        if (optimizedModel) {
          dispatchNewModel(optimizedModel);
        }
      } catch (error) {
        console.error('Optimization failed:', error);
        // Optionally dispatch an error action here
      }
    },
    [optimizer, dispatchNewModel],
  );

  return optimizer
    ? {
        simplifyOptimization: () =>
          runOptimization(optimizer.simplifyOptimization),
        dedupOptimization: () => runOptimization(optimizer.dedupOptimization),
        quantizeOptimization: () =>
          runOptimization(optimizer.quantizeOptimization),
      }
    : {
        simplifyOptimization: () => {
          console.warn('Optimizer is not available');
        },
        dedupOptimization: () => {
          console.warn('Optimizer is not available');
        },
        quantizeOptimization: () => {
          console.warn('Optimizer is not available');
        },
      };
}

export default useLoadModel;
