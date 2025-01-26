import { MouseEvent, useState, useContext } from 'react';
import { effectsList, EFFECTS } from '@/utils/effectList';
import { AppContext } from '@/context/appContext';
import Options from '@/components/options';

function Controls() {
  const [effect, setEffect] = useState<string>(EFFECTS.STANDARD);
  const appContext = useContext(AppContext);
  const camera = appContext?.camera;

  const handleEffect = (e: MouseEvent<HTMLButtonElement>) => {
    const effect = e.currentTarget.dataset.id!;

    setEffect(effect);
    camera?.setEffect(effect);
  };

  return (
    <div className="controls">
      <div className="effects-container">
        {effectsList.map((effectName) => {
          const activeClassName = effect === effectName ? 'active' : '';

          return (
            <button
              className={activeClassName}
              key={effectName}
              onClick={handleEffect}
              data-id={effectName}
              disabled={appContext?.showOverlay}
            >
              {effectName}
            </button>
          );
        })}
      </div>
      <Options currentEffect={effect} />
    </div>
  );
}

export default Controls;
