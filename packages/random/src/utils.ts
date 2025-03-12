export type RandFunction = () => number;

export function randomInt(
  max: number,
  min = 0,
  rand: RandFunction = Math.random,
): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}

export function unusedRandomInt(
  used: number[],
  max: number,
  min = 0,
  rand: RandFunction = Math.random,
): number {
  const int = randomInt(max, min, rand);
  if (used.includes(int)) {
    return unusedRandomInt(used, max, min, rand);
  }
  return int;
}

export function randomInArray<T>(
  arr: T[],
  rand: RandFunction = Math.random,
): T {
  const index = randomInt(arr.length - 1, 0, rand);
  return arr[index];
}

export function shuffleArray<T>(
  array: T[],
  rand: RandFunction = Math.random,
): void {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(rand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export function generateId(
  length = 5,
  rand: RandFunction = Math.random,
): string {
  const result: string[] = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(randomInt(charactersLength, 0, rand)));
  }
  return result.join("");
}
