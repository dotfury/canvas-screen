import { ChangeEvent, useState, useContext } from 'react';
import { AppContext } from '@/context/appContext';
import { Directions, config } from '@/cameraEffects/slitscan';

function SlitscanOptions() {
  const appContext = useContext(AppContext);
  const [direction, setDirection] = useState(config.direction);
  const [size, setSize] = useState<number>(config.size);

  const directionOptions: { label: string; key: Directions }[] = [
    { label: Directions.HORIZONTAL, key: Directions.HORIZONTAL },
    { label: Directions.VERTICAL, key: Directions.VERTICAL },
  ];

  const handleDirection = (value: Directions) => {
    config.direction = value;
    setDirection(value);
  };

  const handleSize = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.currentTarget.value);
    config.size = value;
    setSize(value);
  };

  return (
    <>
      <fieldset>
        <legend>Shape</legend>
        {directionOptions.map(({ label, key }) => (
          <div key={key}>
            <input
              type="radio"
              id={key}
              name={key}
              value={key}
              checked={direction === key}
              onChange={(e) =>
                handleDirection(e.currentTarget.value as Directions)
              }
              disabled={appContext?.showOverlay}
            />
            <label htmlFor={key}>{label}</label>
          </div>
        ))}
      </fieldset>
      <fieldset>
        <legend>Size</legend>
        <input
          type="range"
          min={config.minSize}
          max={config.maxSize}
          value={size}
          step="1"
          onChange={handleSize}
          disabled={appContext?.showOverlay}
        />
      </fieldset>
    </>
  );
}

export default SlitscanOptions;
