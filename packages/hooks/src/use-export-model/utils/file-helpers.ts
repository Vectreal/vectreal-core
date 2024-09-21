/**
 * Determines the extension of a file based on its URI and MIME type.
 *
 * If the MIME type is not provided, it is inferred from the URI.
 *
 * Returns a default `png` extension if the extension is unknown.
 *
 * @param {string} uri - The URI of the image
 * @param {string} mimeType - The MIME type of the image
 */
export function getFileExtension(uri: string, mimeType?: string): string {
  const uriExtension = uri.split('.').pop()?.split('?')[0];
  if (uriExtension && uriExtension !== uri) return uriExtension;

  if (mimeType) {
    return mimeType.split('/').pop() || 'png';
  }

  return 'png';
}

/**
 * Extracts the base name of a file from its URI.
 *
 * @param {string} filename - The name of the file
 */
export function getFileBasename(filename: string) {
  return filename?.split('.').shift() || 'scene';
}
