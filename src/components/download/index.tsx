import { useContext, useState } from 'react';

import { AppContext } from '@/context/appContext';

import '@/download.css';

function Download() {
  const [canShare, _] = useState<boolean>(navigator.canShare());
  const appContext = useContext(AppContext);
  const showDownloadModal = appContext?.showDownloadModal;
  const updateDownloadImageModal = appContext?.updateDownloadImageModal;
  const imageURL = appContext?.imageURL;

  const clearImage = () => {
    if (updateDownloadImageModal) updateDownloadImageModal('');
  };

  const shareImage = async () => {
    if (canShare && imageURL) {
      const blob = await (await fetch(imageURL)).blob();
      const filesArray = [
        new File([blob], 'image.jpeg', {
          type: blob.type,
          lastModified: new Date().getTime(),
        }),
      ];
      try {
        await navigator.share({
          files: filesArray,
          title: 'Image',
          text: 'canvas screen',
        });
        clearImage();
      } catch (error) {
        console.error('error');
      }
    }
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
            {canShare && <div onClick={shareImage}>Share</div>}
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
