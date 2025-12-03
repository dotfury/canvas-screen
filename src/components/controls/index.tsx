import { useState, useContext, ChangeEvent } from 'react';
import { effectsList, EFFECTS } from '@/utils/effectList';
import { AppContext } from '@/context/appContext';
import Options from '@/components/options';

function Controls() {
  const appContext = useContext(AppContext);
  const camera = appContext?.camera;
  const [effect, setEffect] = useState<string>(
    camera?.effect || EFFECTS.STANDARD
  );

  const handleEffect = (e: ChangeEvent<HTMLSelectElement>) => {
    const effect = e.currentTarget.value;

    setEffect(effect);
    camera?.setEffect(effect);
  };

  return (
    <>
      <div className="md:flex md:flex-1 md:gap-2">
        <div className="flex pl-2 gap-2 flex-1 lg:block">
          <fieldset>
            <label htmlFor="effect">Effect: </label>
            <select
              name="effect"
              id="effect-selector"
              value={effect}
              onChange={handleEffect}
              disabled={appContext?.showOverlay}
            >
              {effectsList.map((effectName) => {
                return <option value={effectName}>{effectName}</option>;
              })}
            </select>
          </fieldset>
        </div>
      </div>
      <Options currentEffect={effect} />
      <div className="fixed left-0 bottom-0 w-full h-2 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
    </>
  );
}

export default Controls;
