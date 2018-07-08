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

const VOLUMNE_SIZE = 100





let canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = SCENE_WIDTH
canvas.height = SCENE_HEIGHT
let ctx = canvas.getContext('2d')
let imageData = ctx.createImageData(SCENE_WIDTH, SCENE_HEIGHT);

let volume = new Volume(VOLUMNE_SIZE)
let scene = new Volume(COORDINATE_ORIGIN, volume)



function drawBackground(imageData) {
    for (var h = 0; h < height; h++) {
        for (var w = 0; w < width; w++) {
            white(w, h);
        }
    }
    function white(x, y) {
        var index = (y * width + x) * 4;
        imageData.data[index + 0] = 127;
        imageData.data[index + 1] = 127;
        imageData.data[index + 2] = 127;
        imageData.data[index + 3] = 127;
    }
}


function renderPixel(imageData, x, y, pixel) {
    var index = (y * width + x) * 4;
    imageData.data[index + 0] = pixel
    imageData.data[index + 1] = pixel
    imageData.data[index + 2] = pixel
    imageData.data[index + 3] = 127;
}
