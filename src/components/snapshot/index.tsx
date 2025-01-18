import { useContext } from 'react';
import { AppContext } from '@/context/appContext';
interface Props {
  takeSnapshot: () => void;
  setTimer: (time: number) => void;
}

function Snapshot({ takeSnapshot, setTimer }: Props) {
  const appContext = useContext(AppContext);

  const setSnapTimer = () => {
    setTimer(5000);
  };

  return (
    <>
      <button onClick={takeSnapshot} disabled={appContext?.showOverlay}>
        take picture
      </button>
      <button onClick={setSnapTimer} disabled={appContext?.showOverlay}>
        5
      </button>
    </>
  );
}

export default Snapshot;
