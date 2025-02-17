import { EFFECTS } from '@/utils/effectList';
import pixelate from '@/cameraEffects/pixelate';

const EFFECT_MAP: Record<string, any> = {
  PIXELATE: pixelate,
  STANDARD: null,
};

export default class Camera {
  private static instance: Camera;
  dataCanvas: HTMLCanvasElement;
  dataContext: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  video: HTMLVideoElement | null;
  height: number;
  width: number;
  currentEffect: string;
  worker: Worker | null;

  constructor(canvas: HTMLCanvasElement) {
    if (!Camera.instance) {
      Camera.instance = this;
    }
    this.video = null;
    this.height = 0;
    this.width = 0;
    this.currentEffect = EFFECTS.STANDARD;
    this.dataCanvas = document.createElement('canvas');
    this.dataContext = this.dataCanvas.getContext('2d', {
      willReadFrequently: true,
    })!;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d', { willReadFrequently: true })!;
    this.worker = null;

    return Camera.instance;
  }

  async init(): Promise<void> {
    this.video = await this.getVideo();
    this.height = this.video.videoHeight;
    this.width = this.video.videoWidth;

    this.dataCanvas.width = this.width;
    this.dataCanvas.height = this.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.worker = new Worker(
      new URL('../cameraEffects/testWorker.ts', import.meta.url)
    );

    this.worker.addEventListener('message', ({ data }) => {
      this.renderEffectedVideo(data);
    });
  }

  async getVideo(): Promise<HTMLVideoElement> {
    const avStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    const video = document.createElement('video');

    try {
      // modern browsers
      video.srcObject = avStream;
    } catch (e) {
      // old browsers
      video.src = window.URL.createObjectURL(avStream as any);
    }

    await video.play();

    return video;
  }

  startVideo(): void {
    this.drawVideo();
  }

  setEffect(effect: string): void {
    this.currentEffect = effect;
  }

  takeSnapshot(): void {
    const dataURL = this.canvas.toDataURL('image/jpeg', 1.0);

    this.downloadImage(dataURL);
  }

  downloadImage(data: string, filename = 'image.jpeg') {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    a.click();
  }

  renderEffectedVideo(data: any): void {
    const pixels = new ImageData(this.width, this.height);
    pixels.data.set(new Uint8ClampedArray(data.pixels));

    this.context.clearRect(0, 0, this.width, this.height);
    this.context.putImageData(pixels, 0, 0);

    requestAnimationFrame(() => this.drawVideo());
  }

  drawVideo(): void {
    if (!this.video) return;

    this.dataContext.clearRect(0, 0, this.width, this.height);
    this.dataContext.drawImage(this.video, 0, 0);

    const imageData = this.dataContext.getImageData(
      0,
      0,
      this.width,
      this.height
    );

    this.worker!.postMessage(
      {
        effect: this.currentEffect,
        pixels: imageData.data.buffer,
        height: this.height,
        width: this.width,
      },
      [imageData.data.buffer]
    );
  }
}
