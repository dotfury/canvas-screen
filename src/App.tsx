import { useEffect } from 'react';

import appConfig from '@/utils/appConfig';
import { useCamera } from '@/hooks/camera';
import { useSnapshot } from '@/hooks/snapshot';
import { AppContext } from '@/context/appContext';
import Snapshot from '@/components/snapshot';
import Controls from '@/components/controls';
import Download from '@/components/download';

import './App.css';

function App() {
  const [camera, cameraError] = useCamera();
  const {
    imageURL,
    showDownloadModal,
    showOverlay,
    takeSnapshot,
    remainingTime,
    setTimer,
    updateDownloadImageModal,
  } = useSnapshot();

  useEffect(() => {
    if (takeSnapshot) {
      if (appConfig.isMobile) {
        updateDownloadImageModal(camera?.createImageDataURL() ?? '');
      } else {
        camera?.takeSnapshot();
      }
    }
  }, [takeSnapshot]);

  const renderApp = () => (
    <AppContext.Provider
      value={{
        imageURL,
        showDownloadModal,
        updateDownloadImageModal,
        showOverlay,
        camera,
        setTimer,
      }}
    >
      <div className="canvas-container relative">
        <canvas />
        {showOverlay && (
          <div className="snapshot-timer">{String(remainingTime / 1000)}</div>
        )}
        <Snapshot />
      </div>
      <Controls />
      <Download />
    </AppContext.Provider>
  );

  const renderError = () => <p>A camera is required for this application.</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
