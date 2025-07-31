import { useState, useContext } from 'react';
import { AppContext } from '@/context/appContext';
import { Directions, config } from '@/cameraEffects/slitscan';

function SlitscanOptions() {
  const appContext = useContext(AppContext);
  const [direction, setDirection] = useState(config.direction);

  const directionOptions: { label: string; key: Directions }[] = [
    { label: Directions.HORIZONTAL, key: Directions.HORIZONTAL },
    { label: Directions.VERTICAL, key: Directions.VERTICAL },
  ];

  const handleDirection = (value: Directions) => {
    config.direction = value;
    setDirection(value);
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
    </>
  );
}

export default SlitscanOptions;
