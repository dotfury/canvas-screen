// https://www.youtube.com/watch?v=hckvHFDGiJk
// https://www.flong.com/archive/texts/lists/slit_scan/index.html
import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface SlitscanConfig {
  minWidth: number;
  width: number;
  historyLength: number;
}

export const config: SlitscanConfig = {
  minWidth: AppConfig.isMobile ? 5 : 2,
  width: 5,
  historyLength: 3,
};

const FONT_SIZE = AppConfig.isMobile ? '24px' : '32px';
let slices: ImageData[] = [];
let sliceIndex = 0;
let offset = 0;

export default function slitscan(
  offscreenContext: OffscreenCanvasRenderingContext2D,
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const columns = width / config.width;
  slices[sliceIndex] = offscreenContext.getImageData(0, 0, width, height);
  sliceIndex = (sliceIndex + 1) % columns;

  if (slices.length >= columns) {
    for (let i = 0; i < columns; i++) {
      const w = i * config.width;
      const currentIndex = (i + offset) % columns;
      dataContext.putImageData(
        slices[currentIndex],
        0,
        0,
        w,
        0,
        config.width,
        height
      );
    }
    offset++;
  } else {
    // wait to get enough slices
    dataContext.fillStyle = '#000000';
    dataContext.fillRect(0, 0, width, height);
    dataContext.font = `${FONT_SIZE} sans-serif`;
    dataContext.fillStyle = '#ffffff';
    dataContext.textAlign = 'center';
    dataContext.textBaseline = 'middle';
    dataContext.fillText('...loading', width / 2, height / 2);
  }
}

export function slitscanCleanup() {
  slices = [];
  sliceIndex = 0;
  offset = 0;
}
