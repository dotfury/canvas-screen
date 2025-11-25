import { ReactElement, useEffect, useState } from 'react';
import { EFFECTS } from '@/utils/effectList';
import AsciiOptions from '@/components/options/ascii';
import PixelateOptions from '@/components/options/pixelate';
import GridOptions from '@/components/options/grid';
import SlitscanOptions from '@/components/options/slitscan';

const optionsMap: Record<string, ReactElement> = {
  [EFFECTS.ASCII]: <AsciiOptions />,
  [EFFECTS.PIXELATE]: <PixelateOptions />,
  [EFFECTS.GRID]: <GridOptions />,
  [EFFECTS.SLITSCAN]: <SlitscanOptions />,
};

interface Props {
  currentEffect: string;
}

function Options({ currentEffect }: Props) {
  const [optionsComponent, setOptionsComponent] = useState<ReactElement | null>(
    null
  );

  useEffect(() => {
    if (currentEffect === EFFECTS.STANDARD) return setOptionsComponent(null);

    setOptionsComponent(optionsMap[currentEffect]);
  }, [currentEffect]);

  return (
    <div className="options-container">
      {optionsComponent}
      {currentEffect !== EFFECTS.STANDARD && (
        <div className="sticky left-0 bottom-0 w-full h-2 bg-gradient-to-t from-black/30 to-transparent lg:hidden" />
      )}
    </div>
  );
}

export default Options;
