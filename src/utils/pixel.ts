const getBrightness = (r: number, g: number, b: number): number => Math.round((r + g + b) / 3);

export { getBrightness };