import { ReactElement, useEffect, useState, useRef } from 'react';

import useWindowSize from '@/hooks/windowSize';

type Props = {
  id: string;
  children: ReactElement;
};

function Popover({ id, children }: Props) {
  const { isMobileWidth } = useWindowSize(768);
  const [renderMobileComponent, setRenderMobileComponent] =
    useState(isMobileWidth);
  const popover: any = useRef(null);

  useEffect(() => {
    setRenderMobileComponent(isMobileWidth);
  }, [isMobileWidth]);

  {
    return renderMobileComponent ? (
      <div
        id={id}
        popover="auto"
        ref={popover}
        className="relative overflow-hidden"
      >
        <div
          className="absolute right-2 top-3 font-bold bg-black/30 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => popover.current?.hidePopover()}
        >
          &#x2715;
        </div>
        {children}
      </div>
    ) : (
      <>{children}</>
    );
  }
}

export default Popover;
