import { getBrightness } from '@/utils/pixel';

// allow editing options
interface PixelateConfig {
  size: number;
  dark: number;
  light: number;
  darkColor: string;
  midColor: string;
  lightColor: string;
  shape: string;
}

export type ColorTypes = 'darkColor' | 'midColor' | 'lightColor';
export type NumberTypes = 'dark' | 'light';
export type ShapeTypes = 'square' | 'circle';

export const config: PixelateConfig = {
  size: 5,
  dark: 125,
  light: 190,
  darkColor: '#000000',
  midColor: '#999999',
  lightColor: '#ffffff',
  shape: 'square',
};

function calculateValue(dataArray: Uint8ClampedArray): number {
  const length = dataArray.length;
  let total = 0;

  for (let i = 0; i < length; i += 4) {
    total += getBrightness(dataArray[i], dataArray[i + 1], dataArray[i + 2]);
  }

  return Math.round(total / (config.size * config.size));
}

export default function pixelate(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): ImageData {
  const outputs: number[][] = [];
  for (let i = 0; i < width; i += config.size) {
    outputs.push([]);
    for (let j = 0; j < height; j += config.size) {
      const content = dataContext.getImageData(i, j, config.size, config.size);
      // get brightness of config.sized block
      outputs[i / config.size].push(calculateValue(content.data));
    }
  }

  const outputLength = outputs.length;
  dataContext.clearRect(0, 0, width, height);

  for (let i = 0; i < outputLength; i++) {
    const innerLength = outputs[i].length;

    for (let j = 0; j < innerLength; j++) {
      // 0 - 255
      const fill = outputs[i][j];

      dataContext.fillStyle =
        fill < config.dark
          ? config.darkColor
          : fill < config.light
            ? config.midColor
            : config.lightColor;

      if (config.shape === 'square') {
        dataContext.fillRect(
          i * config.size,
          j * config.size,
          config.size,
          config.size
        );
      } else {
        dataContext.beginPath();
        dataContext.ellipse(
          i * config.size,
          j * config.size,
          config.size / 2,
          config.size / 2,
          0,
          0,
          Math.PI * 2
        );
        dataContext.fill();
      }
    }
  }

  return dataContext.getImageData(0, 0, width, height);
}
