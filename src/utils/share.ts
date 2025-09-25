export const shareFile = async (fileURL: string, ext: string) => {
  if (fileURL && fileURL !== '') {
    const blob = await (await fetch(fileURL)).blob();
    const filesArray = [
      new File([blob], `canvas.${ext}`, {
        type: blob.type,
        lastModified: new Date().getTime(),
      }),
    ];
    try {
      await navigator.share({
        files: filesArray,
        title: 'Canvas',
        text: 'canvas screen',
      });
    } catch (error) {
      console.error('error');
      alert(error);
    }
  }
};
