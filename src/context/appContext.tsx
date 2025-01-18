import { createContext, useContext } from 'react';

interface AppContextType {
  showOverlay: boolean;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => useContext(AppContext);
