import { getPixelOutputs } from '@/utils/pixel';

// allow editing options
interface AsciiConfig {
  size: number;
  dark: number;
  light: number;
  darkColor: string;
  midColor: string;
  lightColor: string;
  font: string;
}

export type ColorTypes = 'darkColor' | 'midColor' | 'lightColor';
export type NumberTypes = 'dark' | 'light';

export const config: AsciiConfig = {
  size: 5,
  dark: 125,
  light: 190,
  darkColor: '#000000',
  midColor: '#999999',
  lightColor: '#ffffff',
  font: 'sans-serif',
};

// reuse outputs memory
let outputs: number[][] = [];

const characters = ']N@#W$9876543210?!abc;:+=-,._   ';

export default function ascii(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const data = dataContext.getImageData(0, 0, width, height);

  getPixelOutputs(data, outputs, width, height, config.size);

  const outputLength = outputs.length;
  dataContext.clearRect(0, 0, width, height);
  dataContext.font = `${config.size}px ${config.font}`;

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

      // get character (use a map function)

      // write text
      dataContext.fillText('P', i * config.size, j * config.size);
    }
  }

  outputs = [];
}
