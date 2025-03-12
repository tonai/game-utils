export function modulo(number: number, n: number): number {
  return ((number % n) + n) % n;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function fade(x: number): number {
  return ((6 * x - 15) * x + 10) * x * x * x;
}

export function interpolate(x: number, a: number, b: number): number {
  return a + fade(x) * (b - a);
}

export function lerp(a: number, b: number, t: number) {
  return (1 - t) * a + t * b;
}

export function map(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}
