import { ReactElement, useEffect, useState } from 'react';
import { EFFECTS } from '@/utils/effectList';
import AsciiOptions from '@/components/options/ascii';
import PixelateOptions from '@/components/options/pixelate';
import GridOptions from '@/components/options/grid';

const optionsMap: Record<string, ReactElement> = {
  [EFFECTS.ASCII]: <AsciiOptions />,
  [EFFECTS.PIXELATE]: <PixelateOptions />,
  [EFFECTS.GRID]: <GridOptions />,
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
    <div className="flex-1 pl-2 pb-10 h-full overflow-scroll md:h-auto md:overflow-hidden">
      {optionsComponent}
    </div>
  );
}

export default Options;
