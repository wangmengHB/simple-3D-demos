import PanoramicViewer from './PanoramicViewer'

import SAMPLE_1 from './sample_1.jpg'
import SAMPLE_2 from './sample_2.jpg'
import SAMPLE_3 from './sample_3.png'


const canvas = document.createElement('canvas');
canvas.width = document.body.offsetWidth;
canvas.height = document.body.offsetHeight;
canvas.style.width = '100%';
canvas.style.height = '100%';
document.body.appendChild(canvas);

new PanoramicViewer(canvas, SAMPLE_2);




