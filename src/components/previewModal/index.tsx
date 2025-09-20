import { useContext } from 'react';

import { shareFile } from '@/utils/share';
import { AppContext } from '@/context/appContext';

function PreviewModal() {
  const appContext = useContext(AppContext);
  const setActiveModal = appContext?.setActiveModal;
  const recorder = appContext?.recorder;
  // Firefox cannot attach files to share
  const isFF = navigator.userAgent.includes('Firefox');
  const canShowShare = !!navigator.canShare && !isFF;

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
      <div className="text-[#333] w-fit max-w-4/5 bg-white rounded-md">
        <p className="m-0 p-2.5"></p>
        <video className="p-2.5" src={recorder?.video} controls />
        <nav className="download-navigation flex justify-around">
          <button
            className="download-button border-r-0 rounded-bl-md"
            onClick={closeModal}
          >
            Cancel
          </button>
          {canShowShare && (
            <button className="download-button border-r-0" onClick={shareVideo}>
              Share
            </button>
          )}
          <button
            className="download-button border-r-0 rounded-br-md"
            onClick={saveVideo}
          >
            Download
          </button>
        </nav>
      </div>
    );
  }
}

export default PreviewModal;
