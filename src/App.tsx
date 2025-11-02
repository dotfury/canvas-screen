import { useEffect } from 'react';

import '@/utils/installPwa';
import appConfig from '@/utils/appConfig';
import { RecorderStatus } from '@/utils/VideoRecorder';
import strings from '@/utils/strings';
import { useCamera } from '@/hooks/camera';
import { useModal, modalType } from '@/hooks/modal';
import { useSnapshot } from '@/hooks/snapshot';
import { useVideoRecorder } from '@/hooks/videoRecorder';
import { AppContext } from '@/context/appContext';
import Popover from '@/layout/popover';
import Loading from '@/layout/loading/loading';
import MainControls from '@/components/mainControls';
import Controls from '@/components/controls';
import Modal from '@/components/modal';

import './App.css';
const HAS_SEEN_MESSAGE = strings.storageKey;

const showAlert = () => {
  alert(strings.webviewAlert);
};

function App() {
  const [camera, cameraError, cameraLoading] = useCamera();
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
      {cameraLoading && <Loading />}
      <div className="relative flex flex-col">
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

  const renderError = () => <p>{strings.cameraError}</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
