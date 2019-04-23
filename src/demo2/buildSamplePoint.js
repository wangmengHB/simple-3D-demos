import Point from './Point'

const GAP = 0.005;
const MIN = -0.3;
const MAX = 0.3;

const COLOR_1 = {
  r: 255,
  g: 0,
  b: 0,
  a: 255,
}

const COLOR_2 = {
  r: 0,
  g: 255,
  b: 0,
  a: 255,
}

const COLOR_3 = {
  r: 0,
  g: 0,
  b: 255,
  a: 255,
}

const COLOR_4 = {
  r: 0,
  g: 255,
  b: 255,
  a: 255,
}

const COLOR_5 = {
  r: 255,
  g: 0,
  b: 255,
  a: 255,
}

const COLOR_6 = {
  r: 255,
  g: 255,
  b: 0,
  a: 255,
}



export function buildPoints() {
  const points = [];
  for (let i = MIN; i < MAX; i += GAP) {
    for (let j = MIN; j < MAX; j+= GAP) {
      const coordinate1 = {
        x: MIN,
        y: i,
        z: j,
      }
      const coordinate2 = {
        x: MAX,
        y: i,
        z: j,
      }
      const coordinate3 = {
        x: i,
        y: MIN,
        z: j,
      }
      const coordinate4 = {
        x: i,
        y: MAX,
        z: j,
      }
      const coordinate5 = {
        x: i,
        y: j,
        z: MIN,
      }
      const coordinate6 = {
        x: i,
        y: j,
        z: MAX,
      }
      const p1 = new Point(coordinate1, COLOR_1);
      const p2 = new Point(coordinate2, COLOR_2);
      const p3 = new Point(coordinate3, COLOR_3);
      const p4 = new Point(coordinate4, COLOR_4);
      const p5 = new Point(coordinate5, COLOR_5);
      const p6 = new Point(coordinate6, COLOR_6);
      points.push(p1);
      points.push(p2);
      points.push(p3);
      points.push(p4);
      points.push(p5);
      points.push(p6);
    }
  }
  return points;
}
