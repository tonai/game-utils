import { clamp, lerp } from "./math";

export interface Vector2 {
  x: number;
  y: number;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export function getVectorId(v: number | Vector2 | Vector3): string {
  if (isVec3(v)) {
    return [v.x, v.y, v.z].toString();
  }
  if (isVec2(v)) {
    return [v.x, v.y].toString();
  }
  return String(v);
}

export function vec2(x: number, y: number): Vector2 {
  return { x, y };
}

export function vec3(x: number, y: number, z: number): Vector3 {
  return { x, y, z };
}

export function isVec2(v: number | Vector2): v is Vector2 {
  return v instanceof Object && "y" in v;
}

export function isVec3(v: number | Vector2 | Vector3): v is Vector3 {
  return v instanceof Object && "z" in v;
}

export function mix(v1: Vector2, v2: Vector2, a: number): Vector2 {
  a = clamp(a, 0, 1);
  return {
    x: lerp(v1.x, v2.x, a),
    y: lerp(v1.y, v2.y, a),
  };
}

export function floor(v: Vector2): Vector2 {
  return vec2(Math.floor(v.x), Math.floor(v.y));
}

export function floor3(v: Vector3): Vector3 {
  return vec3(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
}

export function fract(v: Vector2): Vector2;
export function fract(v: number): number;
export function fract(v: number | Vector2): number | Vector2 {
  if (typeof v === "number") {
    return v - Math.floor(v);
  }
  return vec2(v.x - Math.floor(v.x), v.y - Math.floor(v.y));
}

export function fract3(v: Vector3): Vector3 {
  return vec3(
    v.x - Math.floor(v.x),
    v.y - Math.floor(v.y),
    v.z - Math.floor(v.z),
  );
}

export function abs(v: Vector2): Vector2 {
  return vec2(Math.abs(v.x), Math.abs(v.y));
}

export function abs3(v: Vector3): Vector3 {
  return vec3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
}

export function add(v1: Vector2, v2: Vector2 | number): Vector2 {
  if (typeof v2 === "number") {
    return vec2(v1.x + v2, v1.y + v2);
  }
  return vec2(v1.x + v2.x, v1.y + v2.y);
}

export function add3(v1: Vector3, v2: Vector3 | number): Vector3 {
  if (typeof v2 === "number") {
    return vec3(v1.x + v2, v1.y + v2, v1.z + v2);
  }
  return vec3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
}

export function minus(v1: Vector2, v2: Vector2 | number): Vector2 {
  if (typeof v2 === "number") {
    return vec2(v1.x - v2, v1.y - v2);
  }
  return vec2(v1.x - v2.x, v1.y - v2.y);
}

export function minus3(v1: Vector3, v2: Vector3 | number): Vector3 {
  if (typeof v2 === "number") {
    return vec3(v1.x - v2, v1.y - v2, v1.z - v2);
  }
  return vec3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
}

export function mul(v1: Vector2, v2: Vector2 | number): Vector2 {
  if (typeof v2 === "number") {
    return vec2(v1.x * v2, v1.y * v2);
  }
  return vec2(v1.x * v2.x, v1.y * v2.y);
}

export function mul3(v1: Vector3, v2: Vector3 | number): Vector3 {
  if (typeof v2 === "number") {
    return vec3(v1.x * v2, v1.y * v2, v1.z * v2);
  }
  return vec3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
}

export function max(v1: Vector2, v2: Vector2 | number): Vector2 {
  if (typeof v2 === "number") {
    return vec2(Math.max(v1.x, v2), Math.max(v1.y, v2));
  }
  return vec2(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y));
}

export function max3(v1: Vector3, v2: Vector3 | number): Vector3 {
  if (typeof v2 === "number") {
    return vec3(Math.max(v1.x, v2), Math.max(v1.y, v2), Math.max(v1.z, v2));
  }
  return vec3(Math.max(v1.x, v2.x), Math.max(v1.y, v2.y), Math.max(v1.z, v2.z));
}

export function dot(v1: Vector2, v2: Vector2): number {
  return v1.x * v2.x + v1.y * v2.y;
}

export function dot3(v1: Vector3, v2: Vector3): number {
  return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}
