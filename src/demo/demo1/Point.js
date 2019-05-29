
export default class Point {

  constructor(coordinate, color, pointSize = 3.0) {
    this.coordinate = {
      x: coordinate.x,
      y: coordinate.y,
      z: coordinate.z,
      w: 1
    };
    this.color = {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a
    };
    this.pointSize = pointSize;
  }

  clone() {
    const coordinate = {
      x: this.coordinate.x,
      y: this.coordinate.y,
      z: this.coordinate.z,
      w: this.coordinate.w,
    };
    const color = {
      r: this.color.r,
      g: this.color.g,
      b: this.color.b,
      a: this.color.a,
    };
    const pointSize = this.pointSize;
    return new Point(coordinate, color, pointSize);
  }         
}

