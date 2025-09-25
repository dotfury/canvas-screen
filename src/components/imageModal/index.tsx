import { useContext } from 'react';

import { AppContext } from '@/context/appContext';
import { shareFile } from '@/utils/share';
import strings from '@/utils/strings';

function ImageModal() {
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
      setActiveModal(null);
    }
  };

  const shareImage = async () => {
    if (!imageURL || imageURL === '') return;
    await shareFile(imageURL, 'jpeg');
    clearImage();
  };

  {
    return imageURL ? (
      <div className="text-[#333] w-fit max-w-4/5 bg-white rounded-md">
        <p className="m-0 p-2.5">{strings.downloadFileMessage}</p>
        <nav className="download-navigation flex justify-around">
          <button
            className="download-button border-r-0 rounded-bl-md"
            onClick={clearImage}
          >
            {strings.buttons.cancel}
          </button>
          {canShowShare && (
            <button className="download-button border-r-0" onClick={shareImage}>
              {strings.buttons.share}
            </button>
          )}
          <a
            className="download-button rounded-br-md"
            href={imageURL}
            download="image.jpeg"
            onClick={clearImage}
          >
            {strings.buttons.download}
          </a>
        </nav>
      </div>
    ) : (
      <p className="m-0 p-2.5">{strings.noImageError}</p>
    );
  }
}

export default ImageModal;
