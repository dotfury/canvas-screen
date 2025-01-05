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
    <>
      {effectsList.map((effectName) => (
        <button key={effectName} onClick={handleEffect} data-id={effectName}>
          {effectName}
        </button>
      ))}

      <Options currentEffect={effect} />
    </>
  );
}

export default Controls;
