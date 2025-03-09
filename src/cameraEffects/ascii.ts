import { getPixelOutputs } from '@/utils/pixel';
import { map } from '@/utils/map';

// allow editing options
interface AsciiConfig {
  size: number;
  dark: number;
  light: number;
  darkColor: string;
  midColor: string;
  lightColor: string;
  font: string;
  flow: boolean;
}

export type ColorTypes = 'darkColor' | 'midColor' | 'lightColor';
export type NumberTypes = 'dark' | 'light';
export type FontTypes = 'sans-serif' | 'acer';

export const config: AsciiConfig = {
  size: 5,
  dark: 125,
  light: 190,
  darkColor: '#000000',
  midColor: '#999999',
  lightColor: '#ffffff',
  font: 'sans-serif',
  flow: false,
};

// reuse outputs memory
let outputs: number[][] = [];

let characterIndex = 0;
let frameCount = 0;

const characters = ']N@#W$9876543210?!abc;:+=-,._ ';
const density = [...characters.split('')];
const densityCopy = [...density, ...'[)(&%^*`~defABCDEF¥|><'.split('')];
const charLength = characters.length;

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
      const fill = outputs[i][j];

      dataContext.fillStyle =
        fill < config.dark
          ? config.darkColor
          : fill < config.light
            ? config.midColor
            : config.lightColor;

      // protect against NaN
      const charIndex = Math.floor(map(fill, 0, 255, charLength, 0)) || 0;
      dataContext.fillText(
        density[charIndex],
        i * config.size,
        j * config.size
      );
    }
  }

  outputs = [];

  if (config.flow) {
    if (++frameCount % 5 === 0) {
      characterIndex++;
      density.shift();
      density.push(densityCopy[characterIndex % charLength]);
    }
  }
}

export function asciiCleanup() {
  frameCount = 0;
  characterIndex = 0;
}
