import { useEffect } from 'react';
import { useCamera } from '@/hooks/camera';
import { useSnapshot } from '@/hooks/snapshot';
import Controls from '@/components/controls';

import './App.css';

// TODO: disable UI buttons when snapshot timer runs (context api?)
// TODO: adjust snapshot button UI elements

function App() {
  const [camera, cameraError] = useCamera();
  const { showOverlay, takeSnapshot, remainingTime, setTimer } = useSnapshot();

  useEffect(() => {
    if (takeSnapshot) {
      camera?.takeSnapshot();
    }
  }, [takeSnapshot]);

  const renderApp = () => (
    <>
      <div className="canvas-container">
        <canvas />
        {showOverlay && (
          <div className="snapshot-timer">{String(remainingTime / 1000)}</div>
        )}
      </div>
      <Controls camera={camera} setTimer={setTimer} />
    </>
  );
  const renderError = () => <p>A camera is required for this application.</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
