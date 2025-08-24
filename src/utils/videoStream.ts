// ref - https://github.com/webrtc/samples/blob/gh-pages/src/content/capture/canvas-record/js/main.js
// ref - https://webrtc.github.io/samples/src/content/capture/canvas-record/
let mediaSource;

export default function setupVideoStream() {
  mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', (e) => console.log(e), false);

  return mediaSource;
}
