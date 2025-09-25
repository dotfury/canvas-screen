import { useState } from 'react';

export enum modalType {
  IMAGE = 'image',
  VIDEO = 'video',
  PREVIEW = 'preview',
}

export function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<modalType | null>(null);

  return {
    showModal,
    setShowModal,
    activeModal,
    setActiveModal,
  };
}
