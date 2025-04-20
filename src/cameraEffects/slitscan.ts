// VIDEO: https://www.youtube.com/watch?v=hckvHFDGiJk&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=223
import { processImageData } from '@/utils/pixel';
import AppConfig from '@/utils/appConfig.ts';
import { randomRange } from '@/utils/random';
import { map } from '@/utils/map';

// allow editing options
interface SlitscanConfig {
  minWidth: number;
  width: number;
}

export const config: SlitscanConfig = {
  minWidth: AppConfig.isMobile ? 7 : 5,
  width: 5,
};

let frameCount = 0;
let angle = 0;
let slices: ImageData[] = [];
let sliceIndex = 0;

export default function slitscan(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const columns = width / config.width;
  const data = dataContext.getImageData(0, 0, width, height);
  slices[sliceIndex % columns] = data;
  // dataContext.clearRect(0, 0, width, height);

  for (let i = 0; i < columns; i++) {
    const x = i * config.width;
    const image = processImageData(
      slices[i % slices.length],
      x,
      0,
      config.width,
      height
    );

    const imageData = dataContext.createImageData(config.width, height);
    const length = imageData.data.length;

    for (let j = 0; j < length; j += 4) {
      imageData.data[j] = image[j];
      imageData.data[j + 1] = image[j + 1];
      imageData.data[j + 2] = image[j + 2];
      imageData.data[j + 3] = image[j + 3];
    }

    dataContext.putImageData(imageData, x, 0);
  }

  sliceIndex++;

  // for (let i = 0; i < width; i += config.width) {
  //   // const random = Math.round(randomRange(0, width - config.width));
  //   const offset = Math.round(map(Math.sin(angle), -1, 1, 0, columns));
  //   const sourceX = (i + offset * config.width) % width;
  //   const image = processImageData(data, sourceX, 0, config.width, height);
  //   const imageData = dataContext.createImageData(config.width, height);
  //   const length = imageData.data.length;

  //   for (let j = 0; j < length; j += 4) {
  //     imageData.data[j] = image[j];
  //     imageData.data[j + 1] = image[j + 1];
  //     imageData.data[j + 2] = image[j + 2];
  //     imageData.data[j + 3] = image[j + 3];
  //   }

  //   dataContext.putImageData(imageData, i, 0);
  // }

  // frameCount++;
  // angle += 0.1;
}

export function cleanupSlitscan() {
  slices = [];
  sliceIndex = 0;
  frameCount = 0;
  angle = 0;
}
