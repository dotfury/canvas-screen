let effect = 'STANDARD';

self.addEventListener('message', ({ data }) => {
  effect = data.effect;
  console.log('effect: ', effect);
  if (effect === 'STANDARD') {
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
