import { ReactElement, useEffect, useState } from 'react';

import useWindowSize from '@/hooks/windowSize';

type Props = {
  id: string;
  children: ReactElement;
};

function Popover({ id, children }: Props) {
  const { isMobileWidth } = useWindowSize(768);
  const [renderMobileComponent, setRenderMobileComponent] =
    useState(isMobileWidth);

  useEffect(() => {
    setRenderMobileComponent(isMobileWidth);
  }, [isMobileWidth]);

  {
    return renderMobileComponent ? (
      <div id={id} popover="auto" className="relative overflow-hidden">
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }
}

export default Popover;
