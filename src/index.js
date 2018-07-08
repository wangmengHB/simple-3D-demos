import Volume from './Volume'
import Scene from './Scene'

const SCENE_WIDTH = 800
const SCENE_HEIGHT = 800
const SCENE_ZLENGTH = 800

const COORDINATE_ORIGIN = {
    x: SCENE_WIDTH / 2,
    y: SCENE_HEIGHT / 2,
    z: SCENE_ZLENGTH / 2,
}

const VOLUMNE_SIZE = 80
const STEP = 10





let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = SCENE_WIDTH
canvas.height = SCENE_HEIGHT
let ctx = canvas.getContext('2d')
let imageData = ctx.createImageData(SCENE_WIDTH, SCENE_HEIGHT);

let volume = new Volume(VOLUMNE_SIZE)
let scene = new Scene(
    COORDINATE_ORIGIN, 
    volume,
    SCENE_WIDTH,
    SCENE_HEIGHT,
    imageData
)

ctx.putImageData(scene.getImageData(), 0, 0);

function rotate(axis, angle) {
    if (axis === 'x' ) {
        scene.rotateX(angle)
    } else if (axis === 'y' ) {
        scene.rotateY(angle)
    } else if (axis === 'z') {
        scene.rotateZ(angle)
    }


    ctx.putImageData(scene.getImageData(), 0, 0);
}




document.addEventListener('keydown', function (ev) {
    switch (ev.keyCode) {
        case 87:
            rotate('x', STEP)
            break
        case 83:
            rotate('x', -STEP)
            break
        case 69:
            rotate('y', STEP)
            break
        case 68:
            rotate('y', -STEP)
            break
        case 81:
            rotate('z', STEP)
            break
        case 65:
            rotate('z', -STEP)
            break
    }

});






