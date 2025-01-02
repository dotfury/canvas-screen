import { useState, useEffect } from 'react';
import Camera from '@/utils/camera';

export function useCamera() {
  const [camera, setCamera] = useState<Camera | null>(null);

  useEffect(() => {
    const setup = async () => {
      const canvas = document.querySelector("canvas")!;
      const camera = new Camera(canvas);

      await camera.init();
      camera.startVideo();

      setCamera(camera);
    }

    setup();
  }, []);

  return camera;
}
