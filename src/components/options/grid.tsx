import { ChangeEvent, useState, useContext } from 'react';
import { AppContext } from '@/context/appContext';
import { config } from '@/cameraEffects/grid';

function PixelateOptions() {
  const appContext = useContext(AppContext);
  const [width, setWidth] = useState<number>(config.width);

  const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    config.width = value;
    setWidth(value);
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
          onChange={handleSlider}
          disabled={appContext?.showOverlay}
        />
      </fieldset>
    </>
  );
}

export default PixelateOptions;
