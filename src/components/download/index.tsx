import { useContext } from 'react';

import { AppContext } from '@/context/appContext';

function Download() {
  const appContext = useContext(AppContext);
  const showDownloadModal = appContext?.showDownloadModal;
  const updateDownloadImageModal = appContext?.updateDownloadImageModal;
  const imageURL = appContext?.imageURL;
  const canShowShare = 'canShare' in navigator;

  const clearImage = () => {
    if (updateDownloadImageModal) updateDownloadImageModal('');
  };

  const shareImage = async () => {
    if (canShowShare && imageURL) {
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
      <div
        className="download-container fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/90"
        onClick={clearImage}
      >
        <div className="download-content text-[#333] w-fit max-w-4/5 bg-white rounded-xl">
          <p className="download-description m-0 p-2.5">
            Downloaded images will be in your downloads or files folder.
          </p>
          <nav className="download-navigation flex justify-around">
            <div
              className="download-button border-r-0 rounded-bl-sm"
              onClick={clearImage}
            >
              Cancel
            </div>
            {canShowShare && (
              <div className="download-button border-r-0" onClick={shareImage}>
                Share
              </div>
            )}
            <a
              className="download-button rounded-br-sm"
              href={imageURL}
              download="image.jpeg"
              onClick={clearImage}
            >
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
