
import React from 'react'
import ReactDOM from 'react-dom'
import PanoramicViewer from './component/PanoramicViewer'
import AnchorPoint from './component/PanoramicViewer/AnchorPoint'

import SAMPLE_1 from './sample_1.jpg'
import SAMPLE_2 from './sample_2.jpg'
import SAMPLE_3 from './sample_3.png'

const URL_1 = SAMPLE_1;
const URL_2 = SAMPLE_2;
const URL_3 = SAMPLE_3;


const anchor1 = new AnchorPoint(-180, 0, 'SOUTH', URL_1, [], renderPanorama);
const anchor2 = new AnchorPoint(-90, 0, 'WEST', URL_3, [], renderPanorama);
const anchor3 = new AnchorPoint(0, 0, 'NORTH', URL_3, [], renderPanorama);
const anchor4 = new AnchorPoint(90, 0, 'EAST', URL_3, [], renderPanorama);

anchor1.addSubAnchors([anchor3]);



const anchors = [
  anchor1,
  anchor2,
  anchor3,
  anchor4
]


renderPanorama(URL_2, anchors);


function renderPanorama (url, anchors = []) {
  const container = document.getElementById('app')
  ReactDOM.unmountComponentAtNode(container)
  ReactDOM.render(
    <PanoramicViewer
      imageUrl={url}
      fullscreen={true}
      anchors={anchors}
    />,
    container
  )
}





