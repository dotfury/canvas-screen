import { isMobileDevice, isIOSDevice } from '@/utils/device';
import { getInstallable } from '@/utils/installPwa';

const isMobile = isMobileDevice();
const isIOS = isIOSDevice();
const hasPopover = Object.hasOwn(HTMLElement.prototype, 'popover');
const { deferredPrompt, isInstallable } = getInstallable();

export default {
  isMobile,
  isIOS,
  hasPopover,
  deferredPrompt,
  isInstallable,
};
