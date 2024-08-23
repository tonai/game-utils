export function randomInt(max: number, min = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function unusedRandomInt(used: number[], max: number, min = 0): number {
  const int = randomInt(max, min);
  if (used.includes(int)) {
    return unusedRandomInt(used, max, min);
  }
  return int;
}

export function randomInArray<T>(arr: T[]): T {
  const index = randomInt(arr.length - 1);
  return arr[index];
}
