import { useContext } from 'react';

import { AppContext } from '@/context/appContext';

function Download() {
  const appContext = useContext(AppContext);
  const setImageURL = appContext?.setImageURL;
  const setActiveModal = appContext?.setActiveModal;
  const imageURL = appContext?.imageURL;
  // Firefox cannot attach files to share
  const isFF = navigator.userAgent.includes('Firefox');
  const canShowShare = !!navigator.canShare && !isFF;

  const clearImage = () => {
    if (setImageURL && setActiveModal) {
      setImageURL('');
      setActiveModal('');
    }
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
        alert(error);
      }
    }
  };

  {
    return imageURL ? (
      <div className="text-[#333] w-fit max-w-4/5 bg-white rounded-xl">
        <p className="m-0 p-2.5">
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
    ) : (
      ''
    );
  }
}

export default Download;
