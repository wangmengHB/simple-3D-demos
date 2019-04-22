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


