import { EFFECTS } from '@/utils/effectList';
import appConfig from '@/utils/appConfig';
import pixelate from '@/cameraEffects/pixelate';
import ascii, { asciiCleanup } from '@/cameraEffects/ascii';
import grid, { gridCleanup } from '@/cameraEffects/grid';
import slitscan, { slitscanCleanup } from '@/cameraEffects/slitscan';

const EFFECT_MAP: Record<string, any> = {
  PIXELATE: pixelate,
  ASCII: ascii,
  GRID: grid,
  SLITSCAN: slitscan,
  STANDARD: null,
};

const CLEANUP_MAP: Record<string, any> = {
  ASCII: asciiCleanup,
  GRID: gridCleanup,
  SLITSCAN: slitscanCleanup,
};

const NEEDS_OFFSCREEN: String[] = [EFFECTS.GRID, EFFECTS.SLITSCAN];

type FacingMode = 'user' | 'environment';

const isMobileFF = appConfig.isMobile && appConfig.isFF;

export default class Camera {
  private static instance: Camera;
  initialized: boolean;
  dataCanvas: HTMLCanvasElement;
  dataContext: CanvasRenderingContext2D;
  offscreenCanvas: OffscreenCanvas | null;
  offscreenContext: OffscreenCanvasRenderingContext2D | null;
  video: HTMLVideoElement | null;
  height: number;
  width: number;
  currentEffect: string;
  facingMode: FacingMode;
  videoStartCallbacks: Function[];
  audioStream: MediaStreamTrack[];

  constructor(canvas: HTMLCanvasElement) {
    if (!Camera.instance) {
      Camera.instance = this;
    }
    this.initialized = false;
    this.facingMode = 'user';
    this.video = null;
    this.height = 0;
    this.width = 0;
    this.currentEffect = EFFECTS.STANDARD;
    this.dataCanvas = canvas;
    this.dataContext = this.dataCanvas.getContext('2d', {
      willReadFrequently: true,
    })!;
    this.offscreenCanvas = null;
    this.offscreenContext = null;
    this.videoStartCallbacks = [];
    this.audioStream = [];

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
    this.offscreenCanvas = new OffscreenCanvas(this.width, this.height);
    this.offscreenContext = this.offscreenCanvas.getContext('2d', {
      willReadFrequently: true,
    });
  }

  get effect(): string {
    return this.currentEffect;
  }

  get canvas(): HTMLCanvasElement {
    return this.dataCanvas;
  }

  get audio(): MediaStreamTrack | null {
    return this.audioStream[0];
  }

  addVideoStartCallback(f: Function) {
    this.videoStartCallbacks.push(f);
  }

  async getVideo(): Promise<HTMLVideoElement> {
    const avStream = await navigator.mediaDevices.getUserMedia({
      audio: !isMobileFF, // mobile FF audio issue
      video: {
        facingMode: this.facingMode,
      },
    });

    const video = document.createElement('video');
    this.audioStream = avStream.getAudioTracks();

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

    await video.play();
    this.videoStartCallbacks.forEach((fn) => fn());

    return video;
  }

  async changeFacingMode(): Promise<void> {
    if (this.facingMode === 'user') {
      this.facingMode = 'environment';
    } else {
      this.facingMode = 'user';
    }

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

  createImageDataURL(): string {
    return this.dataCanvas.toDataURL('image/jpeg', 1.0);
  }

  takeSnapshot(): void {
    const dataURL = this.createImageDataURL();

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

    if (NEEDS_OFFSCREEN.includes(this.currentEffect)) {
      this.offscreenContext?.drawImage(this.video, 0, 0);

      EFFECT_MAP[this.currentEffect](
        this.offscreenContext,
        this.dataContext,
        this.width,
        this.height
      );
    } else {
      this.dataContext.clearRect(0, 0, this.width, this.height);
      this.dataContext.drawImage(this.video, 0, 0);

      if (EFFECT_MAP[this.currentEffect]) {
        EFFECT_MAP[this.currentEffect](
          this.dataContext,
          this.width,
          this.height
        );
      }
    }

    requestAnimationFrame(() => this.drawVideo());
  }
}
