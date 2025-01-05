import { ReactElement, useEffect, useState } from 'react';
import { EFFECTS } from '@/utils/effectList';

interface Props {
  currentEffect: string
}

function Options({ currentEffect }: Props) {
  const [optionsComponent, setOptionsComponent] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (currentEffect === EFFECTS.STANDARD) return setOptionsComponent(null);

    const importComponent = async () => {
      const module = await import(`./${currentEffect.toLocaleLowerCase()}`);
      const OptionsComponent = module.default;
      setOptionsComponent(<OptionsComponent />);
    };

    importComponent();
  }, [currentEffect]);

  return (optionsComponent)
}

export default Options
