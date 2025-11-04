import { ChangeEvent, useState, useContext } from 'react';
import { AppContext } from '@/context/appContext';
import { config } from '@/cameraEffects/grid';

function PixelateOptions() {
  const appContext = useContext(AppContext);
  const [width, setWidth] = useState<number>(config.width);
  const [interlace, setInterlace] = useState<boolean>(config.interlace);

  const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    config.width = value;
    setWidth(value);
  };

  const handleInterlace = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;
    config.interlace = value;
    setInterlace(value);
  };

  return (
    <>
      <fieldset>
        <legend>Width</legend>
        <input
          type="range"
          min={config.minWidth}
          max={config.maxWidth}
          value={width}
          step="10"
          onChange={handleSlider}
          disabled={appContext?.showOverlay}
        />
      </fieldset>
      <fieldset>
        <legend>Interlace</legend>
        <input
          type="checkbox"
          onChange={handleInterlace}
          checked={interlace}
          disabled={appContext?.showOverlay}
        />
      </fieldset>
    </>
  );
}

export default PixelateOptions;
