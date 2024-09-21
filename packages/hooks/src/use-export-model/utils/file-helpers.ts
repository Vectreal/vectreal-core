// Utility function to get file extension from URI or MIME type
export function getFileExtension(uri: string, mimeType?: string): string {
  const uriExtension = uri.split('.').pop()?.split('?')[0];
  if (uriExtension && uriExtension !== uri) return uriExtension;

  if (mimeType) {
    return mimeType.split('/').pop() || 'png';
  }

  return 'png';
}

export default getFileExtension;

export function getFileBasename(filename: string) {
  return filename?.split('.').shift() || 'scene';
}
