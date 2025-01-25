import { useContext } from 'react';
import { AppContext } from '@/context/appContext';

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
    <>
      <button onClick={takeSnapshot} disabled={showOverlay}>
        take picture
      </button>
      <button onClick={setSnapTimer} disabled={showOverlay}>
        5
      </button>
    </>
  );
}

export default Snapshot;
