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

export function shuffleArray<T>(array: T[]): void {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export function generateId(length = 5): string {
  const result: string[] = [];
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.push(characters.charAt(randomInt(charactersLength)));
  }
  return result.join("");
}
