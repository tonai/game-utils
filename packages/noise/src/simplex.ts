import { dot, dot3, getVectorId, Vector2, Vector3 } from "@tonai/math";

import { createNoise } from "./noise";

// Skewing and unskewing factors for 2, 3, and 4 dimensions
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;
const F3 = 1 / 3;
const G3 = 1 / 6;

// 2D simplex noise
export function simplex2D(
  v: Vector2,
  getGradient: (v: Vector2) => Vector2,
  memory: Record<string, number> = {},
) {
  const id = getVectorId(v);
  if (Object.prototype.hasOwnProperty.call(memory, id)) return memory[id];

  const { x: xin, y: yin } = v;
  let n0, n1, n2; // Noise contributions from the three corners
  // Skew the input space to determine which simplex cell we're in
  const s = (xin + yin) * F2; // Hairy factor for 2D
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const t = (i + j) * G2;
  const x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
  const y0 = yin - j + t;
  // For the 2D case, the simplex shape is an equilateral triangle.
  // Determine which simplex we are in.
  let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
  if (x0 > y0) {
    // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    i1 = 1;
    j1 = 0;
  } else {
    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
    i1 = 0;
    j1 = 1;
  }
  // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
  // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
  // c = (3-sqrt(3))/6
  const x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
  const y2 = y0 - 1 + 2 * G2;
  // Get gradients vectors
  const gi0 = getGradient({ x: i, y: j });
  const gi1 = getGradient({ x: i + i1, y: j + j1 });
  const gi2 = getGradient({ x: i + 1, y: j + 1 });
  // Calculate the contribution from the three corners
  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 < 0) {
    n0 = 0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * dot(gi0, { x: x0, y: y0 }); // (x,y) of grad3 used for 2D gradient
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 < 0) {
    n1 = 0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * dot(gi1, { x: x1, y: y1 });
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 < 0) {
    n2 = 0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * dot(gi2, { x: x2, y: y2 });
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  const r = 70 * (n0 + n1 + n2);

  memory[id] = r;
  return r;
}
export const createSimplex2D = createNoise(simplex2D);

// 3D simplex noise
export function simplex3D(
  v: Vector3,
  getGradient: (v: Vector3) => Vector3,
  memory: Record<string, number> = {},
) {
  const id = getVectorId(v);
  if (Object.prototype.hasOwnProperty.call(memory, id)) return memory[id];

  const { x: xin, y: yin, z: zin } = v;
  let n0, n1, n2, n3; // Noise contributions from the four corners

  // Skew the input space to determine which simplex cell we're in
  const s = (xin + yin + zin) * F3; // Hairy factor for 2D
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const k = Math.floor(zin + s);

  const t = (i + j + k) * G3;
  const x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
  const y0 = yin - j + t;
  const z0 = zin - k + t;

  // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
  // Determine which simplex we are in.
  let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
  let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i2 = 1;
      j2 = 0;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 1;
      j2 = 0;
      k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else if (x0 < z0) {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 0;
      j2 = 1;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i2 = 1;
      j2 = 1;
      k2 = 0;
    }
  }
  // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
  // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
  // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
  // c = 1/6.
  const x1 = x0 - i1 + G3; // Offsets for second corner
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;

  const x2 = x0 - i2 + 2 * G3; // Offsets for third corner
  const y2 = y0 - j2 + 2 * G3;
  const z2 = z0 - k2 + 2 * G3;

  const x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
  const y3 = y0 - 1 + 3 * G3;
  const z3 = z0 - 1 + 3 * G3;

  // Get gradients vectors
  const gi0 = getGradient({ x: i, y: j, z: k });
  const gi1 = getGradient({ x: i + i1, y: j + j1, z: k + k1 });
  const gi2 = getGradient({ x: i + i2, y: j + j2, z: k + k2 });
  const gi3 = getGradient({ x: i + 1, y: j + 1, z: k + 1 });

  // Calculate the contribution from the four corners
  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 < 0) {
    n0 = 0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * dot3(gi0, { x: x0, y: y0, z: z0 }); // (x,y) of grad3 used for 2D gradient
  }
  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 < 0) {
    n1 = 0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * dot3(gi1, { x: x1, y: y1, z: z1 });
  }
  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 < 0) {
    n2 = 0;
  } else {
    t2 *= t2;
    n2 = t2 * t2 * dot3(gi2, { x: x2, y: y2, z: z2 });
  }
  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 < 0) {
    n3 = 0;
  } else {
    t3 *= t3;
    n3 = t3 * t3 * dot3(gi3, { x: x3, y: y3, z: z3 });
  }
  // Add contributions from each corner to get the final noise value.
  // The result is scaled to return values in the interval [-1,1].
  const r = 32 * (n0 + n1 + n2 + n3);

  memory[id] = r;
  return r;
}
export const createSimplex3D = createNoise(simplex3D);
