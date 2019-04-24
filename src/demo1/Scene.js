import Point from './Point'
import { rotateX, rotateY, rotateZ } from './transform';
import { buildPoints } from './buildSamplePoint';

export default class Scene {
  constructor(width, height, canvas) {
    this.points = buildPoints();
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d')
    this.imageData = this.ctx.createImageData(width, height);
  }

  calcPointsToImageData() {
    // the point nearest to face, should be drawed last.
    this.points.sort((a, b) => b.coordinate.z - a.coordinate.z);

    // clear image data
    for (let i = 0; i < this.imageData.data.length; i++) {
      this.imageData.data[i] = 0;
    }

    // normalize the coordinate to canvas coordinate
    this.points.forEach(p => {
      const {x, y} = p.coordinate;
      const {r, g, b, a} = p.color;
      const canvasX = Math.floor((this.width / 2) * x + this.width / 2);
      const canvasY = Math.floor((this.height / 2) * y + this.height /2);
      const index = (canvasY * this.width + canvasX) * 4;
      this.imageData.data[index] = r;
      this.imageData.data[index + 1] = g;
      this.imageData.data[index + 2] = b;
      this.imageData.data[index + 3] = a;
    })
  }

  rotateX (angle) {
    this.points.forEach(p => {
      rotateX(angle, p);
    })
  }

  rotateY (angle) {
    this.points.forEach(p => {
      rotateY(angle, p);
    });
  }

  rotateZ (angle) {
    this.points.forEach(p => {
      rotateZ(angle, p);
    })
  }

  paint() {
    this.calcPointsToImageData();
    this.ctx.putImageData(this.imageData, 0, 0);
  }

}
