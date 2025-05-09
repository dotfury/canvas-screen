import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface SlitscanConfig {
  minWidth: number;
  width: number;
  historyLength: number;
}

export const config: SlitscanConfig = {
  minWidth: AppConfig.isMobile ? 7 : 5,
  width: 5,
  historyLength: 3,
};

let frameCount = 0;
let slices: Array<ImageData[]> = [];

export default function slitscan(
  offscreenContext: OffscreenCanvasRenderingContext2D,
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const columns = width / config.width;
  const sliceIndex = frameCount % columns;

  for (let i = 0; i < columns; i++) {
    const x = i * config.width;
    const data = offscreenContext.getImageData(x, 0, config.width, height);

    if (!slices[sliceIndex]) {
      slices[sliceIndex] = [];
    }

    slices[sliceIndex].push(data);
  }

  if (frameCount >= config.historyLength) {
    for (let i = 0; i < slices.length; i++) {
      const x = i * config.width;
      const savedSlice = slices[i].shift();
      if (savedSlice) {
        // dataContext.fillRect(x, 0, config.width, height);
        dataContext.putImageData(savedSlice, x, 0);
      }
    }
  }

  // if (sliceIndex > 0) {
  //   dataContext.putImageData(slices[(sliceIndex - 1) % width], x, 0);
  // }
  // console.log('data: ', data);

  // const data = dataContext.getImageData(0, 0, width, height);
  // slices[sliceIndex % columns] = data;
  // // dataContext.clearRect(0, 0, width, height);

  // for (let i = 0; i < slices.length; i++) {
  //   const x = i * config.width;
  //   const savedSlices = slices[i];
  //   const savedSlice = savedSlices.shift();
  //   if (savedSlice) {
  //     dataContext.putImageData(savedSlice, x, 0);
  //   }
  // }

  frameCount++;

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
  frameCount = 0;
}
