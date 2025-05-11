import Camera from '@/utils/camera';
import { createContext, useContext } from 'react';

interface AppContextType {
  imageURL: string;
  showDownloadModal: boolean;
  showOverlay: boolean;
  camera: Camera | null;
  setTimer: (time: number) => void;
  updateDownloadImageModal: (url: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
