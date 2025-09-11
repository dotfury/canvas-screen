import { useContext } from 'react';

import { AppContext } from '@/context/appContext';
import ImageModal from '@/components/imageModal';
import VideoModal from '@/components/videoModal';
import { modalType } from '@/hooks/modal';

export function Modals() {
  const appContext = useContext(AppContext);
  const activeModal = appContext?.activeModal;

  {
    return activeModal === modalType.IMAGE ? (
      <ImageModal />
    ) : activeModal === modalType.VIDEO ? (
      <VideoModal />
    ) : null;
  }
}
