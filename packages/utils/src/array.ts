export function createArray<T>(length: number, fill?: T): T[] {
  return new Array(length).fill(fill) as T[];
}

export function createStepArray(from: number, to: number, step = 1): number[] {
  return createArray(Math.floor((to - from) * step), null).map(
    (_, i) => i / step + from,
  );
}
