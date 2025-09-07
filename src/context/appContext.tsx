import Camera from '@/utils/Camera';
import { createContext, useContext } from 'react';

interface AppContextType {
  imageURL: string;
  showModal: boolean;
  showOverlay: boolean;
  camera: Camera | null;
  activeModal: string;
  setTimer: (time: number) => void;
  setShowModal: (display: boolean) => void;
  setActiveModal: (modal: string) => void;
  setImageURL: (url: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
