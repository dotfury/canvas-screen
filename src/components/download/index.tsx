import { useContext } from 'react';

import { AppContext } from '@/context/appContext';

import '@/download.css';

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
      <div className="download-container" onClick={clearImage}>
        <div className="download-content">
          <p className="download-description">
            Downloaded images will be in your downloads or files folder.
          </p>
          <nav className="download-navigation">
            <div onClick={clearImage}>Cancel</div>
            <a href={imageURL} download="image.jpeg" onClick={clearImage}>
              Download
            </a>
          </nav>
        </div>
      </div>
    ) : (
      ''
    );
  }
}

export default Download;
