import Scene from './Scene'
import { buildPoints } from './buildSamplePoint';

const SCENE_WIDTH = 600
const SCENE_HEIGHT = 600

const STEP = 10


let description = document.createElement('div')
description.innerHTML = `
<div>press [q or a]: rotatX(+/-10)</div> 
<div>press [w or s]: rotateY(+/-10)</div> 
<div>press [e or d]: rotateZ(+/-10)</div>
`
document.body.appendChild(description)

let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = SCENE_WIDTH
canvas.height = SCENE_HEIGHT



// step 1. build a scene and bind canvas
let scene = new Scene(
    SCENE_WIDTH,
    SCENE_HEIGHT,
    canvas,
);

// step 2. add points of 6 faces of a cubic to scene
scene.addPoints(buildPoints());

// step 3. paint scene
scene.paint();

// step 4. add key events
window.addEventListener('keydown', function (ev) {
  switch (ev.keyCode) {
    // key: q
    case 87:
        rotate('x', STEP)
        break
    // key: a
    case 83:
        rotate('x', -STEP)
        break
    // key: w
    case 69:
        rotate('y', STEP)
        break
    // key: s
    case 68:
        rotate('y', -STEP)
        break
    // key: e
    case 81:
        rotate('z', STEP)
        break
    // key: d
    case 65:
        rotate('z', -STEP)
        break
  }

});


function rotate(axis, angle) {
  if (axis === 'x' ) {
      scene.rotateX(angle)
  } else if (axis === 'y' ) {
      scene.rotateY(angle)
  } else if (axis === 'z') {
      scene.rotateZ(angle)
  }
  scene.paint();
}






