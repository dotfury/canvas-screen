import { ChangeEvent, useState } from 'react';
import { config, type ColorTypes, NumberTypes } from '@/cameraEffects/pixelate';

function PixelateOptions() {
  const [pixelation, setPixelation] = useState<number>(config.size);
  const [darkColor, setDarkColor] = useState<string>(config.darkColor);
  const [midColor, setMidColor] = useState<string>(config.midColor);
  const [lightColor, setLightColor] = useState<string>(config.lightColor);
  const [darkThreshold, setDarkThreshold] = useState<number>(config.dark);
  const [lightThreshold, setLightThreshold] = useState<number>(config.light);

  const colorOptions: {
    label: string;
    value: string;
    key: ColorTypes;
  }[] = [
    { label: 'Dark Color', value: darkColor, key: 'darkColor' },
    { label: 'Middle Color', value: midColor, key: 'midColor' },
    { label: 'Light Color', value: lightColor, key: 'lightColor' },
  ];

  const colorsMap = {
    darkColor: setDarkColor,
    midColor: setMidColor,
    lightColor: setLightColor,
  };

  const thresholdOptions: {
    label: string;
    value: number;
    key: NumberTypes;
  }[] = [
    { label: 'Dark Threshold', value: darkThreshold, key: 'dark' },
    { label: 'Light Threshold', value: lightThreshold, key: 'light' },
  ];

  const thresholdMap = {
    dark: setDarkThreshold,
    light: setLightThreshold,
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

  const handleThreshold = (property: NumberTypes, value: string) => {
    const numValue = Number(value);
    config[property] = numValue;
    thresholdMap[property](numValue);
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
      {colorOptions.map(({ label, value, key }) => (
        <fieldset>
          <legend>{label}</legend>
          <input
            type="color"
            value={value}
            onChange={(e) => handleColor(key, e.currentTarget.value)}
          />
        </fieldset>
      ))}
      {thresholdOptions.map(({ label, value, key }) => (
        <fieldset>
          <legend>{label}</legend>
          <input
            type="range"
            value={value}
            min="0"
            max="255"
            onChange={(e) => handleThreshold(key, e.currentTarget.value)}
          />
        </fieldset>
      ))}
    </>
  );
}

export default PixelateOptions;
