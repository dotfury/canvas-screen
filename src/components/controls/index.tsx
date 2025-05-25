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
    <div className="controls flex flex-1 gap-2 mx-1 h-48 overflow-scroll md:h-auto md:mx-2.5">
      <div className="effects-container flex-1 pl-0.5">
        {effectsList.map((effectName) => {
          const activeClassName = effect === effectName ? 'active' : '';

          return (
            <button
              className={`standard-button block ${activeClassName}`}
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
