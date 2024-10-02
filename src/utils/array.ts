export function createArray<T>(length: number, fill?: T): T[] {
  return new Array(length).fill(fill) as T[];
}
