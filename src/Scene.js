import Point from './Point'


export default class Scene {
    constructor(origin, volume, width, height, imageData) {
        this.width = width
        this.height = height
        this.volume = volume
        this.origin = origin
        this.points = []
        
        for (let x = 0; x < this.volume.width; x++) {
            for (let y = 0; y < this.volume.height; y++) {
                for (let z = 0; z < this.volume.zLength; z++) {
                    if (this.volume.getPoint(x, y, z) > 0) {
                        // 将坐标原点设置到立方体的中心
                        this.points.push(
                            new Point(
                                - (this.volume.width / 2) + x,
                                - (this.volume.height / 2) + y,
                                - (this.volume.zLength / 2) + z,
                                this.volume.getPoint(x, y, z)
                            )
                        )
                    }               
                }
            }
        }

        this.imageData = imageData
    }

    getImageData () {
        drawBackground(this.imageData, this.width, this.height)
        let projectPoints = []      
        for (let i = 0; i < this.points.length; i++) {
            let isNearest = true;
            let {x, y, z, val} = this.points[i]
            for (let j = 0; j < projectPoints.length; j++) {
                if (projectPoints[j].x === x && projectPoints[j].y === y) {
                    if (projectPoints[j].z < z) {
                        projectPoints[j].z = z;
                        projectPoints[j].val = val
                    }
                    isNearest = false;
                    break;
                }
            }
            if (isNearest) {
                projectPoints.push({ 
                    'x': x, 
                    'y': y, 
                    'z': z, 
                    'val': val 
                });
            }
        }

        for (let i = 0; i < projectPoints.length; i++) {
            let p = projectPoints[i]
            this.paintPixel(p.x, p.y, p.val)
        }

        return this.imageData;
    }

    paintPixel(x, y, val) {
        // 相对坐标转换为绝对坐标
        x = this.origin.x + x
        y = this.origin.y + y
        let index = (y * this.width + x) * 4;
        // 将灰度值转换为颜色值
        let color = genColor(val)
        
        this.imageData.data[index + 0] = color.r;
        this.imageData.data[index + 1] = color.g;
        this.imageData.data[index + 2] = color.b;
        this.imageData.data[index + 3] = 127;
    }

    rotateX (angle) {
        this.points.forEach(p => {
            let oldX = p.x, oldY = p.y, oldZ = p.z
            p.y = Math.round(
                oldY * Math.cos(Math.PI * angle / 180) +
                oldZ * Math.sin(Math.PI * angle / 180)
            )
            p.z = Math.round(
                oldZ * Math.cos(Math.PI * angle / 180) -
                oldY * Math.sin(Math.PI * angle / 180)
            )
        })

    }

    rotateY (angle) {
        this.points.forEach(p => {
            let oldX = p.x, oldY = p.y, oldZ = p.z
            p.z = Math.round(
                oldZ * Math.cos(Math.PI * angle / 180) +
                oldX * Math.sin(Math.PI * angle / 180)
            )
            p.x = Math.round(
                oldX * Math.cos(Math.PI * angle / 180) -
                oldZ * Math.sin(Math.PI * angle / 180)
            )
        })

    }

    rotateZ (angle) {
        this.points.forEach(p => {
            let oldX = p.x, oldY = p.y
            p.x = Math.round(
                oldX * Math.cos(Math.PI * angle / 180) + 
                oldY * Math.sin(Math.PI * angle / 180)
            )
            p.y = Math.round(
                oldY * Math.cos(Math.PI * angle / 180) - 
                oldX * Math.sin(Math.PI * angle / 180)
            )
        })

    }

}

function drawBackground(imageData, width, height) {
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

function genColor (val) {
    let r = 0, g = 0, b = 0
    if (val <= 40) {
        r = 255
        g = 0
        b = 0
    } else if (val <= 80) {
        r = 0
        g = 255
        b = 0
    } else if (val <= 120) {
        r = 0
        g = 0
        b = 255
    } else if (val <= 160) {
        r = 255
        g = 255
        b = 0
    } else if (val <= 200) {
        r = 0
        g = 255
        b = 255
    } else {
        r = 255
        g = 0
        b = 255
    }
    return {
        r,
        g,
        b
    } 
}
