import JSZip from 'jszip';
import { ImageDataObject, TexturesObject, URIBufferObject } from '../types';
import dataURItoBlob from './data-uri-to-blob';
import { getFileExtension } from './file-helpers';

export const handleImages = (
  images: Array<ImageDataObject>,
  textures: Array<TexturesObject>,
  zip: JSZip,
): void => {
  textures.forEach((texture, index) => {
    const image = images[texture.source];
    if (!image.uri) return;

    const extension = getFileExtension(image.uri, image.mimeType);
    const textureName = texture.name || `texture_${index}`;
    const fileName = `${textureName}.${extension}`;

    if (image.data instanceof ArrayBuffer || image.data instanceof Uint8Array) {
      const buffer =
        image.data instanceof Uint8Array ? image.data.buffer : image.data;
      zip.file(fileName, buffer, { binary: true });
    } else if (image.uri.startsWith('data:')) {
      // Handle data URIs
      const binaryData = dataURItoBlob(image.uri);
      zip.file(fileName, binaryData, { binary: true });
    } else {
      console.warn(`Image at index ${index} has unsupported data format`);
    }
  });
};

// Handles buffers in the GLTF export result
export const handleBuffers = (
  buffers: Array<URIBufferObject | ArrayBuffer>,
  zip: JSZip,
  baseFileName: string,
): void => {
  buffers.forEach((buffer, index) => {
    const fileName = `${baseFileName}.bin`;

    if (buffer instanceof ArrayBuffer) {
      zip.file(fileName, buffer, { binary: true });
    } else if (buffer.uri) {
      // If buffer.uri is a data URL, we need to convert it to binary data
      const binaryData = dataURItoBlob(buffer.uri);
      zip.file(fileName, binaryData, { binary: true });
    } else {
      console.warn(
        `Buffer at index ${index} is not an ArrayBuffer or does not have a URI`,
      );
    }
  });
};
