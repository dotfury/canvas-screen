function sanitizeData(data: string): string {
  return data.slice(data.indexOf(',') + 1);
}

// Thank you
// https://stackoverflow.com/a/52092093/1601974
export function openBase64InNewTab(data: string, mimeType: string): void {
  const byteCharacters = atob(sanitizeData(data));
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new Blob([byteArray], { type: mimeType + ';base64' });
  const fileURL = URL.createObjectURL(file);

  window.open(fileURL);
}
