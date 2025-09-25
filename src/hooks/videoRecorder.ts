import { useState } from 'react';

import VideoRecorder, { RecorderStatus } from '@/utils/VideoRecorder';

export function useVideoRecorder(canvas: HTMLCanvasElement | null) {
  const [recorderError, setRecorderError] = useState<boolean>(false);

  try {
    const recorder = new VideoRecorder(canvas);
    const [recorderStatus, setRecorderStatus] = useState<RecorderStatus>(
      recorder.status
    );

    const handleStart = () => {
      setRecorderStatus(recorder.status);
    };

    const handleEnd = () => {
      setRecorderStatus(recorder.status);
    };
    recorder.addStartCallback(handleStart);
    recorder.addEndCallback(handleEnd);

    return {
      recorder,
      recorderStatus,
      recorderError,
    };
  } catch (e) {
    setRecorderError(true);

    return {
      recorder: null,
      recorderStatus: RecorderStatus.STANDBY,
      recorderError,
    };
  }
}
