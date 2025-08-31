// ref - https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js
// ref - https://webrtc.github.io/samples/src/content/capture/canvas-record/
// ref - https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

const VIDEO_DURATION = 5000;

export default class VideoRecorder {
  private static instance: VideoRecorder;
  static canvas: HTMLCanvasElement | null;

  mediaSource: MediaSource;
  sourceBuffer: SourceBuffer | null;
  mediaRecorder: MediaRecorder | null;
  stream: MediaStream | null;
  initialized: boolean;
  recordedData: Blob[];

  constructor(canvas: HTMLCanvasElement | null) {
    if (!VideoRecorder.instance) {
      VideoRecorder.instance = this;
    }

    VideoRecorder.canvas = canvas;

    this.sourceBuffer = null;
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener(
      'sourceopen',
      this.handleSourceOpen,
      false
    );
    this.stream = null;
    this.initialized = true;
    this.recordedData = [];
    this.mediaRecorder = null;

    return VideoRecorder.instance;
  }

  handleSourceOpen() {
    this.sourceBuffer = this.mediaSource.addSourceBuffer(
      'video/webm; codecs="vp8"'
    );
    console.log('Source buffer: ', this.sourceBuffer);
  }

  recordCanvas() {
    if (VideoRecorder.canvas) {
      let options = { mimeType: 'video/mp4' };
      this.stream = VideoRecorder.canvas.captureStream();
      this.recordedData = [];

      try {
        this.mediaRecorder = new MediaRecorder(this.stream, options);
      } catch (e0) {
        console.log('Unable to create MediaRecorder with options Object: ', e0);
        try {
          options = { mimeType: 'video/webm,codecs=vp9' };
          this.mediaRecorder = new MediaRecorder(this.stream, options);
        } catch (e1) {
          console.log(
            'Unable to create MediaRecorder with options Object: ',
            e1
          );
          throw 'Unable to create MediaRecorder';
        }
      }

      this.mediaRecorder.onstop = this.handleStop.bind(this);
      this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
      this.mediaRecorder.onerror = this.handleRecordingError.bind(this);
      this.mediaRecorder.start(1000); // collect 100ms of data

      setTimeout(() => {
        this.mediaRecorder?.stop();
      }, VIDEO_DURATION);
    } else {
      throw 'No canvas found, recording aborted';
    }
  }

  handleDataAvailable(event: BlobEvent) {
    console.log('available: ', event.data);
    if (event.data && event.data.size > 0) {
      this.recordedData.push(event.data);
    }
  }

  handleStop() {
    try {
      this.download();
      return;
      const superBuffer = new Blob(this.recordedData, { type: 'video/webm' });
      console.log('super: ', superBuffer);
      this.stream = null;
      this.mediaRecorder = null;
      window.open(window.URL.createObjectURL(superBuffer), '_blank');
    } catch (e) {
      console.log(e);
    }
  }

  handleRecordingError(event: any) {
    console.error(event.error);
  }

  download() {
    const blob = new Blob(this.recordedData, { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
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
