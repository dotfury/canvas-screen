import { useContext } from 'react';

import { shareFile } from '@/utils/share';
import { AppContext } from '@/context/appContext';
import strings from '@/utils/strings';
import appConfig from '@/utils/appConfig';

function PreviewModal() {
  const appContext = useContext(AppContext);
  const setActiveModal = appContext?.setActiveModal;
  const recorder = appContext?.recorder;
  // Firefox cannot attach files to share
  const canShowShare = !!navigator.canShare && !appConfig.isFF;

  const closeModal = () => {
    setActiveModal && setActiveModal(null);
    recorder?.clearPreview();
  };

  const shareVideo = async () => {
    if (!recorder?.video) return;

    await shareFile(recorder?.video, 'mp4');
    closeModal();
  };

  const saveVideo = () => {
    recorder?.download();
    closeModal();
  };

  {
    return (
      <div className="preview-container">
        <p className="m-0 p-2.5 pb-0">
          {strings.previewText} {strings.downloadFileMessage}
        </p>
        <video className="p-2.5" src={recorder?.video} controls playsInline />
        <nav className="download-navigation flex justify-around">
          <button
            className="download-button border-r-0 rounded-bl-md"
            onClick={closeModal}
          >
            {strings.buttons.cancel}
          </button>
          {canShowShare && (
            <button className="download-button border-r-0" onClick={shareVideo}>
              {strings.buttons.share}
            </button>
          )}
          <button
            className="download-button border-r-0 rounded-br-md"
            onClick={saveVideo}
          >
            {strings.buttons.download}
          </button>
        </nav>
      </div>
    );
  }
}

export default PreviewModal;
