import AppConfig from '@/utils/appConfig.ts';

export enum Directions {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}
// allow editing options
interface SlitscanConfig {
  minSize: number;
  maxSize: number;
  size: number;
  historyLength: number;
  direction: Directions;
}

export const config: SlitscanConfig = {
  minSize: AppConfig.isMobile ? 5 : 2,
  maxSize: 20,
  size: 5,
  historyLength: 3,
  direction: Directions.HORIZONTAL,
};

let slices: ImageData[] = [];
let sliceIndex = 0;
let offset = 0;
let lastDirection = config.direction;
let lastSize = config.size;

export default function slitscan(
  offscreenContext: OffscreenCanvasRenderingContext2D,
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  if (lastDirection !== config.direction || lastSize !== config.size) {
    lastDirection = config.direction;
    lastSize = config.size;
    slitscanCleanup();
  }

  slices[sliceIndex] = offscreenContext.getImageData(0, 0, width, height);

  if (config.direction === Directions.VERTICAL) {
    renderVertical(dataContext, width, height);
  } else {
    renderHorizontal(dataContext, width, height);
  }

  offset++;
}

function renderHorizontal(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const columns = Math.round(width / config.size);
  sliceIndex = (sliceIndex + 1) % columns;

  for (let i = 0; i < columns; i++) {
    const w = i * config.size;
    const currentIndex = (i + offset) % columns;
    if (slices[currentIndex + 1]) {
      dataContext.putImageData(
        slices[currentIndex + 1],
        0,
        0,
        w,
        0,
        config.size,
        height
      );
    }
  }
}

function renderVertical(
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const rows = Math.round(height / config.size);
  sliceIndex = (sliceIndex + 1) % rows;

  for (let i = 0; i < rows; i++) {
    const h = i * config.size;
    const currentIndex = (i + offset) % rows;
    if (slices[currentIndex + 1]) {
      dataContext.putImageData(
        slices[currentIndex + 1],
        0,
        0,
        0,
        h,
        width,
        config.size
      );
    }
  }
}

export function slitscanCleanup(): void {
  slices = [];
  sliceIndex = 0;
  offset = 0;
}
