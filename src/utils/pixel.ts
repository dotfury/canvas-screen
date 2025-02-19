const getBrightness = (r: number, g: number, b: number): number =>
  Math.round((r + g + b) / 3);

// Solution found here: https://stackoverflow.com/questions/46863683/speed-up-canvass-getimagedata
const processImageData = (
  imageData: ImageData,
  x: number,
  y: number,
  w: number,
  h: number
): number[] => {
  const result = [];
  const data = imageData.data;

  for (let j = 0; j < h; j++) {
    let idx = (x + (y + j) * imageData.width) * 4;

    for (let i = 0; i < w; i++) {
      const r = data[idx++];
      const g = data[idx++];
      const b = data[idx++];
      const a = data[idx++];

      result.push(r, g, b, a);
    }
  }

  return result;
};

export { getBrightness, processImageData };
