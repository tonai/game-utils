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

export function floor(v: number | Vector2 | Vector3): Vector3 {
  if (typeof v === "number") {
    return vec3(Math.floor(v), 0, 0);
  }
  return vec3(Math.floor(v.x), Math.floor(v.y), Math.floor("z" in v ? v.z : 0));
}

export function fract(v: number | Vector2 | Vector3): Vector3 {
  if (typeof v === "number") {
    return vec3(v - Math.floor(v), 0, 0);
  }
  return vec3(
    v.x - Math.floor(v.x),
    v.y - Math.floor(v.y),
    "z" in v ? v.z - Math.floor(v.z) : 0,
  );
}

export function abs(v: Vector2 | Vector3): Vector3 {
  return vec3(Math.abs(v.x), Math.abs(v.y), "z" in v ? Math.abs(v.z) : 0);
}

export function add(
  v1: Vector2 | Vector3,
  v2: number | Vector2 | Vector3,
): Vector3 {
  if (typeof v2 === "number") {
    return vec3(v1.x + v2, v1.y + v2, "z" in v1 ? v1.z + v2 : 0);
  }
  return vec3(
    v1.x + v2.x,
    v1.y + v2.y,
    "z" in v1 && "z" in v2 ? v1.z + v2.z : 0,
  );
}

export function minus(
  v1: Vector2 | Vector3,
  v2: number | Vector2 | Vector3,
): Vector3 {
  if (typeof v2 === "number") {
    return vec3(v1.x - v2, v1.y - v2, "z" in v1 ? v1.z - v2 : 0);
  }
  return vec3(
    v1.x - v2.x,
    v1.y - v2.y,
    "z" in v1 && "z" in v2 ? v1.z - v2.z : 0,
  );
}

export function mul(
  v1: Vector2 | Vector3,
  v2: number | Vector2 | Vector3,
): Vector3 {
  if (typeof v2 === "number") {
    return vec3(v1.x * v2, v1.y * v2, "z" in v1 ? v1.z * v2 : 0);
  }
  return vec3(
    v1.x * v2.x,
    v1.y * v2.y,
    "z" in v1 && "z" in v2 ? v1.z * v2.z : 0,
  );
}

export function max(
  v1: Vector2 | Vector3,
  v2: number | Vector2 | Vector3,
): Vector3 {
  if (typeof v2 === "number") {
    return vec3(
      Math.max(v1.x, v2),
      Math.max(v1.y, v2),
      "z" in v1 ? Math.max(v1.z, v2) : 0,
    );
  }
  return vec3(
    Math.max(v1.x, v2.x),
    Math.max(v1.y, v2.y),
    "z" in v1 && "z" in v2 ? Math.max(v1.z, v2.z) : 0,
  );
}

export function dot<V extends Vector2 | Vector3>(v1: V, v2: V): number {
  return v1.x * v2.x + v1.y * v2.y + ("z" in v1 && "z" in v2 ? v1.z * v2.z : 0);
}

export function getCoordinates(v: number | Vector2 | Vector3): Vector3 {
  if (isVec3(v)) {
    return v;
  }
  if (isVec2(v)) {
    return { z: 0, ...v };
  }
  return { x: v, y: 0, z: 0 };
}
