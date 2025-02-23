const getBrightness = (r: number, g: number, b: number): number =>
  Math.round((r + g + b) / 3);

const getAverageBrightness = (dataArray: number[], size: number): number => {
  const length = dataArray.length;
  let total = 0;

  for (let i = 0; i < length; i += 4) {
    total += getBrightness(dataArray[i], dataArray[i + 1], dataArray[i + 2]);
  }

  return Math.round(total / (size * size));
};

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

const getPixelOutputs = (
  data: ImageData,
  outputs: number[][],
  width: number,
  height: number,
  size: number
): void => {
  for (let i = 0; i < width; i += size) {
    outputs.push([]);
    for (let j = 0; j < height; j += size) {
      const content = processImageData(data, i, j, size, size);
      outputs[i / size].push(getAverageBrightness(content, size));
    }
  }
};

export { getPixelOutputs };
