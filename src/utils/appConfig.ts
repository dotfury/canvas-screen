import { isMobileDevice, isIOSDevice } from '@/utils/device';

const isMobile = isMobileDevice();
const isIOS = isIOSDevice();

export default {
  isMobile,
  isIOS,
};
