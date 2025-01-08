import { useCamera } from '@/hooks/camera';
import Controls from '@/components/controls';

import './App.css';

function App() {
  const [camera, cameraError] = useCamera();

  const renderApp = () => (
    <>
      <canvas />
      <Controls camera={camera} />
    </>
  );
  const renderError = () => <p>A camera is required for this application.</p>;

  return !cameraError ? renderApp() : renderError();
}

export default App;
