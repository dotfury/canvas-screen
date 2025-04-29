import { ReactElement, useEffect, useState } from 'react';
import { EFFECTS } from '@/utils/effectList';
import AsciiOptions from '@/components/options/ascii';
import PixelateOptions from '@/components/options/pixelate';

const optionsMap: Record<string, ReactElement> = {
  [EFFECTS.ASCII]: <AsciiOptions />,
  [EFFECTS.PIXELATE]: <PixelateOptions />,
};

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
      // currentEffect === EFFECTS.SLITSCAN ||
      currentEffect === EFFECTS.GRID
    )
      return setOptionsComponent(null);

    setOptionsComponent(optionsMap[currentEffect]);
  }, [currentEffect]);

  return <div className="options-container">{optionsComponent}</div>;
}

export default Options;
