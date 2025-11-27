import { useState, useEffect } from 'react';

function useWindowSize(minWidth: number): {
  currentWidth: number;
  isMobileWidth: boolean;
} {
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    let resizeTimeout: any;
    const resizeHandler = () => {
      setCurrentWidth(window.innerWidth);
    };

    const debouncedResizeHandler = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeHandler, 50);
    };

    window.addEventListener('resize', debouncedResizeHandler);

    return () => window.removeEventListener('resize', debouncedResizeHandler);
  }, []);

  return {
    currentWidth,
    isMobileWidth: currentWidth < minWidth,
  };
}

export default useWindowSize;
