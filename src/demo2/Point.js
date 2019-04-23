
export default class Point {

  constructor(coordinate, color) {
    this.coordinate = {
      x: coordinate.x,
      y: coordinate.y,
      z: coordinate.z,
      w: 1
    }
    this.color = {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a
    }
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
    return new Point(coordinate, color);
  }         
}

