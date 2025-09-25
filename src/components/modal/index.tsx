import { useContext } from 'react';
import classNames from 'classnames';

import { AppContext } from '@/context/appContext';
import { Modals } from '@/layout/modals';

function Modal() {
  const appContext = useContext(AppContext);
  const setShowModal = appContext?.setShowModal;
  const showModal = appContext?.showModal;

  return (
    <div
      id="modal"
      className={classNames({ 'modal-active': showModal })}
      onClick={() => setShowModal && setShowModal(false)}
    >
      <Modals />
    </div>
  );
}

export default Modal;
