self.addEventListener('message', ({ data }) => {
  if (data.effect === 'STANDARD') {
    self.postMessage({
      pixels: data.pixels,
      effect: data.effect,
    });
  } else {
    self.postMessage({
      pixels: data.pixels,
      effect: data.effect,
    });
  }

  // Sends a message of "Hellow, window!" from the web worker:
  // self.postMessage('Hello, window!');
});
