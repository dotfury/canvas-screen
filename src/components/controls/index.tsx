import { MouseEvent, useState, useContext } from 'react';
import { effectsList, EFFECTS } from '@/utils/effectList';
import { AppContext } from '@/context/appContext';
import Options from '@/components/options';
import Popover from '@/layout/popover';

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
    <Popover id="popover">
      <div className="relative pl-1 md:flex md:flex-1 md:gap-2">
        <div className="flex gap-2 flex-1 md:block">
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
        <div className="absolute left-0 bottom-0 w-full h-2 bg-gradient-to-t from-black/30 to-transparent md:hidden"></div>
      </div>
    </Popover>
  );
}

export default Controls;
