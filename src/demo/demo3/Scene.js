import { rotateX, rotateY, rotateZ, toSphere } from './transform';
import { buildPoints } from './buildSamplePoint';

const FOV = 90 * Math.PI / 180;


export default class Scene {
  constructor(width, height, canvas) {
    this.points = buildPoints();
    this.width = width;
    this.height = height;
    this.ctx = canvas.getContext('2d')
    this.imageData = this.ctx.createImageData(width, height);
    this.camera = {
      x: 0,
      y: 0,
      z: 0,
      w: 1
    };
    
  }

  calcPointsToImageData() {
    // clear image data
    for (let i = 0; i < this.imageData.data.length; i++) {
      this.imageData.data[i] = 0;
    }
    
    const spherePoints = this.points.map(p => toSphere(p, this.camera));

    // the point nearest to face, should be drawed last.
    spherePoints.sort((a, b) => b.coordinate.z - a.coordinate.z);

    // normalize the coordinate to canvas coordinate
    spherePoints.forEach(p => {
      // x, y is angle!!
      const {x, y} = p.coordinate;
      const {r, g, b, a} = p.color;

      if (x > -FOV/2 && x < FOV/2 && y < FOV/2 && y > -FOV/2) {

        const canvasX = Math.floor((this.width / 2) * (x/(FOV/2))+ this.width / 2);
        const canvasY = Math.floor((this.height / 2) * (y/(FOV/2)) + this.height /2);
        const index = (canvasY * this.width + canvasX) * 4;
        this.imageData.data[index] = r;
        this.imageData.data[index + 1] = g;
        this.imageData.data[index + 2] = b;
        this.imageData.data[index + 3] = a;
      }

    })

  }

  forward(step) {
    this.camera.z += step;
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
