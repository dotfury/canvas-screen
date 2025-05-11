import { useState } from 'react';

interface UseSnapShotReturn {
  showDownloadModal: boolean;
  showOverlay: boolean;
  takeSnapshot: boolean;
  remainingTime: number;
  imageURL: string;
  setTimer: (time: number) => void;
  updateDownloadImageModal: (url: string) => void;
}

export function useSnapshot(): UseSnapShotReturn {
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [takeSnapshot, setTakeSnapshot] = useState<boolean>(false);
  const [remainingTime, setRemaningTime] = useState<number>(0);
  const [imageURL, setImageURL] = useState<string>('');

  const updateTimer = (time: number): void => {
    const newTime = time - 1000;

    if (newTime <= 0) {
      setShowOverlay(false);
      setTakeSnapshot(true);
    } else {
      setRemaningTime(newTime);
      setTimeout(() => updateTimer(newTime), 1000);
    }
  };

  const setTimer = (time: number): void => {
    setRemaningTime(time);
    setShowOverlay(true);
    setTakeSnapshot(false);

    setTimeout(() => updateTimer(time), 1000);
  };

  const updateDownloadImageModal = (url: string): void => {
    if (url) {
      setImageURL(url);
      setShowDownloadModal(true);
    } else {
      setShowDownloadModal(false);
    }
  };

  return {
    imageURL,
    showDownloadModal,
    showOverlay,
    takeSnapshot,
    remainingTime,
    setTimer,
    updateDownloadImageModal,
  };
}
