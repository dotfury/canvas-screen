// VIDEO: https://www.youtube.com/watch?v=hckvHFDGiJk&list=PLRqwX-V7Uu6ZiZxtDDRCi6uhfTH4FilpH&index=223
import { processImageData } from '@/utils/pixel';
import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface SlitscanConfig {
  minWidth: number;
  width: number;
}

export const config: SlitscanConfig = {
  minWidth: AppConfig.isMobile ? 7 : 5,
  width: 5,
};

export default function slitscan(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const data = dataContext.getImageData(0, 0, width, height);

  for (let i = 0; i < width; i += config.width) {
    const image = processImageData(data, i, 0, config.width, height);
    const imageData = dataContext.createImageData(config.width, height);
    const length = imageData.data.length;

    for (let j = 0; j < length; j += 4) {
      imageData.data[j] = image[j];
      imageData.data[j + 1] = image[j + 1];
      imageData.data[j + 2] = image[j + 2];
      imageData.data[j + 3] = image[j + 3];
    }

    dataContext.putImageData(imageData, i, 0);
  }
}
