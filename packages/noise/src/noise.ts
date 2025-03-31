import {
  add,
  floor,
  fract,
  getCoordinates,
  getVectorId,
  isVec2,
  isVec3,
  lerp,
  minus,
  mul,
  scaledCosine,
  vec2,
  vec3,
  Vector2,
  Vector3,
} from "@tonai/math";

export type INoiseFunction<
  O extends Record<string, unknown>,
  V extends number | Vector2 | Vector3,
  G extends number | Vector2 | Vector3,
> = (
  v: V,
  getGradient: (v: number | Vector2 | Vector3) => G,
  memory: Record<string, number>,
  options?: O,
) => number;

export function noiseCreator<
  O extends Record<string, unknown>,
  V extends number | Vector2 | Vector3,
  G extends number | Vector2 | Vector3,
>(noise: INoiseFunction<O, V, G>, gradientDimension?: number) {
  return (rand: () => number, options?: O) => {
    const gradients: Record<string, G> = {};
    const memory: Record<string, number> = {};

    function getGradient(v: number | Vector2 | Vector3): G {
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

    return (v: V) => noise(v, getGradient, memory, options);
  };
}

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;

export interface NoiseOptions {
  ampFalloff?: number;
  octaves?: number;
}

export function perlinP5Transformed<V extends number | Vector2 | Vector3>(
  v: V,
  getGradient: (v: number | Vector3) => number,
  memory: Record<string, number> = {},
  options: NoiseOptions = {},
) {
  const id = getVectorId(v);
  if (Object.prototype.hasOwnProperty.call(memory, id)) return memory[id];

  const { ampFalloff = 4, octaves = 0.5 } = options;
  let { x, y, z } = getCoordinates(v);

  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }

  let xi = Math.floor(x);
  let yi = Math.floor(y);
  let zi = Math.floor(z);

  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;

  let rxf;
  let ryf;
  let r = 0;
  let ampl = 0.5;
  let n1;
  let n2;
  let n3;

  for (let o = 0; o < octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = scaledCosine(xf); // or fade(xf);
    ryf = scaledCosine(yf); // or fade(yf);

    n1 = getGradient(of);
    n1 += rxf * (getGradient(of + 1) - n1);
    n2 = getGradient(of + PERLIN_YWRAP);
    n2 += rxf * (getGradient(of + PERLIN_YWRAP + 1) - n2);
    n1 += ryf * (n2 - n1);

    of += PERLIN_ZWRAP;
    n2 = getGradient(of);
    n2 += rxf * (getGradient(of + 1) - n2);
    n3 = getGradient(of + PERLIN_YWRAP);
    n3 += rxf * (getGradient(of + PERLIN_YWRAP + 1) - n3);
    n2 += ryf * (n3 - n2);

    n1 += scaledCosine(zf) * (n2 - n1);

    r += n1 * ampl;
    ampl *= ampFalloff;
    xi <<= 1; // multiply by 2 an integer
    xf *= 2;
    yi <<= 1; // multiply by 2 an integer
    yf *= 2;
    zi <<= 1; // multiply by 2 an integer
    zf *= 2;

    if (xf >= 1.0) {
      xi++;
      xf--;
    }
    if (yf >= 1.0) {
      yi++;
      yf--;
    }
    if (zf >= 1.0) {
      zi++;
      zf--;
    }
  }

  memory[id] = r;
  return r;
}
export const createNoise = noiseCreator(perlinP5Transformed, 1);

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
export const createNoise2d = noiseCreator(noise2D, 1);
