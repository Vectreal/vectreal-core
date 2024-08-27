import { useCallback } from 'react';

import { Action, ModelFileTypes, ReducedGltf } from '../types';
import { arrayBufferToBase64 } from '../utils';
import { createGltfLoader } from '../loaders';

function useLoadGltf(dispatch: React.Dispatch<Action>) {
  const embedExternalResources = useCallback(
    async (
      gltfContent: ReducedGltf,
      otherFiles: File[],
      onProgress: (progress: number) => void,
    ) => {
      const fileMap = new Map(otherFiles.map((file) => [file.name, file]));
      const totalFiles =
        (gltfContent.buffers?.length || 0) + (gltfContent.images?.length || 0);
      let processedFiles = 0;

      const updateProgress = () => {
        processedFiles++;
        onProgress((processedFiles / totalFiles) * 100);
      };

      // Embed buffers
      if (gltfContent.buffers) {
        for (let i = 0; i < gltfContent.buffers.length; i++) {
          const buffer = gltfContent.buffers[i];
          if (!buffer.uri || buffer.uri.startsWith('data:')) {
            updateProgress();
            continue;
          }

          const fileName = buffer.uri.split('/').pop() || '';
          const file = fileMap.get(fileName);
          if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const base64 = await arrayBufferToBase64(arrayBuffer);
            buffer.uri = `data:application/octet-stream;base64,${base64}`;
          }
          updateProgress();
        }
      }

      // Embed images
      if (gltfContent.images) {
        for (let i = 0; i < gltfContent.images.length; i++) {
          const image = gltfContent.images[i];
          if (!image.uri || image.uri.startsWith('data:')) {
            updateProgress();
            continue;
          }

          const fileName = image.uri.split('/').pop() || '';
          const file = fileMap.get(fileName);
          if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const base64 = await arrayBufferToBase64(arrayBuffer);
            const mimeType = file.type || 'image/png';
            image.uri = `data:${mimeType};base64,${base64}`;
          }
          updateProgress();
        }
      }

      return gltfContent;
    },
    [],
  );

  const loadGltf = useCallback(
    (
      gltfFile: File,
      otherFiles: File[],
      onProgress: (progress: number) => void,
    ) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const gltfContent = JSON.parse(e.target?.result as string);
        onProgress(10); // Initial progress after parsing GLTF

        const modifiedGLTF = await embedExternalResources(
          gltfContent,
          otherFiles,
          (embeddingProgress) => {
            // Map embedding progress to 10-90% range
            onProgress(10 + embeddingProgress * 0.8);
          },
        );

        const gltfLoader = createGltfLoader();

        gltfLoader.parse(JSON.stringify(modifiedGLTF), '', (gltf) => {
          dispatch({
            type: 'SET_FILE',
            payload: {
              model: gltf.scene,
              type: ModelFileTypes.gltf,
              name: gltfFile.name,
            },
          });
        });

        onProgress(100); // Final progress
        dispatch({ type: 'SET_FILE_LOADING', payload: false });
      };

      reader.readAsText(gltfFile);
    },
    [dispatch, embedExternalResources],
  );

  return { loadGltf };
}

export default useLoadGltf;
