import { useContext } from 'react';
import { createPortal } from 'react-dom';

import { AppContext } from '@/context/appContext';
import Download from '@/components/download';

// TODO: restyle because #modal not in DOM yet - added to body
const PARENT = document.querySelector('#modal') ?? document.body;

export function Modals() {
  const appContext = useContext(AppContext);
  const showDownloadModal = appContext?.showDownloadModal;

  {
    return (
      showDownloadModal &&
      // showDownloadModal == true &&
      createPortal(<Download />, PARENT)
    );
  }
}
