import { createArray } from "./array";
import { randomInt } from "./random";

/**
 * Select most voted item in an array
 *
 * Example: ['a', 'c', 'b', 'c', 'a', 'c']
 * Will return 'c'
 */
export function votesArray<T extends string>(data: T[]): T {
  const groupedVotes = data.reduce<Record<string, number>>((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
  const max = Math.max(...Object.values(groupedVotes));
  const maxVotes = Object.entries(groupedVotes).filter(
    ([, number]) => number === max,
  );
  const index = randomInt(maxVotes.length - 1);
  return maxVotes[index][0] as T;
}

/**
 * Select most voted item in an object
 *
 * Example: { a: ['John', 'Jane'], b: ['Joe'], c: ['John', 'Jane', 'Joe'] }
 * Will return 'c'
 */
export function votesObject(obj: Record<string, string[]>): string {
  const votes = Object.entries(obj).reduce<string[]>(
    (acc, [key, votes]) => acc.concat(createArray(votes.length, key)),
    [],
  );
  return votesArray(votes);
}
