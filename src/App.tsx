import { useEffect } from 'react';
import { useCamera } from '@/hooks/camera';
import { useSnapshot } from '@/hooks/snapshot';
import { AppContext } from '@/context/appContext';
import Controls from '@/components/controls';

import './App.css';

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
    <AppContext.Provider value={{ showOverlay, camera, setTimer }}>
      <div className="canvas-container">
        <canvas />
        {showOverlay && (
          <div className="snapshot-timer">{String(remainingTime / 1000)}</div>
        )}
      </div>
      <Controls />
    </AppContext.Provider>
  );
  const renderError = () => <p>A camera is required for this application.</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
