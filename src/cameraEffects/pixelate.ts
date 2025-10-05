import { getPixelOutputs } from '@/utils/pixel';
import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface PixelateConfig {
  minSize: number;
  maxSize: number;
  size: number;
  dark: number;
  light: number;
  darkColor: string;
  midColor: string;
  lightColor: string;
  shape: string;
  monochrome: boolean;
}

export type ColorTypes = 'darkColor' | 'midColor' | 'lightColor';
export type NumberTypes = 'dark' | 'light';
export type ShapeTypes = 'square' | 'circle';

export const config: PixelateConfig = {
  minSize: AppConfig.isMobile ? 5 : 3,
  maxSize: 20,
  size: 5,
  dark: 125,
  light: 190,
  darkColor: '#000000',
  midColor: '#999999',
  lightColor: '#ffffff',
  shape: 'square',
  monochrome: false,
};

// reuse outputs memory
let outputs: number[][] = [];

function getFillColor(fill: number): string {
  if (config.monochrome) {
    if (fill < config.dark) {
      return config.darkColor;
    }

    return config.lightColor;
  }

  if (fill < config.dark) {
    return config.darkColor;
  } else if (fill < config.light) {
    return config.midColor;
  }

  return config.lightColor;
}

export default function pixelate(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const data = dataContext.getImageData(0, 0, width, height);

  getPixelOutputs(data, outputs, width, height, config.size);

  const outputLength = outputs.length;
  dataContext.clearRect(0, 0, width, height);

  for (let i = 0; i < outputLength; i++) {
    const innerLength = outputs[i].length;

    for (let j = 0; j < innerLength; j++) {
      // 0 - 255
      const fill = outputs[i][j];

      dataContext.fillStyle = getFillColor(fill);

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

  outputs = [];
}
