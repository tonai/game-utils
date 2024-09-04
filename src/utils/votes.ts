import { randomInt } from "./random";

export function votesArray(data: string[]): string {
  const groupedVotes = data.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
  const max = Math.max(...Object.values(groupedVotes));
  const maxVotes = Object.entries(groupedVotes).filter(
    ([, number]) => number === max,
  );
  const index = randomInt(maxVotes.length - 1);
  return maxVotes[index][0];
}

export function votesObject(obj: Record<string, string>): string {
  return votesArray(Object.values(obj));
}
