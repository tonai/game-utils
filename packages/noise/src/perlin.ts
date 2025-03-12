import {
  add,
  add3,
  dot,
  dot3,
  fade,
  floor,
  floor3,
  fract,
  fract3,
  getVectorId,
  lerp,
  minus,
  minus3,
  vec2,
  vec3,
  Vector2,
  Vector3,
} from "@tonai/math";

import { createNoise } from "./noise";

// 2D Perlin Noise
export function perlin2D(
  v: Vector2,
  getGradient: (v: Vector2) => Vector2,
  memory: Record<string, number> = {},
) {
  const id = getVectorId(v);
  if (Object.prototype.hasOwnProperty.call(memory, id)) return memory[id];

  const i = floor(v);
  const f = fract(v);

  // Get corners
  const c00 = i;
  const c10 = add(i, vec2(1.0, 0.0));
  const c01 = add(i, vec2(0.0, 1.0));
  const c11 = add(i, vec2(1.0, 1.0));

  // Get gradients vectors
  const g00 = getGradient(c00);
  const g10 = getGradient(c10);
  const g01 = getGradient(c01);
  const g11 = getGradient(c11);

  // Calculate noise contributions from each of the four corners
  const n00 = dot(minus(v, c00), g00);
  const n10 = dot(minus(v, c10), g10);
  const n01 = dot(minus(v, c01), g01);
  const n11 = dot(minus(v, c11), g11);

  // Interpolate the four results
  const a = fade(f.x);
  const b = fade(f.y);
  const r = lerp(lerp(n00, n10, a), lerp(n01, n11, a), b);

  memory[id] = r;
  return r;
}
export const createPerlin2D = createNoise(perlin2D);

// 3D Perlin Noise
export function perlin3D(
  v: Vector3,
  getGradient: (v: Vector3) => Vector3,
  memory: Record<string, number> = {},
) {
  const id = getVectorId(v);
  if (Object.prototype.hasOwnProperty.call(memory, id)) return memory[id];

  const i = floor3(v);
  const f = fract3(v);

  // Get corners
  const c000 = i;
  const c001 = add3(i, vec3(0.0, 0.0, 1.0));
  const c010 = add3(i, vec3(0.0, 1.0, 0.0));
  const c011 = add3(i, vec3(0.0, 1.0, 1.0));
  const c100 = add3(i, vec3(1.0, 0.0, 0.0));
  const c101 = add3(i, vec3(1.0, 0.0, 1.0));
  const c110 = add3(i, vec3(1.0, 1.0, 0.0));
  const c111 = add3(i, vec3(1.0, 1.0, 1.0));

  // Get gradients vectors
  const g000 = getGradient(c000);
  const g001 = getGradient(c001);
  const g010 = getGradient(c010);
  const g011 = getGradient(c011);
  const g100 = getGradient(c100);
  const g101 = getGradient(c101);
  const g110 = getGradient(c110);
  const g111 = getGradient(c111);

  // Calculate noise contributions from each of the four corners
  const n000 = dot3(minus3(v, c000), g000);
  const n001 = dot3(minus3(v, c001), g001);
  const n010 = dot3(minus3(v, c010), g010);
  const n011 = dot3(minus3(v, c011), g011);
  const n100 = dot3(minus3(v, c100), g100);
  const n101 = dot3(minus3(v, c101), g101);
  const n110 = dot3(minus3(v, c110), g110);
  const n111 = dot3(minus3(v, c111), g111);

  // Compute the fade curve value for x, y, z
  const a = fade(f.x);
  const b = fade(f.y);
  const c = fade(f.z);

  // Interpolate
  const r = lerp(
    lerp(lerp(n000, n100, a), lerp(n001, n101, a), c),
    lerp(lerp(n010, n110, a), lerp(n011, n111, a), c),
    b,
  );

  memory[id] = r;
  return r;
}
export const createPerlin3D = createNoise(perlin3D);
