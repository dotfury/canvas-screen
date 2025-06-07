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
    console.log('MOBILE: ', isMobileWidth);
    setRenderMobileComponent(isMobileWidth);
  }, [isMobileWidth]);

  {
    return renderMobileComponent ? (
      <div
        id={id}
        popover="auto"
        className="popover flex-1 w-full md:w-auto md:block"
      >
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }
}

export default Popover;
