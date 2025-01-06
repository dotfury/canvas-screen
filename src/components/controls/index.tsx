import { MouseEvent, useState } from 'react';
import { useCamera } from '@/hooks/camera';
import { effectsList, EFFECTS } from '@/utils/effectList';
import Options from '@/components/options';

function Controls() {
  const [effect, setEffect] = useState<string>(EFFECTS.STANDARD);
  const camera = useCamera();

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
