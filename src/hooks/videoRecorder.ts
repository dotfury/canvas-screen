import { useState } from 'react';

import VideoRecorder, { RecorderStatus } from '@/utils/VideoRecorder';

export function useVideoRecorder(canvas: HTMLCanvasElement | null) {
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
  };
}
