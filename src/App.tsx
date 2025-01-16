import { useCamera } from '@/hooks/camera';
import { useSnapshot } from '@/hooks/snapshot';
import Controls from '@/components/controls';

import './App.css';

function App() {
  const [camera, cameraError] = useCamera();
  const { showOverlay, remainingTime, setTimer } = useSnapshot();

  const renderApp = () => (
    <>
      <div className="canvas-container">
        <canvas />
        {showOverlay && <div className="snapshot-timer">{remainingTime}</div>}
      </div>
      <Controls camera={camera} setTimer={setTimer} />
    </>
  );
  const renderError = () => <p>A camera is required for this application.</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
