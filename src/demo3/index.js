import Scene from './Scene'

const SCENE_WIDTH = 600
const SCENE_HEIGHT = 600

const STEP = 10


let description = document.createElement('div')
description.innerHTML = `
<div>press [q or a]: rotatX(+/-10)</div> 
<div>press [w or s]: rotateY(+/-10)</div> 
<div>press [e or d]: rotateZ(+/-10)</div>
<div>press [up]: camera move forward</div>
<div>press [down]: camera move forward</div>
`
document.body.appendChild(description)

let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = SCENE_WIDTH
canvas.height = SCENE_HEIGHT

let scene = new Scene(
    SCENE_WIDTH,
    SCENE_HEIGHT,
    canvas,
);

scene.paint();

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

function walk(step) {

  scene.forward(step);
  scene.paint();
}




document.addEventListener('keydown', function (ev) {
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
    // key: up
    case 38:
      walk(0.01);
      break;
    // key: down
    case 40:
      walk(-0.01);
      break;
  }

});






