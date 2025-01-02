import { useCamera } from '@/hooks/camera';
import './App.css'

function App() {
  const camera = useCamera();

  return (
    <>
      <canvas></canvas>
      <button onClick={ () => camera?.setEffect('PIXELATE') }>HI</button>
    </>
  )
}

export default App
