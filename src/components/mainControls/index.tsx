import { useContext } from 'react';
import { AppContext } from '@/context/appContext';
import appConfig from '@/utils/appConfig';
import cameraIcon from '@/assets/icons/camera.svg';
import clockIcon from '@/assets/icons/clock.svg';
import reverseIcon from '@/assets/icons/circle_arrows.svg';

function MainControls() {
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

  const installApp = () => {
    if (appConfig.deferredPrompt) {
      (appConfig.deferredPrompt as any).prompt();
    } else {
      alert(
        'Native install not available. Please install by adding this page to the home screen.'
      );
    }
  };

  const displayAgent = () => {
    alert(navigator.userAgent);
  };

  return (
    <div className="flex gap-2 mx-1">
      {appConfig.isMobile && (
        <button
          className="standard-button"
          onClick={switchCamera}
          disabled={showOverlay}
        >
          <img src={reverseIcon} width={20} height={20} alt="switch camera" />
        </button>
      )}
      <button
        className="standard-button"
        onClick={takeSnapshot}
        disabled={showOverlay}
      >
        <img src={cameraIcon} alt="take snapshot" />
        picture
      </button>
      <button
        className="standard-button"
        onClick={setSnapTimer}
        disabled={showOverlay}
      >
        <img src={clockIcon} alt="set timer" />5
      </button>
      <button
        className="standard-button md:hidden"
        popoverTarget="popover"
        popoverTargetAction="toggle"
      >
        controls
      </button>
      <button
        id="install-app-button"
        className="standard-button"
        onClick={installApp}
        disabled={showOverlay}
      >
        install app
      </button>
      <button
        className="standard-button"
        onClick={displayAgent}
        disabled={showOverlay}
      >
        check agent
      </button>
    </div>
  );
}

export default MainControls;
