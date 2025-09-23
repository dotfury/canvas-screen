import { useContext } from 'react';

import { AppContext } from '@/context/appContext';
import strings from '@/utils/strings';

function VideoModal() {
  const appContext = useContext(AppContext);
  const setActiveModal = appContext?.setActiveModal;
  const recorder = appContext?.recorder;

  const closeModal = () => {
    setActiveModal && setActiveModal(null);
  };

  const recordVideo = () => {
    if (recorder) {
      closeModal();
      recorder.recordCanvas();
    }
  };

  {
    return (
      <div className="text-[#333] w-fit max-w-4/5 bg-white rounded-md">
        <p className="m-0 p-2.5">{strings.recordVideoMessage}</p>
        <nav className="download-navigation flex justify-around">
          <button
            className="download-button border-r-0 rounded-bl-md"
            onClick={closeModal}
          >
            {strings.buttons.cancel}
          </button>
          <button
            className="download-button border-r-0 rounded-br-md"
            onClick={recordVideo}
          >
            {strings.buttons.record}
          </button>
        </nav>
      </div>
    );
  }
}

export default VideoModal;
