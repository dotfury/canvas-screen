const normalize = (value: number, min: number, max: number): number =>
  (value - min) / (max - min);

const lerp = (norm: number, min: number, max: number): number =>
  (max - min) * norm + min;

export const map = (
  value: number,
  sourceMin: number,
  sourceMax: number,
  destMin: number,
  destMax: number
): number => {
  return lerp(normalize(value, sourceMin, sourceMax), destMin, destMax);
};
