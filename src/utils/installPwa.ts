let deferredPrompt: any;
let isInstallable = false;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  isInstallable = true;
});

export function getInstallable() {
  return { deferredPrompt, isInstallable };
}
