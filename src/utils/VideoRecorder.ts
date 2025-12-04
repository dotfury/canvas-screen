import strings from '@/utils/strings';
import { VIDEO_DURATION } from '@/utils/constants';

export enum RecorderStatus {
  STANDBY = 'standby',
  RECORDING = 'recording',
  PREVIEW = 'preview',
}

export default class VideoRecorder {
  private static instance: VideoRecorder;
  static canvas: HTMLCanvasElement | null;
  static audio: MediaStreamTrack | null;

  mediaSource: MediaSource | any;
  sourceBuffer: SourceBuffer | null;
  mediaRecorder: MediaRecorder | null;
  stream: MediaStream | null;
  initialized: boolean;
  recordedData: Blob[];
  _status: RecorderStatus;
  recordStartCallbacks: Function[];
  recordEndCallbacks: Function[];
  _videoURL: string | undefined;

  constructor(
    canvas: HTMLCanvasElement | null,
    audio: MediaStreamTrack | null
  ) {
    if (!VideoRecorder.instance) {
      VideoRecorder.instance = this;
    }

    VideoRecorder.canvas = canvas;
    VideoRecorder.audio = audio;

    this._status = RecorderStatus.STANDBY;
    this._videoURL = '';
    this.sourceBuffer = null;
    this.mediaSource = this.getMediaSource();
    this.mediaSource.addEventListener(
      'sourceopen',
      this.handleSourceOpen,
      false
    );
    this.stream = null;
    this.initialized = true;
    this.recordedData = [];
    this.mediaRecorder = null;
    this.recordStartCallbacks = [];
    this.recordEndCallbacks = [];

    return VideoRecorder.instance;
  }

  get status() {
    return this._status;
  }

  get video() {
    return this._videoURL;
  }

  getMediaSource() {
    if ('ManagedMediaSource' in window && window.ManagedMediaSource) {
      return new (window.ManagedMediaSource as any)();
    }

    if (window.MediaSource) {
      return new window.MediaSource();
    }

    throw 'No MediaSource API available';
  }

  clearPreview() {
    this._videoURL = '';
  }

  addStartCallback(f: Function) {
    this.recordStartCallbacks.push(f);
  }

  addEndCallback(f: Function) {
    this.recordEndCallbacks.push(f);
  }

  handleSourceOpen() {
    this.sourceBuffer = this.mediaSource.addSourceBuffer(
      'video/webm; codecs="vp8"'
    );
  }

  stop() {
    this.mediaRecorder?.stop();
  }

  recordCanvas() {
    if (VideoRecorder.canvas) {
      this._status = RecorderStatus.RECORDING;
      this.recordStartCallbacks.forEach((f) => f());
      let options = {
        mimeType: 'video/mp4',
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
      };
      this.stream = VideoRecorder.canvas.captureStream();
      if (VideoRecorder.audio) {
        this.stream.addTrack(VideoRecorder.audio);
      }
      this.recordedData = [];
      try {
        this.mediaRecorder = new MediaRecorder(this.stream, options);
      } catch (e0) {
        console.log(strings.mediaRecorderError, e0);
        try {
          options = { ...options, mimeType: 'video/webm;codecs:vp9' };
          this.mediaRecorder = new MediaRecorder(this.stream, options);
        } catch (e1) {
          console.log(strings.mediaRecorderError, e1);
          throw strings.mediaRecorderError;
        }
      }

      this.mediaRecorder.onstop = this.handleStop.bind(this);
      this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
      this.mediaRecorder.onerror = this.handleRecordingError.bind(this);
      this.mediaRecorder.start();

      setTimeout(() => {
        this.stop();
      }, VIDEO_DURATION);
    } else {
      throw strings.noCanvasError;
    }
  }

  handleDataAvailable(event: BlobEvent) {
    if (event.data && event.data.size > 0) {
      this.recordedData.push(event.data);
    }
  }

  handleStop() {
    try {
      // create preview URL
      const superBuffer = new Blob(this.recordedData, { type: 'video/mp4' });
      this._videoURL = window.URL.createObjectURL(superBuffer);
      // display preview
      this._status = RecorderStatus.PREVIEW;
      this.recordEndCallbacks.forEach((f) => f());

      this.stream = null;
      this.mediaRecorder = null;
    } catch (e) {
      console.log(e);
    }
  }

  handleRecordingError(event: any) {
    console.error(event.error);
  }

  download() {
    const url = this._videoURL ?? '';
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'canvas.mp4';
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 100);
  }
}
