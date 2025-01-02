export default function color(dataContext: CanvasRenderingContext2D, width: number, height: number): ImageData {
  const imageData = dataContext.getImageData(0, 0, width, height);
  const newImageData = dataContext.createImageData(width, height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    // r
    newImageData.data[i] = imageData.data[i];
    // g
    newImageData.data[i + 1] = imageData.data[i + 1];
    //b
    newImageData.data[i + 2] = imageData.data[i + 2] /  - 100;
    //a
    newImageData.data[i + 3] = imageData.data[i + 3];
  }

  return newImageData;
}
