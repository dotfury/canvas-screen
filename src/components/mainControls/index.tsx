import { useContext } from 'react';

import { AppContext } from '@/context/appContext';
import { RecorderStatus } from '@/utils/VideoRecorder';
import appConfig from '@/utils/appConfig';
import strings from '@/utils/strings';
import cameraIcon from '@/assets/icons/camera.svg';
import clockIcon from '@/assets/icons/clock.svg';
import reverseIcon from '@/assets/icons/circle_arrows.svg';
import videoIcon from '@/assets/icons/video.svg';
import { modalType } from '@/hooks/modal';

function MainControls() {
  const appContext = useContext(AppContext);
  const showOverlay = appContext?.showOverlay;
  const setTimer = appContext?.setTimer;
  const setImageURL = appContext?.setImageURL;
  const setActiveModal = appContext?.setActiveModal;
  const recorderStatus = appContext?.recorderStatus;
  const recorder = appContext?.recorder;
  const camera = appContext?.camera;

  const setSnapTimer = () => {
    if (setTimer) setTimer(5000);
  };

  const takeSnapshot = () => {
    if (setImageURL && setActiveModal) {
      setActiveModal(modalType.IMAGE);
      setImageURL(camera?.createImageDataURL() ?? '');
    }
  };

  const takeVideo = () => {
    if (setActiveModal) {
      setActiveModal(modalType.VIDEO);
    }
  };

  const stopVideo = () => {
    recorder?.stop();
  };

  const switchCamera = () => camera?.changeFacingMode();

  const installApp = () => {
    if (appConfig.deferredPrompt) {
      (appConfig.deferredPrompt as any).prompt();
    } else {
      alert(strings.nativeInstallWarning);
    }
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
      {recorderStatus !== RecorderStatus.RECORDING && (
        <>
          <button
            className="standard-button"
            onClick={takeSnapshot}
            disabled={showOverlay}
          >
            <img src={cameraIcon} alt="take snapshot" />
            {strings.buttons.picture}
          </button>
          <button
            className="standard-button"
            onClick={setSnapTimer}
            disabled={showOverlay}
          >
            <img src={clockIcon} alt="set timer" />5
          </button>
          <button
            className="standard-button"
            onClick={takeVideo}
            disabled={showOverlay}
          >
            <img src={videoIcon} alt="take video" />
            {strings.buttons.video}
          </button>
        </>
      )}
      {recorderStatus === RecorderStatus.RECORDING && (
        <button className="standard-button bg-red-600" onClick={stopVideo}>
          {strings.buttons.stop}
        </button>
      )}
      <button
        className="standard-button md:hidden"
        popoverTarget="popover"
        popoverTargetAction="toggle"
      >
        {strings.buttons.controls}
      </button>
      <button
        id="install-app-button"
        className="standard-button"
        onClick={installApp}
        disabled={showOverlay}
      >
        {strings.buttons.install}
      </button>
    </div>
  );
}

export default MainControls;
