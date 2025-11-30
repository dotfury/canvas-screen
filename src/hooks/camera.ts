import { useState, useEffect } from 'react';
import Camera from '@/utils/WebCamera';

export function useCamera(): [Camera | null, boolean, boolean] {
  const [cameraError, setCameraError] = useState<boolean>(false);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [cameraLoading, setCameraLoading] = useState<boolean>(true);

  useEffect(() => {
    const setup = async () => {
      try {
        const canvas = document.querySelector('canvas')!;
        const camera = new Camera(canvas);

        camera.addVideoStartCallback(() => setCameraLoading(false));
        await camera.init();
        camera.startVideo();

        setCamera(camera);
      } catch (error: any) {
        alert(error);
        alert(error.message);
        setCameraError(true);
      }
    };

    setup();
  }, []);

  return [camera, cameraError, cameraLoading];
}
