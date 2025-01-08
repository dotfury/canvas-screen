import { useState, useEffect } from 'react';
import Camera from '@/utils/camera';

export function useCamera(): [Camera | null, boolean] {
  const [cameraError, setCameraError] = useState<boolean>(false);
  const [camera, setCamera] = useState<Camera | null>(null);

  useEffect(() => {
    const setup = async () => {
      try {
        const canvas = document.querySelector('canvas')!;
        const camera = new Camera(canvas);

        await camera.init();
        camera.startVideo();

        setCamera(camera);
      } catch (error: any) {
        setCameraError(true);
      }
    };

    setup();
  }, []);

  return [camera, cameraError];
}
