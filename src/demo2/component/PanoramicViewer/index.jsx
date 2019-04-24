import './style.scss'
import React from 'react'
import PropTypes from 'prop-types'
import ImageData from './ImageData'
import {limitX, limitY, calcViewSize, validateLongititude, validateLattitude} from './util'
import AnchorPoint from './AnchorPoint'
import coordinator from './Coordinator';



export default class PanoramicViewer extends React.Component {
    static propTypes = {
        imageUrl: PropTypes.string,
        fullsceen: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        // anchors: PropTypes.arrayOf(AnchorPoint)
    }

    constructor (props) {
        super(props)
        this.imageLoad = this.imageLoad.bind(this)
        this.handleMousemove = this.handleMousemove.bind(this)
        
        this.imageData = null
        this.ctx = null
      
        this.IMAGE_WIDTH = 0
        this.IMAGE_HEIGHT = 0
        this.VIEW_WIDTH = 0
        this.VIEW_HEIGHT= 0

        // 纬度: -90 - 90
        this.lat = 0;
        // 经度: -180  - 180 
        this.lon = 0;

        this.imageLoaded = false;
              
    }

    componentDidMount () {
        this.refs.sourceImage.addEventListener('load', this.imageLoad);
        this.refs.viewport.addEventListener('mousemove', this.handleMousemove);
    }

    imageLoad () {
        const {sourceImage, sourceCanvas, viewport} = this.refs
        const IMAGE_WIDTH = sourceImage.width
        const IMAGE_HEIGHT = sourceImage.height
        const size = calcViewSize(
            IMAGE_WIDTH, 
            IMAGE_HEIGHT,
            window.innerWidth,
            window.innerHeight
        )       
        const VIEW_WIDTH = size.width
        const VIEW_HEIGHT = size.height

        coordinator.setSize(IMAGE_WIDTH, IMAGE_HEIGHT, VIEW_WIDTH, VIEW_HEIGHT);

        console.log(`IMAGE_WIDTH: ${IMAGE_WIDTH};IMAGE_HEIGHT:${IMAGE_HEIGHT}`)
        console.log(`VIEW_WIDTH: ${VIEW_WIDTH};VIEW_HEIGHT:${VIEW_HEIGHT}`)      
        

        sourceCanvas.width = IMAGE_WIDTH
        sourceCanvas.height = IMAGE_HEIGHT
        viewport.width = VIEW_WIDTH
        viewport.height = VIEW_HEIGHT 

        this.IMAGE_HEIGHT = IMAGE_HEIGHT
        this.IMAGE_WIDTH = IMAGE_WIDTH
        this.VIEW_HEIGHT = VIEW_HEIGHT
        this.VIEW_WIDTH = VIEW_WIDTH
        
        const ctx = sourceCanvas.getContext('2d')
        ctx.drawImage(sourceImage, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)
        const data = ctx.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT)      
        this.ctx = viewport.getContext('2d')
        const viewData = this.ctx.createImageData(VIEW_WIDTH, VIEW_HEIGHT)
        this.imageData = new ImageData(
            data, 
            IMAGE_WIDTH, 
            IMAGE_HEIGHT, 
            viewData, 
            VIEW_WIDTH,
            VIEW_HEIGHT
        )
        
        const {anchors} = this.props;
        let node = this.refs.labelgroup;
        anchors.forEach(anchor => {
            const ele = anchor.createAnchorElement(
                this.IMAGE_WIDTH,
                this.IMAGE_HEIGHT,
                this.VIEW_WIDTH,
                this.VIEW_HEIGHT
            );
            node.appendChild(ele);
        })

        this.repaint();
        this.imageLoaded = true;
               
    }

    
    handleMousemove (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      let {movementX, movementY} = ev
      if (!this.imageLoaded) {
          console.log('image is not loaded.')
          return;
      }
      if (ev.which !== 0) {        
        this.lon += movementX;
        this.lat -= movementY;
        // 需要限定 lon 的有效值范围： -180， 180，并且为循环
        // lat 的有效值范围： -85， 85，停止增加
        this.lon = validateLongititude(this.lon);
        this.lat = validateLattitude(this.lat);
        console.log(`经度:${this.lon}, 纬度:${this.lat}`);

        this.repaint()
      }
    }

    repaint () {
      // 整体画布上的，视角区域的左上角的坐标值
      let pos = coordinator.getImageLeftTopPosAt(this.lon, this.lat);
      const data = this.imageData.getDataAt(pos.x, pos.y)
      this.ctx.putImageData(data, 0, 0)
      
      // 处理埋点元素
      const {anchors} = this.props;
      anchors.forEach(anchor => {
          anchor.moveAt(this.lon, this.lat);
      })
    }

    render () {
        const {fullsceen} = this.props
        const cls = `panoramic-viewer${fullsceen?' fullscreen':''}`

        // todo: if image is not loaded, can show some loading animation effect

        return (
          <div className={cls}>
            <img ref="sourceImage" className="source-image" src={this.props.imageUrl}/>
            <canvas 
              ref="sourceCanvas" 
              className="source-canvas"
            />
            <canvas 
              ref="viewport" 
              className="viewport"
            />
            <div ref="labelgroup">
            </div>
          </div>
        )
    }
}


