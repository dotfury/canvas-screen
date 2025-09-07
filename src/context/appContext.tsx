import Camera from '@/utils/Camera';
import { createContext, useContext } from 'react';

interface AppContextType {
  imageURL: string;
  showModal: boolean;
  showDownloadModal: boolean;
  showOverlay: boolean;
  camera: Camera | null;
  setTimer: (time: number) => void;
  setShowModal: (display: boolean) => void;
  updateDownloadImageModal: (url: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
