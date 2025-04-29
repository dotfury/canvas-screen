import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface GridConfig {
  minSize: number;
  size: number;
}

// TODO - maintain aspect ratio width and height
export const config: GridConfig = {
  minSize: AppConfig.isMobile ? 100 : 100,
  size: 100,
};

let history: ImageBitmap[] = [];
let minFrames;

export default async function grid(
  offscreenContext: OffscreenCanvasRenderingContext2D,
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): Promise<void> {
  dataContext.imageSmoothingEnabled = false;
  const columns = Math.floor(width / config.size);
  const rows = Math.floor(height / config.size);
  const xOffset = Math.floor((width - columns * config.size) / columns);
  const yOffset = Math.floor((height - rows * config.size) / rows);

  minFrames = columns * rows;
  history.push(
    await createImageBitmap(
      offscreenContext.getImageData(0, 0, width, height),
      0,
      0,
      width,
      height
    )
  );

  dataContext.fillRect(0, 0, width, height);
  dataContext.save();
  dataContext.translate(xOffset / 2, yOffset / 2);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      dataContext.drawImage(
        history[0],
        j * config.size + xOffset * j,
        i * config.size + yOffset * i,
        config.size,
        config.size
      );
    }
  }
  dataContext.restore();

  history = history.slice(1);
}

export function gridCleanup() {
  history = [];
}
