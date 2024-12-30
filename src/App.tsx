import { useEffect, useState } from 'react'
import Camera from '@/utils/camera';
import './App.css'

function App() {
  const [camera, setCamera] = useState<Camera | null>(null);
  const [effect, setEffect] = useState<string>('NONE');

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

  useEffect(() => {
    if (camera) {
      camera.setEffect(effect);
    }
  }, [effect]);

  return (
    <>
      <canvas></canvas>
      <button onClick={ () => setEffect('PIXELATE') }>HI</button>
    </>
  )
}

export default App
