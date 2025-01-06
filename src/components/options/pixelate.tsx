import { ChangeEvent, useState } from 'react';
import { config, type ColorTypes } from '@/effects/pixelate';

function PixelateOptions() {
  const [pixelation, setPixelation] = useState<number>(config.size);
  const [darkColor, setDarkColor] = useState<string>(config.darkColor);
  const [midColor, setMidColor] = useState<string>(config.midColor);
  const [lightColor, setLightColor] = useState<string>(config.lightColor);

  const colorsMap = {
    darkColor: setDarkColor,
    midColor: setMidColor,
    lightColor: setLightColor,
  };

  const handleSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    config.size = value;
    setPixelation(value);
  };

  const handleColor = (property: ColorTypes, value: string) => {
    config[property] = value;
    colorsMap[property](value);
  };

  return (
    <>
      <fieldset>
        <legend>Size</legend>
        <input
          type="range"
          min="3"
          max="20"
          value={pixelation}
          onChange={handleSlider}
        />
      </fieldset>
      <fieldset>
        <legend>Dark Color</legend>
        <input
          type="color"
          value={darkColor}
          onChange={(e) => handleColor('darkColor', e.currentTarget.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Middle Color</legend>
        <input
          type="color"
          value={midColor}
          onChange={(e) => handleColor('midColor', e.currentTarget.value)}
        />
      </fieldset>
      <fieldset>
        <legend>Light Color</legend>
        <input
          type="color"
          value={lightColor}
          onChange={(e) => handleColor('lightColor', e.currentTarget.value)}
        />
      </fieldset>
    </>
  );
}

export default PixelateOptions;
