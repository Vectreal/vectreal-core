import { useCallback } from 'react';

import { Action, ModelFileTypes } from '../types';
import { createGltfLoader, createUsdzLoader } from '../loaders';

/**
 * Hook to load binary files
 *
 * @param dispatch - The dispatch function from the useReducer hook
 * @returns An object containing the loadBinary function
 */
function useLoadBinary(dispatch: React.Dispatch<Action>) {
  /**
   * Function to read binary files
   *
   * @param file - The binary file to read
   * @param fileType - The type of file to read
   * @param onProgress - The function to call when progress is made
   * @returns {void}
   */
  const loadBinary = useCallback(
    (file: File, fileType: ModelFileTypes, onProgress: () => void) => {
      const reader = new FileReader();

      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target?.result) {
          const arrayBuffer = event.target.result as ArrayBuffer;

          if (fileType === ModelFileTypes.glb) {
            const gltfLoader = createGltfLoader();

            gltfLoader.parse(arrayBuffer, '', (gltf) => {
              dispatch({
                type: 'SET_FILE',
                payload: {
                  model: gltf.scene,
                  type: ModelFileTypes.glb,
                  name: file.name,
                },
              });
            });
          } else if (fileType === ModelFileTypes.usdz) {
            const usdzLoader = createUsdzLoader();
            const model = usdzLoader.parse(arrayBuffer);

            dispatch({
              type: 'SET_FILE',
              payload: {
                model: model,
                type: ModelFileTypes.usdz,
                name: file.name,
              },
            });
          }

          onProgress(); // Call progress callback when binary file is loaded
          dispatch({ type: 'SET_FILE_LOADING', payload: false });
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        dispatch({ type: 'SET_FILE_LOADING', payload: false });
      };

      reader.readAsArrayBuffer(file);
    },
    [dispatch],
  );

  return { loadBinary };
}

export default useLoadBinary;
