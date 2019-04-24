const FOV = 75;

// -180  180
export function validateLongititude (lon) {
  let res = lon + 180;
  while (res < 0) {
    res += 360;
  }
  res = res % 360;
  return res - 180;
}

// -85  85
export function validateLattitude (lat) {
  if (lat >= 85) {
    lat = 85;
  } else if (lat <= -85) {
    lat = -85;
  }
  return lat;
}


export function calcViewSize (IMAGE_WIDTH, IMAGE_HEIGHT, sceenWidth, sceenHeight) {
    const ratio = sceenWidth / sceenHeight
    const MAX_LEN = Math.floor(IMAGE_WIDTH * FOV / 360)
    let width = MAX_LEN, height = MAX_LEN
    if (ratio > 1) {
        height = Math.floor(width / ratio)
    } else if (ratio < 1) {
        width = Math.floor(height * ratio)
    }
    return {
        width,
        height
    }
}