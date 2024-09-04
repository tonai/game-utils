export function modulo(number: number, n: number): number {
  return ((number % n) + n) % n;
}
