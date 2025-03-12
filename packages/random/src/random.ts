// From https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript

/**
 * Implements the cyrb128 hash function, which converts a string into four 32-bit hash values.
 * This function is commonly used to generate seed values for pseudorandom number generators
 * from string inputs, providing a deterministic way to initialize random number generators.
 *
 * @param str - The input string to be hashed
 * @returns An array of four 32-bit unsigned integers that can be used as seeds for
 *          random number generators like sfc32, xoshiro128ss, etc.
 */
export function cyrb128(str: string) {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
}

/**
 * Implements the Small Fast Counter (SFC32) pseudorandom number generator algorithm.
 * SFC32 is a high-quality random number generator with good statistical properties
 * and a long period.
 *
 * @param a - First seed value for the generator state
 * @param b - Second seed value for the generator state
 * @param c - Third seed value for the generator state
 * @param d - Fourth seed value for the generator state (also serves as a counter)
 * @returns A pseudorandom generator function returning a number between 0 (inclusive) and 1 (exclusive)
 */
export function sfc32(a: number, b: number, c: number, d: number) {
  return () => {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (((a + b) | 0) + d) | 0;
    d = (d + 1) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

/**
 * Implements the SplitMix32 pseudorandom number generator algorithm.
 * SplitMix32 is a fast, high-quality random number generator that's
 * often used to initialize the state of other random number generators.
 *
 * @param a - Seed value for the generator state
 * @returns A pseudorandom generator function returning a number between 0 (inclusive) and 1 (exclusive)
 */
export function splitmix32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

/**
 * Implements the Mulberry32 pseudorandom number generator algorithm.
 * Mulberry32 is a simple, fast generator with good statistical properties
 * that requires only a single 32-bit state.
 *
 * @param a - Seed value for the generator state
 * @returns A pseudorandom generator function returning a number between 0 (inclusive) and 1 (exclusive)
 */
export function mulberry32(a: number) {
  return () => {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Implements the xoshiro128** (xoshiro128ss) pseudorandom number generator algorithm.
 * xoshiro128** is a fast, high-quality random number generator with excellent
 * statistical properties and a period of 2^128-1.
 *
 * @param a - First seed value for the generator state
 * @param b - Second seed value for the generator state
 * @param c - Third seed value for the generator state
 * @param d - Fourth seed value for the generator state
 * @returns A pseudorandom generator function returning a number between 0 (inclusive) and 1 (exclusive)
 */
export function xoshiro128ss(a: number, b: number, c: number, d: number) {
  return () => {
    const t = b << 9;
    let r = b * 5;
    r = ((r << 7) | (r >>> 25)) * 9;
    c ^= a;
    d ^= b;
    b ^= c;
    a ^= d;
    c ^= t;
    d = (d << 11) | (d >>> 21);
    return (r >>> 0) / 4294967296;
  };
}

/**
 * Implements the Jenkins Small Fast (JSF32) pseudorandom number generator algorithm.
 * JSF32 is a fast, high-quality random number generator with good statistical properties
 * and a long period, designed by Bob Jenkins.
 *
 * @param a - First seed value for the generator state
 * @param b - Second seed value for the generator state
 * @param c - Third seed value for the generator state
 * @param d - Fourth seed value for the generator state
 * @returns A pseudorandom generator function returning a number between 0 (inclusive) and 1 (exclusive)
 */
export function jsf32(a: number, b: number, c: number, d: number) {
  return () => {
    a |= 0;
    b |= 0;
    c |= 0;
    d |= 0;
    const t = (a - ((b << 27) | (b >>> 5))) | 0;
    a = b ^ ((c << 17) | (c >>> 15));
    b = (c + d) | 0;
    c = (d + t) | 0;
    d = (a + t) | 0;
    return (d >>> 0) / 4294967296;
  };
}
