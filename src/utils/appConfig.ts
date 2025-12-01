import { isMobileDevice, isIOSDevice } from '@/utils/device';

const isMobile = isMobileDevice();
const isIOS = isIOSDevice();
const hasPopover = Object.hasOwn(HTMLElement.prototype, 'popover');
const isFF = navigator.userAgent.includes('Firefox');

export default {
  isMobile,
  isIOS,
  isFF,
  hasPopover,
  deferredPrompt: null,
  isInstallable: false,
};
