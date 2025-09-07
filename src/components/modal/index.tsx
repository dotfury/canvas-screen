import { useContext } from 'react';

import { AppContext } from '@/context/appContext';

function Modal() {
  const appContext = useContext(AppContext);
  const setShowModal = appContext?.setShowModal;

  return (
    <div
      id="modal"
      className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/90"
      onClick={() => setShowModal && setShowModal(false)}
    ></div>
  );
}

export default Modal;
