// Utility function to save ArrayBuffer to a file
export const saveArrayBuffer = (
  buffer: ArrayBuffer,
  fileName: string,
): void => {
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
