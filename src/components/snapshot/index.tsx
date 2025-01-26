import { useContext } from 'react';
import { AppContext } from '@/context/appContext';
import cameraIcon from '@/assets/icons/camera.svg';
import clockIcon from '@/assets/icons/clock.svg';

function Snapshot() {
  const appContext = useContext(AppContext);
  const showOverlay = appContext?.showOverlay;
  const setTimer = appContext?.setTimer;
  const camera = appContext?.camera;

  const setSnapTimer = () => {
    if (setTimer) setTimer(5000);
  };

  const takeSnapshot = () => camera?.takeSnapshot();

  return (
    <div className="snapshot-container">
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
