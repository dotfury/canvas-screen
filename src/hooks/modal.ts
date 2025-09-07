import { useState } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string>('');

  return {
    showModal,
    setShowModal,
    activeModal,
    setActiveModal,
  };
}
