import { useState } from 'react';

interface UseSnapShotReturn {
  showOverlay: boolean;
  remainingTime: string;
  setTimer: (time: number) => void;
}

export function useSnapshot(): UseSnapShotReturn {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [remainingTime, setRemaningTime] = useState<string>('');

  const setTimer = (time: number) => {
    setRemaningTime(String(time / 1000));
    setShowOverlay(true);
  };

  return {
    showOverlay,
    remainingTime,
    setTimer,
  };
}
