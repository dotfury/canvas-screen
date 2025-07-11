import { isMobileDevice, isIOSDevice } from '@/utils/device';

const isMobile = isMobileDevice();
const isIOS = isIOSDevice();
const hasPopover = Object.hasOwn(HTMLElement.prototype, 'popover');

export default {
  isMobile,
  isIOS,
  hasPopover,
  deferredPrompt: null,
  isInstallable: false,
};
