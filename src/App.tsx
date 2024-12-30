import { useEffect } from 'react'
import Camera from '@/utils/camera';
import './App.css'

function App() {
  useEffect(() => {
    const setup = async () => {
      const canvas = document.querySelector("canvas");
      const camera = new Camera(canvas);

      await camera.init();
      camera.startVideo();
    }

    setup();
  }, []);

  return (
    <>
      <canvas></canvas>
    </>
  )
}

export default App
