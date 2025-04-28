interface NavigatorUABrandVersion {
  readonly brand: string;
  readonly version: string;
}

interface NavigatorUAData {
  readonly brands: NavigatorUABrandVersion[];
  readonly mobile: boolean;
  readonly platform: string;
}

function isMobileAgent(): boolean {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

function hasTouchSupport(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isMobileDevice(): boolean {
  if ('userAgentData' in navigator) {
    return (navigator.userAgentData as NavigatorUAData).mobile;
  }

  return isMobileAgent() && hasTouchSupport();
}
