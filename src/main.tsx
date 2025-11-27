import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { setupScreenOrientation } from '@/utils/screenOrientation.ts';

import './fonts.css';

import App from './App.tsx';

setupScreenOrientation();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
