import {validateLongititude} from './util';



export default class AnchorPoint {

    // x, y 表示球面坐标系的 维度 和 精度， 最大值为 1

    constructor (lon, lat, content, nextUrl, nextAnchors, renderNext) {
        this.lon = lon;
        this.lat = lat;
        this.content = content;

        this.nextUrl = nextUrl;
        this.nextAnchors = nextAnchors || [];
        this.renderNext = renderNext;

        this.IMAGE_WIDTH = 0;
        this.IMAGE_HEIGHT = 0;
        this.VIEW_WIDTH = 0;
        this.VIEW_HEIGHT = 0;
    }

    addSubAnchors (array) {
      this.nextAnchors = array; 
    }

    createAnchorElement (IMAGE_WIDTH, IMAGE_HEIGHT, VIEW_WIDTH, VIEW_HEIGHT) {
        const ele = document.createElement('div');
        ele.className = "label";
        ele.innerText = this.content;

        this.IMAGE_WIDTH = IMAGE_WIDTH;
        this.IMAGE_HEIGHT = IMAGE_HEIGHT;
        this.VIEW_WIDTH = VIEW_WIDTH;
        this.VIEW_HEIGHT = VIEW_HEIGHT;

        this.ele = ele;

        ele.addEventListener('click', () => {
            this.renderNext(this.nextUrl, this.nextAnchors);
        })


        return ele;
    }

    moveAt (camera_lon, camera_lat) {
      let diff_lat = camera_lat - this.lat;
      let diff_lon = validateLongititude(camera_lon - this.lon);
      let offset_y = (diff_lat / 180) * this.IMAGE_HEIGHT + this.VIEW_HEIGHT/2;
      let offset_x = this.VIEW_WIDTH/2 - (diff_lon/360) * this.IMAGE_WIDTH;
      this.ele.style.top = `${offset_y/this.VIEW_HEIGHT * 100}%`;
      this.ele.style.left = `${offset_x/this.VIEW_WIDTH * 100}%`;
      this.ele.style.transform = `translate(-50%, -50%) rotateX(${diff_lat}deg) rotateY(${diff_lon}deg)`;
    }
}



