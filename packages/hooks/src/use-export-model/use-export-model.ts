import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

import { ModelFile } from '../use-load-model';
import { ExportResult } from './types';
import { handleBuffers, handleImages, saveArrayBuffer } from './utils';

// Processes the GLTF export result
const processGltfResult = (
  result: ExportResult,
  baseFileName: string,
): void => {
  const zip = new JSZip();
  zip.file(`${baseFileName}.gltf`, JSON.stringify(result, null, 2));

  if (result.buffers) {
    handleBuffers(result.buffers, zip, baseFileName);
  }

  if (result.images && result.textures) {
    handleImages(result.images, result.textures, zip);
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, `${baseFileName}.zip`);
  });
};

const useExportModel = (
  onSaved?: () => void,
  onError?: (error: ErrorEvent) => void,
) => {
  // Main function to handle exporting the scene in GLTF or GLB format
  const handleGltfExport = (file: ModelFile | null, binary: boolean): void => {
    const scene = file?.model;
    if (!scene) {
      console.error('Scene not initialized');
      return;
    }

    const exporter = new GLTFExporter();
    const options = {
      binary,
      includeCustomExtensions: true,
    };

    exporter.parse(
      scene,
      (result: ArrayBuffer | ExportResult) => {
        console.log(result);
        const baseFileName = file?.name?.split('.').shift() || 'scene';

        if (result instanceof ArrayBuffer) {
          // GLB format
          saveArrayBuffer(result, `${baseFileName}.glb`);
          if (onSaved) onSaved();
        } else {
          // GLTF format
          processGltfResult(result, baseFileName);
          if (onSaved) onSaved();
        }
      },
      (error) => {
        console.error(error);

        if (onError) onError(error);
      },
      options,
    );
  };

  return {
    handleGltfExport,
  };
};

export default useExportModel;
