import { getPixelOutputs } from '@/utils/pixel';
import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface PixelateConfig {
  minSize: number;
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
  minSize: AppConfig.isMobile ? 5 : 3,
  size: 5,
  dark: 125,
  light: 190,
  darkColor: '#000000',
  midColor: '#999999',
  lightColor: '#ffffff',
  shape: 'square',
};

// reuse outputs memory
let outputs: number[][] = [];

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

  outputs = [];
}
