import AppConfig from '@/utils/appConfig.ts';

// allow editing options
interface GridConfig {
  minwidth: number;
  width: number;
}

export const config: GridConfig = {
  minwidth: AppConfig.isMobile ? 100 : 100,
  width: 100,
};

let history: ImageBitmap[] = [];

export default async function grid(
  offscreenContext: OffscreenCanvasRenderingContext2D,
  dataContext: CanvasRenderingContext2D,
  width: number,
  height: number
): Promise<void> {
  dataContext.imageSmoothingEnabled = false;
  let currentFrame = 0;
  const aspectRatio = width / height;
  const aspectHeight = config.width / aspectRatio;
  const columns = Math.floor(width / config.width);
  const rows = Math.floor(height / aspectHeight);
  const minFrames = columns * rows;
  const xOffset = Math.floor((width - columns * config.width) / columns);
  const yOffset = Math.floor((height - rows * aspectHeight) / rows);

  const data = await createImageBitmap(
    offscreenContext.getImageData(0, 0, width, height),
    0,
    0,
    width,
    height
  );
  history = [data, ...history];
  const length = history.length;

  dataContext.fillRect(0, 0, width, height);
  dataContext.save();
  dataContext.translate(xOffset * 0.75, yOffset / 2);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      dataContext.drawImage(
        history[currentFrame],
        j * config.width + xOffset * j,
        i * aspectHeight + yOffset * i,
        config.width,
        aspectHeight
      );

      if (length >= minFrames) {
        currentFrame++;
      }
    }
  }
  dataContext.restore();

  if (length >= minFrames) {
    history = history.slice(0, -1);
  }
}

export function gridCleanup() {
  history = [];
}
