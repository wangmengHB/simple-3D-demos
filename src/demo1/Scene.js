import { rotateX, rotateY, rotateZ } from './transform';

export default class Scene {
  constructor(width, height, canvas) {
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    this.ctx = canvas.getContext('2d')
    this.imageData = this.ctx.createImageData(width, height);
    this.fragments = [];
    this.points = [];
  }

  addPoints(ps) {
    this.points = this.points.concat(ps);
  }

  clearCanvas() {
    for (let i = 0; i < this.imageData.data.length; i++) {
      this.imageData.data[i] = 0;
    }
  }

  paint() {
    // clear canvas
    this.clearCanvas();
    // draw every point in the canvas
    this.drawPoints();
  }

  drawPoints() {
    // the point nearest to face, should be drawed last.
    this.points.sort((a, b) => b.coordinate.z - a.coordinate.z);
    // draw every point from far to near with point size
    this.points.forEach(p => {
      const {x, y} = p.coordinate;
      const {r, g, b, a} = p.color;
      const { pointSize } = p;
      const centerX = Math.floor((this.width / 2) * x + this.width / 2);
      const centerY = Math.floor((this.height / 2) * y + this.height /2);
      let minX = Math.floor(centerX - pointSize/2);
      let maxX = Math.floor(centerX + pointSize/2);
      let minY = Math.floor(centerY - pointSize/2);
      let maxY = Math.floor(centerY + pointSize/2);
      minX = minX > 0? minX: 0;
      maxX = maxX < this.width? maxX: this.width;
      minY = minY > 0? minY: 0;
      maxY = maxY < this.height? maxY: this.height;
      
      // suppose every point is a rectangle
      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          const index = (y * this.width + x) * 4;
          this.imageData.data[index] = r;
          this.imageData.data[index + 1] = g;
          this.imageData.data[index + 2] = b;
          this.imageData.data[index + 3] = a;
        }
      }
    });
    this.ctx.putImageData(this.imageData, 0, 0);
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

}
