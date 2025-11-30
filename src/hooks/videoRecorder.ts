import { useState } from 'react';

import VideoRecorder, { RecorderStatus } from '@/utils/VideoRecorder';

export function useVideoRecorder(
  canvas: HTMLCanvasElement | null,
  audio: MediaStreamTrack | null
) {
  if (
    'ManagedMediaSource' in window === false &&
    'MediaSource' in window === false
  ) {
    return {
      recorder: null,
      recorderStatus: RecorderStatus.STANDBY,
    };
  }

  try {
    const recorder = new VideoRecorder(canvas, audio);
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
  } catch (e) {
    return {
      recorder: null,
      recorderStatus: RecorderStatus.STANDBY,
    };
  }
}
