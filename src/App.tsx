import { useEffect } from 'react';

import '@/utils/installPwa';
import appConfig from '@/utils/appConfig';
import { RecorderStatus } from '@/utils/VideoRecorder';
import { useCamera } from '@/hooks/camera';
import { useModal, modalType } from '@/hooks/modal';
import { useSnapshot } from '@/hooks/snapshot';
import { AppContext } from '@/context/appContext';
import MainControls from '@/components/mainControls';
import Controls from '@/components/controls';
import Modal from '@/components/modal';
import Popover from '@/layout/popover';
import { useVideoRecorder } from '@/hooks/videoRecorder';

import './App.css';
const HAS_SEEN_MESSAGE = 'canvas-screen:hasSeenBrowserMessage';

const showAlert = () => {
  alert('Open this application in a dedicated browser for the best experience');
};

function App() {
  const [camera, cameraError] = useCamera();
  const { showModal, setShowModal, activeModal, setActiveModal } = useModal();
  const {
    imageURL,
    showOverlay,
    takeSnapshot,
    remainingTime,
    setTimer,
    setImageURL,
  } = useSnapshot();

  const { recorder, recorderStatus } = useVideoRecorder(camera?.canvas ?? null);

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
      setActiveModal(modalType.IMAGE);
      setImageURL(camera?.createImageDataURL() ?? '');
    }
  }, [takeSnapshot]);

  useEffect(() => {
    if (activeModal !== null) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [activeModal]);

  useEffect(() => {
    console.log('status: ', recorderStatus);
    if (recorderStatus === RecorderStatus.PREVIEW) {
      setActiveModal(modalType.PREVIEW);
    }
  }, [recorderStatus]);

  const renderApp = () => (
    <AppContext.Provider
      value={{
        imageURL,
        showModal,
        showOverlay,
        camera,
        recorder,
        recorderStatus,
        activeModal,
        setImageURL,
        setTimer,
        setShowModal,
        setActiveModal,
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
      <Modal />
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
