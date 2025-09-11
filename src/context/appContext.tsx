import Camera from '@/utils/Camera';
import VideoRecorder from '@/utils/VideoRecorder';
import { createContext, useContext } from 'react';

import { modalType } from '@/hooks/modal';

interface AppContextType {
  imageURL: string;
  showModal: boolean;
  showOverlay: boolean;
  camera: Camera | null;
  videoRecorder: VideoRecorder | null;
  activeModal: modalType | null;
  setTimer: (time: number) => void;
  setShowModal: (display: boolean) => void;
  setActiveModal: (modal: modalType | null) => void;
  setImageURL: (url: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
