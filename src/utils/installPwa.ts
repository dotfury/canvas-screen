import appConfig from '@/utils/appConfig';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (appConfig.deferredPrompt as any) = e;
  appConfig.isInstallable = true;
});
