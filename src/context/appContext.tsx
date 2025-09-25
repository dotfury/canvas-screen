import { createContext, useContext } from 'react';

import Camera from '@/utils/WebCamera';
import VideoRecorder, { RecorderStatus } from '@/utils/VideoRecorder';
import { modalType } from '@/hooks/modal';

interface AppContextType {
  imageURL: string;
  showModal: boolean;
  showOverlay: boolean;
  camera: Camera | null;
  recorder: VideoRecorder | null;
  recorderStatus: RecorderStatus;
  activeModal: modalType | null;
  setTimer: (time: number) => void;
  setShowModal: (display: boolean) => void;
  setActiveModal: (modal: modalType | null) => void;
  setImageURL: (url: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
