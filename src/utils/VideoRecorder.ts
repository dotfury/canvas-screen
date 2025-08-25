// ref - https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js
// ref - https://webrtc.github.io/samples/src/content/capture/canvas-record/
// ref - https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

export default class VideoRecorder {
  private static instance: VideoRecorder;
  static mediaSource: MediaSource;
  static sourceBuffer: SourceBuffer | null;
  static canvas: HTMLCanvasElement | null;
  initialized: boolean;

  constructor(canvas: HTMLCanvasElement | null) {
    if (!VideoRecorder.instance) {
      VideoRecorder.instance = this;
    }

    VideoRecorder.canvas = canvas;
    VideoRecorder.sourceBuffer = null;
    VideoRecorder.mediaSource = new MediaSource();
    VideoRecorder.mediaSource.addEventListener(
      'sourceopen',
      this.handleSourceOpen,
      false
    );
    this.initialized = true;
    console.log(this);
    return VideoRecorder.instance;
  }

  handleSourceOpen(event: Event) {
    console.log('MediaSource opened: ', event);
    VideoRecorder.sourceBuffer = VideoRecorder.mediaSource.addSourceBuffer(
      'video/webm; codecs="vp8"'
    );
    console.log('Source buffer: ', VideoRecorder.sourceBuffer);
  }
}
