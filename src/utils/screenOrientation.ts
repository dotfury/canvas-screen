export enum screenOrientation {
  PORTRAIT_PRIMARY = 'portrait-primary',
  PORTRAIT_SECONDARY = 'portrait-secondary',
  LANDSCAPE_PRIMARY = 'landscape-primary',
  LANDSCAPE_SECONDARY = 'landscape-secondary',
}

export const setupScreenOrientation = () => {
  screen.orientation.addEventListener('change', (event: Event) => {
    const type = (event.target as ScreenOrientation).type;

    alert(`ScreenOrientation change: ${type}`);
  });
};
