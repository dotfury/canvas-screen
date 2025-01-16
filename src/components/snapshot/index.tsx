interface Props {
  takeSnapshot: () => void;
  setTimer: (time: number) => void;
}

function Snapshot({ takeSnapshot, setTimer }: Props) {
  const setSnapTimer = () => {
    setTimer(5000);
  };

  return (
    <>
      <button onClick={takeSnapshot}>take picture</button>
      <button onClick={setSnapTimer}>5</button>
    </>
  );
}

export default Snapshot;
