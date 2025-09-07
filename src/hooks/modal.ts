import { useState } from 'react';

export function useModal(): [boolean, (display: boolean) => void] {
  const [showModal, setShowModal] = useState<boolean>(false);

  return [showModal, setShowModal];
}
