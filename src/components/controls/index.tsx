import { MouseEvent, useState, useContext } from 'react';
import { effectsList, EFFECTS } from '@/utils/effectList';
import { AppContext } from '@/context/appContext';
import Options from '@/components/options';

function Controls() {
  const appContext = useContext(AppContext);
  const camera = appContext?.camera;
  const [effect, setEffect] = useState<string>(
    camera?.effect || EFFECTS.STANDARD
  );

  const handleEffect = (e: MouseEvent<HTMLButtonElement>) => {
    const effect = e.currentTarget.dataset.id!;

    setEffect(effect);
    camera?.setEffect(effect);
  };

  return (
    <>
      <div className="md:flex md:flex-1 md:gap-2">
        <div className="flex pl-2 gap-2 flex-1 lg:block">
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
      </div>
      <Options currentEffect={effect} />
      <div className="fixed left-0 bottom-0 w-full h-2 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
    </>
  );
}

export default Controls;
