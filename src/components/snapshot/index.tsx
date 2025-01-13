interface Props {
  takeSnapshot: () => void;
}
function Snapshot({ takeSnapshot }: Props) {
  const setTimer = () => {
    setTimeout(takeSnapshot, 2000);
  };

  return (
    <>
      <button onClick={takeSnapshot}>take picture</button>
      <button onClick={setTimer}>5</button>
    </>
  );
}

export default Snapshot;
