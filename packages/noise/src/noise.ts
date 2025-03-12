import {
  add,
  floor,
  fract,
  getVectorId,
  isVec2,
  isVec3,
  lerp,
  minus,
  mul,
  vec2,
  vec3,
  Vector2,
  Vector3,
} from "@tonai/math";

export type INoiseFunction<
  V extends number | Vector2 | Vector3,
  G extends number | Vector2 | Vector3,
> = (v: V, getGradient: (v: V) => G, memory: Record<string, number>) => number;

export function createNoise<
  V extends number | Vector2 | Vector3,
  G extends number | Vector2 | Vector3,
>(noise: INoiseFunction<V, G>, gradientDimension?: number) {
  return (rand: () => number) => {
    const gradients: Record<string, G> = {};
    const memory: Record<string, number> = {};

    function getGradient(v: V): G {
      const id = getVectorId(v);
      if (!gradients[id]) {
        gradientDimension ??= isVec3(v) ? 3 : isVec2(v) ? 2 : 1;
        if (gradientDimension === 3) {
          gradients[id] = vec3(rand(), rand(), rand()) as G;
        } else if (gradientDimension === 2) {
          gradients[id] = vec2(rand(), rand()) as G;
        } else {
          gradients[id] = rand() as G;
        }
      }
      return gradients[id];
    }

    return (v: V) => noise(v, getGradient, memory);
  };
}

function noise2D(
  v: Vector2,
  getGradient: (v: Vector2) => number,
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
  const a = getGradient(c00);
  const b = getGradient(c10);
  const c = getGradient(c01);
  const d = getGradient(c11);

  const u = mul(f, mul(f, mul(minus(mul(f, 2), 3), -1)));
  const r = lerp(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;

  memory[id] = r;
  return r;
}
export const createNoise2d = createNoise(noise2D, 1);
