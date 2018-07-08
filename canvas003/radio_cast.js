var ctx = window.document.getElementById('myCanvas').getContext('2d');
var width = 600;
var height = 600;
var hstart = 600;
var vstart = 600;
var maxDist = 3000;
var angle_resolution = 5;
var viewArray = [];
for (var i = 0; i <= 180*angle_resolution; i++) {
	viewArray[i] = [];
	for (var j = 0; j <= 360*angle_resolution; j++) {
		viewArray[i].push({r:0,g:0,b:0,dist:maxDist});
	}
}

width = 360*angle_resolution;
height = 180*angle_resolution;
window.document.getElementById('myCanvas').width = width;
window.document.getElementById('myCanvas').height = height; 

var imageData = ctx.createImageData(width, height);
var half_length = 300;
var cubic_volume = [];
var renderVolume = [];

for (var i = -half_length; i <= half_length; i++) {
	cubic_volume.push({x:-half_length,y:half_length, z:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:half_length,y:-half_length, z:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:half_length,y:half_length, z:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:-half_length,y:-half_length, z:i, pixel:{r:255,g:0,b:0}});
}

for (var i = -half_length; i <= half_length; i++) {
	cubic_volume.push({z:-half_length,y:half_length, x:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({z:half_length,y:-half_length, x:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({z:half_length,y:half_length, x:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({z:-half_length,y:-half_length, x:i, pixel:{r:255,g:0,b:0}});
}
for (var i = -half_length; i <= half_length; i++) {
	cubic_volume.push({x:-half_length,z:half_length, y:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:half_length,z:-half_length, y:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:half_length,z:half_length, y:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:-half_length,z:-half_length, y:i, pixel:{r:255,g:0,b:0}});
}


for (var i = -half_length; i <= half_length; i++){
	for (var j = -half_length;j <= half_length; j++) {
		cubic_volume.push({y:i,z:j, x:half_length, pixel:{r:0,g:0,b:255}});
	}
}

for (var i = -half_length; i <= half_length; i++){
	for (var j = -half_length;j <= half_length; j++) {
		cubic_volume.push({y:i,z:j,x:-half_length, pixel:{r:0,g:255,b:0}});
	}
}

for (var i = -half_length; i <= half_length; i++){
	for (var j = -half_length;j <= half_length; j++) {
		cubic_volume.push({x:i,y:j, z:half_length, pixel:{r:255,g:0,b:255}});
	}
}

for (var i = -half_length; i <= half_length; i++){
	for (var j = -half_length;j <= half_length; j++) {
		cubic_volume.push({x:i,y:j, z:-half_length, pixel:{r:255,g:255,b:0}});
	}
}

for (var i = -half_length; i <= half_length; i++){
	for (var j = -half_length;j <= half_length; j++) {
		cubic_volume.push({z:i,x:j, y:half_length, pixel:{r:255,g:0,b:0}});
	}
}

for (var i = -half_length; i <= half_length; i++){
	for (var j = -half_length;j <= half_length; j++) {
		cubic_volume.push({z:i,x:j, y:-half_length, pixel:{r:0,g:255,b:255}});
	}
}


for (var i = 0; i < cubic_volume.length; i++){
	// renderVolume[i] = cubic_volume[i];
	// cubic_volume[i].x += 200;
	// cubic_volume[i].y += 500;
	// cubic_volume[i].z += 250;
	var x,y,z,r,g,b;
	x = cubic_volume[i].x;
	y = cubic_volume[i].y;
	z = cubic_volume[i].z;
	r = cubic_volume[i].pixel.r;
	g = cubic_volume[i].pixel.g;
	b = cubic_volume[i].pixel.b;
	renderVolume.push({'x':x,'y':y,'z':z,'pixel':{'r':r,'g':g,'b':b}});
}

function rotateZ(a) {
	for (var i = 0; i < cubic_volume.length; i++){
		// renderVolume[i] = cubic_volume[i];
		renderVolume[i].x = cubic_volume[i].x*Math.cos(Math.PI * a/180) + cubic_volume[i].y*Math.sin(Math.PI*a/180);
		renderVolume[i].y = cubic_volume[i].y*Math.cos(Math.PI * a/180) - cubic_volume[i].x*Math.sin(Math.PI*a/180);
		renderVolume[i].z = cubic_volume[i].z;
		renderVolume[i].pixel.r = cubic_volume[i].pixel.r;
		renderVolume[i].pixel.g = cubic_volume[i].pixel.g;
		renderVolume[i].pixel.b = cubic_volume[i].pixel.b;
	}
}

function rotateY(a) {
	for (var i = 0; i < cubic_volume.length; i++){
		// renderVolume[i] = cubic_volume[i];
		renderVolume[i].z = cubic_volume[i].z*Math.cos(Math.PI * a/180) + cubic_volume[i].x*Math.sin(Math.PI*a/180);
		renderVolume[i].x = cubic_volume[i].x*Math.cos(Math.PI * a/180) - cubic_volume[i].z*Math.sin(Math.PI*a/180);
		renderVolume[i].y = cubic_volume[i].y;
		renderVolume[i].pixel.r = cubic_volume[i].pixel.r;
		renderVolume[i].pixel.g = cubic_volume[i].pixel.g;
		renderVolume[i].pixel.b = cubic_volume[i].pixel.b;	
	}
}

function rotateX(a) {
	for (var i = 0; i < cubic_volume.length; i++){
		// renderVolume[i] = cubic_volume[i];
		renderVolume[i].y = cubic_volume[i].y*Math.cos(Math.PI * a/180) + cubic_volume[i].z*Math.sin(Math.PI*a/180);
		renderVolume[i].z = cubic_volume[i].z*Math.cos(Math.PI * a/180) - cubic_volume[i].y*Math.sin(Math.PI*a/180);
		renderVolume[i].x = cubic_volume[i].x;
		renderVolume[i].pixel.r = cubic_volume[i].pixel.r;
		renderVolume[i].pixel.g = cubic_volume[i].pixel.g;
		renderVolume[i].pixel.b = cubic_volume[i].pixel.b;
	}
}


function whiteAll(){
	for (var h = 0; h < height; h++) {
		for (var w = 0; w < width; w++) {
			white(w,h);
		}
	}
	function white(x,y) {    	
	    var index = (y * width + x) * 4;
	    imageData.data[index + 0] = 127;
	    imageData.data[index + 1] = 127;
	    imageData.data[index + 2] = 127;
	    imageData.data[index + 3] = 127;
	}
}

function renderPixel(x,y,p) {    	
    var index = (y * width + x) * 4;
    imageData.data[index + 0] = p.r;
    imageData.data[index + 1] = p.g;
    imageData.data[index + 2] = p.b;
    imageData.data[index + 3] = 127;
}

function clearViewArray(){
	var i = 0, j=0;
	for (var i = 0; i < viewArray.length; i++) {
		for (var j = 0; j < viewArray[i].length; j++) {
			viewArray[i][j].r = 0;
			viewArray[i][j].g = 0;
			viewArray[i][j].b = 0;
			viewArray[i][j].dist = 3000;
		}
	}	
}


function renderObject(){
	var x,y,z,v,ha,va,dist,p={};
	clearViewArray();
	for (var i = 0; i < renderVolume.length; i++){
		x = ~~renderVolume[i].x;
		y = ~~renderVolume[i].y;
		z = ~~renderVolume[i].z;
		p.r = renderVolume[i].pixel.r;
		p.g = renderVolume[i].pixel.g;
		p.b = renderVolume[i].pixel.b;
		dist = Math.sqrt(x*x+y*y+z*z);

		if (y===0) {
			if (z>=0) {
				va = 90*angle_resolution;
			} else if (z<0) {
				va = -90*angle_resolution;
			}
			if (x>=0) {
				ha = 90*angle_resolution;
			} else if ( x< 0) {
				ha = -90*angle_resolution;
			}
		} else if (y > 0) {
			if ( Math.abs(z/y) < 1.8 && Math.abs(x/y) <1.8) {
				va = ~~(Math.atan(z/y)*180/Math.PI * angle_resolution);
				ha = ~~(Math.atan(x/y)*180/Math.PI * angle_resolution);
			} else {
				continue;
			}
		// } else if ( y < 0) {
		// 	va = -~~(Math.atan(z/y)*180/Math.PI * angle_resolution);
		// 	if (x >= 0) {
		// 		ha = 180*angle_resolution + ~~(Math.atan(x/y)*180/Math.PI * angle_resolution);
		// 	} else if (x < 0) {
		// 		ha = ~~(Math.atan(x/y)*180/Math.PI * angle_resolution) - 180*angle_resolution;
		// 	}
		} else {
			continue;
		}

		ha += 180*angle_resolution;
		va = 90*angle_resolution - va;

		if (viewArray[va][ha].dist > dist) {
			viewArray[va][ha].r = p.r;
			viewArray[va][ha].g = p.g;
			viewArray[va][ha].b = p.b;
			viewArray[va][ha].dist = dist;
		}
	}
}


setInterval(function(){
	ctx.putImageData(imageData, 0, 0);
},1000/30);


rotateZ(30);
// rotateY(45);
// rotateZ(80);
// rotateZ(45);
renderObject();
showView();




function showView(){
	whiteAll();
	for (var i = 0; i < 180*angle_resolution; i++) {
		for (var j = 0; j < 360*angle_resolution; j++) {
			renderPixel(j,i,viewArray[i][j]);
		}
	}
}



var xa =0;
var ya =0;
var step = 0;

window.document.addEventListener('keydown',function(ev){
	// up
	if (ev.keyCode === 87) {
		xa += 10;
		step = 50;
	// down
	} else if (ev.keyCode === 83) {
		xa -= 10;
		step = -50;
	// left
	} else if (ev.keyCode === 65) {
		ya += 10;

	// right
	} else if (ev.keyCode === 68) {
		ya -= 10;

	}
	// showView(hstart,vstart);

	// rotateX(xa);
	// rotateZ(ya);

	for (var i = 0; i < renderVolume.length; i++){
		renderVolume[i].y += step;
	}

	renderObject();
	showView(); 
});