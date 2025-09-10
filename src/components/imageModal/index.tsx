import { useContext } from 'react';

import { AppContext } from '@/context/appContext';
import { shareFile } from '@/utils/share';

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
        <p className="m-0 p-2.5">
          Downloaded images will be in your downloads or files folder.
        </p>
        <nav className="download-navigation flex justify-around">
          <div
            className="download-button border-r-0 rounded-bl-md"
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
            className="download-button rounded-br-md"
            href={imageURL}
            download="image.jpeg"
            onClick={clearImage}
          >
            Download
          </a>
        </nav>
      </div>
    ) : (
      <p className="m-0 p-2.5">Image not found. Please try again.</p>
    );
  }
}

export default ImageModal;
