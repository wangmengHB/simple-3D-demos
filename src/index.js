import Scene from './Scene'

const SCENE_WIDTH = 400
const SCENE_HEIGHT = 400

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
  }

});






