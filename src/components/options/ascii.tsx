import { ChangeEvent, useState, useContext } from 'react';
import { AppContext } from '@/context/appContext';
import {
  config,
  type ColorTypes,
  type NumberTypes,
  type FontTypes,
} from '@/cameraEffects/ascii';

function AsciiOptions() {
  const appContext = useContext(AppContext);
  const [pixelation, setPixelation] = useState<number>(config.size);
  const [darkColor, setDarkColor] = useState<string>(config.darkColor);
  const [midColor, setMidColor] = useState<string>(config.midColor);
  const [lightColor, setLightColor] = useState<string>(config.lightColor);
  const [darkThreshold, setDarkThreshold] = useState<number>(config.dark);
  const [lightThreshold, setLightThreshold] = useState<number>(config.light);
  const [font, setFont] = useState<string>(config.font);
  const [flow, setFlow] = useState<boolean>(config.flow);

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

  const fontOptions: { label: string; key: FontTypes }[] = [
    { label: 'Sans', key: 'sans-serif' },
    { label: 'Acer', key: 'acer' },
    { label: 'Geist', key: 'geist' },
    { label: 'Fira', key: 'fira' },
    { label: 'Apricot', key: 'apricot' },
  ];

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

  const handleFont = (value: string) => {
    config.font = value;
    setFont(value);
  };

  const handleFlow = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked;
    config.flow = value;
    setFlow(value);
  };

  return (
    <>
      <fieldset>
        <legend>Size</legend>
        <input
          type="range"
          min={config.minSize}
          max="20"
          value={pixelation}
          onChange={handleSlider}
          disabled={appContext?.showOverlay}
        />
      </fieldset>
      {colorOptions.map(({ label, value, key }) => (
        <fieldset key={key}>
          <legend>{label}</legend>
          <input
            type="color"
            value={value}
            onChange={(e) => handleColor(key, e.currentTarget.value)}
            disabled={appContext?.showOverlay}
          />
        </fieldset>
      ))}
      {thresholdOptions.map(({ label, value, key }) => (
        <fieldset key={key}>
          <legend>{label}</legend>
          <input
            type="range"
            value={value}
            min="0"
            max="255"
            onChange={(e) => handleThreshold(key, e.currentTarget.value)}
            disabled={appContext?.showOverlay}
          />
        </fieldset>
      ))}
      <fieldset>
        <legend>Font</legend>
        {fontOptions.map(({ label, key }) => (
          <div key={key}>
            <input
              type="radio"
              id={key}
              name={key}
              value={key}
              checked={font === key}
              onChange={(e) => handleFont(e.currentTarget.value)}
              disabled={appContext?.showOverlay}
            />
            <label htmlFor={key}>{label}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Flow</legend>
        <input
          type="checkbox"
          onChange={handleFlow}
          checked={flow}
          disabled={appContext?.showOverlay}
        />
      </fieldset>
    </>
  );
}

export default AsciiOptions;
