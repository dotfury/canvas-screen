import { useContext } from 'react';
import { createPortal } from 'react-dom';

import { AppContext } from '@/context/appContext';
import ImageModal from '@/components/imageModal';
import { modalType } from '@/hooks/modal';

export function Modals() {
  const appContext = useContext(AppContext);
  const activeModal = appContext?.activeModal;
  const PARENT = document.querySelector('#modal') ?? document.body;

  {
    return activeModal === modalType.IMAGE && <ImageModal />;
  }
}
