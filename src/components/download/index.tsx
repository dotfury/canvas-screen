import { useContext } from 'react';

import { AppContext } from '@/context/appContext';

function Download() {
  const appContext = useContext(AppContext);
  const showDownloadModal = appContext?.showDownloadModal;
  const updateDownloadImageModal = appContext?.updateDownloadImageModal;
  const imageURL = appContext?.imageURL;

  const clearImage = () => {
    if (updateDownloadImageModal) updateDownloadImageModal('');
  };

  {
    return showDownloadModal && imageURL ? (
      <div className="download">
        <a href={imageURL} download="image.jpeg" onClick={clearImage}>
          Download
        </a>
      </div>
    ) : (
      ''
    );
  }
}

export default Download;
