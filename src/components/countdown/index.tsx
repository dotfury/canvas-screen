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

  const millisToMinutesAndSeconds = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);

    return `${String(minutes).padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  };

  return (
    <div className="p-1 my-1.5 bg-black/25 rounded-sm flex items-center justify-center">
      {millisToMinutesAndSeconds(time)}
    </div>
  );
}

export default Countdown;
