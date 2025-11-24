import { isMobileDevice, isIOSDevice } from '@/utils/device';
import { setupScreenOrientation } from '@/utils/screenOrientation';

setupScreenOrientation();
const isMobile = isMobileDevice();
const isIOS = isIOSDevice();
const hasPopover = Object.hasOwn(HTMLElement.prototype, 'popover');

export default {
  isMobile,
  isIOS,
  hasPopover,
  deferredPrompt: null,
  isInstallable: false,
  orientation: screen.orientation.type,
};
