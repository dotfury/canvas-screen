import { ReactElement, useEffect, useState } from 'react';
import { EFFECTS } from '@/utils/effectList';

interface Props {
  currentEffect: string;
}

function Options({ currentEffect }: Props) {
  const [optionsComponent, setOptionsComponent] = useState<ReactElement | null>(
    null
  );

  useEffect(() => {
    if (
      currentEffect === EFFECTS.STANDARD ||
      currentEffect === EFFECTS.SLITSCAN
    )
      return setOptionsComponent(null);

    const importComponent = async () => {
      const module = await import(`./${currentEffect.toLowerCase()}`);
      const OptionsComponent = module.default;
      setOptionsComponent(<OptionsComponent />);
    };

    importComponent();
  }, [currentEffect]);

  return <div className="options-container">{optionsComponent}</div>;
}

export default Options;
