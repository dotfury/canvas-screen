const orientations = [
  'portrait-primary',
  'portrait-secondary',
  'landscape-primary',
  'landscape-secondary',
];

export const setupScreenOrientation = () => {
  const appBody = document.body;
  const updateOrientation = () => {
    appBody.classList.remove(...orientations);
    appBody.classList.add(window.screen.orientation.type);
  };

  screen.orientation.addEventListener('change', () => {
    updateOrientation();
  });

  window.addEventListener('DOMContentLoaded', updateOrientation);
};
