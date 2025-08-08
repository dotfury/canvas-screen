import { useEffect } from 'react';

import '@/utils/installPwa';
import appConfig from '@/utils/appConfig';
import { useCamera } from '@/hooks/camera';
import { useSnapshot } from '@/hooks/snapshot';
import { AppContext } from '@/context/appContext';
import MainControls from '@/components/mainControls';
import Controls from '@/components/controls';
import Download from '@/components/download';
import Popover from '@/layout/popover';

import './App.css';
const HAS_SEEN_MESSAGE = 'canvas-screen:hasSeenBrowserMessage';

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
    if (localStorage.getItem(HAS_SEEN_MESSAGE) !== 'true') {
      alert(
        'Open this application in a dedicated browser for the best experience'
      );
      localStorage.setItem(HAS_SEEN_MESSAGE, 'true');
    }
  }, []);

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
      <div className="relative">
        <canvas />
        {showOverlay && (
          <div className="snapshot-timer">{String(remainingTime / 1000)}</div>
        )}
        <MainControls />
      </div>
      <Popover id="popover">
        <Controls />
      </Popover>
      <Download />
    </AppContext.Provider>
  );

  const renderError = () => <p>A camera is required for this application.</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
