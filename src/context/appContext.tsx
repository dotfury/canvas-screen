import Camera from '@/utils/camera';
import { createContext, useContext } from 'react';

interface AppContextType {
  showOverlay: boolean;
  camera: Camera | null;
  setTimer: (time: number) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
