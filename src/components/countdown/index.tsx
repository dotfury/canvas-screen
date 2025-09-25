import { useEffect, useState } from 'react';

import { COUNTDOWN_INTERVAL } from '@/utils/constants';

function Countdown({ initialTime }: { initialTime: number }) {
  const [time, setTime] = useState<number>(initialTime);

  useEffect(() => {
    setTimeout(() => updateTimer(time), COUNTDOWN_INTERVAL);
  }, []);

  const updateTimer = (time: number): void => {
    const newTime = time - COUNTDOWN_INTERVAL;

    setTime(newTime);
    setTimeout(() => updateTimer(newTime), COUNTDOWN_INTERVAL);
  };

  return (
    <div className="p-1 my-1.5 bg-black/25 rounded-sm flex items-center justify-center">{`${String(time / COUNTDOWN_INTERVAL).padStart(2, '0')}:00`}</div>
  );
}

export default Countdown;
