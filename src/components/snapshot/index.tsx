import { useContext } from 'react';
import { AppContext } from '@/context/appContext';
import appConfig from '@/utils/appConfig';
import cameraIcon from '@/assets/icons/camera.svg';
import clockIcon from '@/assets/icons/clock.svg';
import reverseIcon from '@/assets/icons/circle_arrows.svg';

function Snapshot() {
  const appContext = useContext(AppContext);
  const showOverlay = appContext?.showOverlay;
  const setTimer = appContext?.setTimer;
  const updateDownloadImageModal = appContext?.updateDownloadImageModal;
  const camera = appContext?.camera;

  const setSnapTimer = () => {
    if (setTimer) setTimer(5000);
  };

  const takeSnapshot = () => {
    if (appConfig.isMobile) {
      if (updateDownloadImageModal) {
        updateDownloadImageModal(camera?.createImageDataURL() ?? '');
      }
    } else {
      camera?.takeSnapshot();
    }
  };

  const switchCamera = () => camera?.changeFacingMode();

  return (
    <div className="snapshot-container">
      {appConfig.isMobile && (
        <button
          className="with-icon"
          onClick={switchCamera}
          disabled={showOverlay}
        >
          <img src={reverseIcon} width={20} height={20} alt="switch camera" />
        </button>
      )}
      <button
        className="with-icon"
        onClick={takeSnapshot}
        disabled={showOverlay}
      >
        <img src={cameraIcon} alt="take snapshot" />
        take picture
      </button>
      <button
        className="with-icon"
        onClick={setSnapTimer}
        disabled={showOverlay}
      >
        <img src={clockIcon} alt="set timer" />5
      </button>
    </div>
  );
}

export default Snapshot;
