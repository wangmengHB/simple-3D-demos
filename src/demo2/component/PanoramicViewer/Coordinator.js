

class Coordinator {
  constructor (IMAGE_WIDTH, IMAGE_HEIGHT, VIEW_WIDTH, VIEW_HEIGHT) {
    this.IMAGE_WIDTH = IMAGE_WIDTH;
    this.IMAGE_HEIGHT = IMAGE_HEIGHT;
    this.VIEW_WIDTH = VIEW_WIDTH;
    this.VIEW_HEIGHT = VIEW_HEIGHT;
  }


  setSize (IMAGE_WIDTH, IMAGE_HEIGHT, VIEW_WIDTH, VIEW_HEIGHT) {
    this.IMAGE_WIDTH = IMAGE_WIDTH;
    this.IMAGE_HEIGHT = IMAGE_HEIGHT;
    this.VIEW_WIDTH = VIEW_WIDTH;
    this.VIEW_HEIGHT = VIEW_HEIGHT;
  }

  getImageLeftTopPosAt (lon, lat) {
    let x = ((lon - (-180)) / 360) * this.IMAGE_WIDTH - this.VIEW_WIDTH/2;
    let y = (-(lat - (90)) / 180) * this.IMAGE_HEIGHT - this.VIEW_HEIGHT/2;

    x = Math.floor(x);
    y = Math.floor(y);

    return {
      x,y
    }
  }



}


export default new Coordinator();