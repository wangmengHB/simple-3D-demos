import Point from './Point';

export function toRadian(angle) {
  return Math.PI * angle / 180;
}

export function translate(dx, dy, dz, point) {
  if (!(point instanceof Point)) {
    throw new Error('only support point type!')
  }
  const {x, y, z} = point.coordinate;
  point.coordinate.x = x + dx;
  point.coordinate.y = y + dy;
  point.coordinate.z = z + dz;
}

export function scale(sx, sy, sz, point) {
  if (!(point instanceof Point)) {
    throw new Error('only support point type!')
  }
  const {x, y, z} = point.coordinate;
  point.coordinate.x = x * sx;
  point.coordinate.y = y * sy;
  point.coordinate.z = z * sz;
}

export function rotateX(angle, point) {
  if (!(point instanceof Point)) {
    throw new Error('only support point type!')
  }
  const {x, y, z} = point.coordinate;
  point.coordinate.x = x;
  point.coordinate.y = 
    y * Math.cos(toRadian(angle)) -
    z * Math.sin(toRadian(angle));
  point.coordinate.z = 
    y * Math.sin(toRadian(angle)) +
    z * Math.cos(toRadian(angle));
}

export function rotateY(angle, point) {
  if (!(point instanceof Point)) {
    throw new Error('only support point type!')
  }
  const {x, y, z} = point.coordinate;
  point.coordinate.y = y;
  point.coordinate.z = 
    z * Math.cos(toRadian(angle)) -
    x * Math.sin(toRadian(angle));
  point.coordinate.x = 
    z * Math.sin(toRadian(angle)) +
    x * Math.cos(toRadian(angle)); 
}

export function rotateZ(angle, point) {
  if (!(point instanceof Point)) {
    throw new Error('only support point type!')
  }
  const {x, y, z} = point.coordinate;
  point.coordinate.z = z;
  point.coordinate.x = 
    x * Math.cos(toRadian(angle)) - 
    y * Math.sin(toRadian(angle));
  point.coordinate.y =
    x * Math.sin(toRadian(angle)) + 
    y * Math.cos(toRadian(angle)); 
}






/**
 * Generates a perspective projection matrix with the given bounds.
 * Passing null/undefined/no value for far will generate infinite projection matrix.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum, can be null or Infinity
 * @returns {mat4} out
 */
export function perspective(out, fovy, aspect, near, far) {
  let f = 1.0 / Math.tan(fovy / 2), nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
    nf = 1 / (near - far);
    out[10] = (far + near) * nf;
    out[14] = (2 * far * near) * nf;
  } else {
    out[10] = -1;
    out[14] = -2 * near;
  }
  return out;
}