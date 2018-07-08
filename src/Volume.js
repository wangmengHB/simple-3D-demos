

export default class Volume {
    constructor (size) {
        this.width = size;
        this.height = size;
        this.zLength = size;

        this.points = new Int32Array(size * size * size)


        // 第一个面填颜色 (z = 0)
        for (let i = 0; i < this.width * this.height; i++) {
            this.points[i] = 40
        }

        // 第二个面填颜色 (z = max)
        let start = this.width * this.height * (this.zLength - 1)
        let end = this.width * this.height * this.zLength
        for (let i = start; i < end; i++) {
            this.points[i] = 80
        }

        // 第三个面填颜色 x = 0
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.zLength; j++) {
                this.setPoint(0, i, j, 120)
            }
        }

        // 第4个面填颜色 x = max
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.zLength; j++) {
                this.setPoint(this.width - 1, i, j, 160)
            }
        }

        // 第5个面填颜色 y = 0
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.zLength; j++) {
                this.setPoint(i, this.height - 1, j, 200)
            }
        }

        // 第6个面填颜色 y = max
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.zLength; j++) {
                this.setPoint(i, this.height - 1, j, 240)
            }
        }

    }

    getPoint(x, y, z) {
        let index = z * (this.width * this.height) + y * this.width + x;
        return this.points[index]
    }

    setPoint(x, y, z, pixel) {
        let index = z * (this.width * this.height) + y * this.width + x;
        this.points[index] = pixel
    }


}