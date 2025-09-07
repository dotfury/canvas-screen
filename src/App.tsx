import { useEffect } from 'react';

import '@/utils/installPwa';
import appConfig from '@/utils/appConfig';
import { useCamera } from '@/hooks/camera';
import { useModal } from './hooks/modal';
import { useSnapshot } from '@/hooks/snapshot';
import { AppContext } from '@/context/appContext';
import MainControls from '@/components/mainControls';
import Controls from '@/components/controls';
import Modal from '@/components/modal';
import { Modals } from '@/layout/modals';
import Popover from '@/layout/popover';

import './App.css';
const HAS_SEEN_MESSAGE = 'canvas-screen:hasSeenBrowserMessage';

const showAlert = () => {
  alert('Open this application in a dedicated browser for the best experience');
};

function App() {
  const [camera, cameraError] = useCamera();
  const [showModal, setShowModal] = useModal();
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
    if (appConfig.isMobile) {
      try {
        if (localStorage.getItem(HAS_SEEN_MESSAGE) !== 'true') {
          showAlert();
          localStorage.setItem(HAS_SEEN_MESSAGE, 'true');
        } else if (cameraError) {
          showAlert();
        }
      } catch (e) {
        showAlert();
      }
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

  useEffect(() => {
    if (showDownloadModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [showDownloadModal]);

  const renderApp = () => (
    <AppContext.Provider
      value={{
        imageURL,
        showModal,
        showDownloadModal,
        updateDownloadImageModal,
        showOverlay,
        camera,
        setTimer,
        setShowModal,
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
      {showModal && <Modal />}
      <Modals />
    </AppContext.Provider>
  );

  const renderError = () => (
    <p>
      A camera is required for this application. If on mobile, please open this
      application in a dedicated browser for the best experience.
    </p>
  );

  return !cameraError ? renderApp() : renderError();
}

export default App;
