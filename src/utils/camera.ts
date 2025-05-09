import { EFFECTS } from '@/utils/effectList';
import pixelate from '@/cameraEffects/pixelate';
import ascii, { asciiCleanup } from '@/cameraEffects/ascii';

const EFFECT_MAP: Record<string, any> = {
  PIXELATE: pixelate,
  ASCII: ascii,
  STANDARD: null,
};

const CLEANUP_MAP: Record<string, any> = {
  ASCII: asciiCleanup,
};

type FacingMode = 'user' | 'environment';

export default class Camera {
  private static instance: Camera;
  initialized: boolean;
  dataCanvas: HTMLCanvasElement;
  dataContext: CanvasRenderingContext2D;
  video: HTMLVideoElement | null;
  height: number;
  width: number;
  currentEffect: string;
  facingMode: FacingMode;

  constructor(canvas: HTMLCanvasElement) {
    if (!Camera.instance) {
      Camera.instance = this;
    }
    this.initialized = false;
    this.facingMode = 'environment';
    this.video = null;
    this.height = 0;
    this.width = 0;
    this.currentEffect = EFFECTS.STANDARD;
    this.dataCanvas = canvas;
    this.dataContext = this.dataCanvas.getContext('2d', {
      willReadFrequently: true,
    })!;

    return Camera.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;
    this.video = await this.getVideo();
    this.height = this.video.videoHeight;
    this.width = this.video.videoWidth;
    this.dataCanvas.width = this.width;
    this.dataCanvas.height = this.height;
  }

  async getVideo(): Promise<HTMLVideoElement> {
    const avStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: this.facingMode,
      },
    });

    const video = document.createElement('video');

    try {
      // modern browsers
      video.srcObject = avStream;
    } catch (e) {
      // old browsers
      video.src = window.URL.createObjectURL(avStream as any);
    }

    // iOS fix - https://github.com/mebjas/html5-qrcode/issues/9
    video.muted = true;
    video.playsInline = true;
    // end iOS fix ----------
    await video.play();

    return video;
  }

  async changeFacingMode(): Promise<void> {
    if (this.facingMode === 'user') {
      this.facingMode = 'environment';
      return;
    }

    this.facingMode = 'user';

    this.video = await this.getVideo();
  }

  startVideo(): void {
    this.drawVideo();
  }

  setEffect(effect: string): void {
    if (CLEANUP_MAP[this.currentEffect]) {
      CLEANUP_MAP[this.currentEffect]();
    }
    this.currentEffect = effect;
  }

  takeSnapshot(): void {
    const dataURL = this.dataCanvas.toDataURL('image/jpeg', 1.0);

    this.downloadImage(dataURL);
  }

  downloadImage(data: string, filename = 'image.jpeg') {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    a.click();
  }

  drawVideo(): void {
    if (!this.video) return;

    this.dataContext.clearRect(0, 0, this.width, this.height);
    this.dataContext.drawImage(this.video, 0, 0);

    if (EFFECT_MAP[this.currentEffect]) {
      EFFECT_MAP[this.currentEffect](this.dataContext, this.width, this.height);
    }

    requestAnimationFrame(() => this.drawVideo());
  }
}
