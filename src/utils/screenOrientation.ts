export const setupScreenOrientation = () => {
  screen.orientation.addEventListener('change', () => {
    window.location.reload();
  });
};
