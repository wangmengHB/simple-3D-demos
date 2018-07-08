

var ctx = window.document.getElementById('myCanvas').getContext('2d');
var width = 800;
var height = 800;
var imageData = ctx.createImageData(width, height);
var volume_center = {x:400, y:400, z:400}
var cubic_volume = [];
var renderVolume = [];

for (var i = -100; i <= 100; i++) {
	cubic_volume.push({x:-100,y:100, z:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:100,y:-100, z:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:100,y:100, z:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:-100,y:-100, z:i, pixel:{r:255,g:0,b:0}});
}

for (var i = -100; i <= 100; i++) {
	cubic_volume.push({z:-100,y:100, x:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({z:100,y:-100, x:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({z:100,y:100, x:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({z:-100,y:-100, x:i, pixel:{r:255,g:0,b:0}});
}
for (var i = -100; i <= 100; i++) {
	cubic_volume.push({x:-100,z:100, y:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:100,z:-100, y:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:100,z:100, y:i, pixel:{r:255,g:0,b:0}});
	cubic_volume.push({x:-100,z:-100, y:i, pixel:{r:255,g:0,b:0}});
}

for (var i = -100; i <= 100; i++){
	for (var j = -100;j <= 100; j++) {
		cubic_volume.push({x:i,y:j, z:100, pixel:{r:0,g:255,b:0}});
	}
}

for (var i = -100; i <= 100; i++){
	for (var j = -100;j <= 100; j++) {
		cubic_volume.push({y:i,z:j, x:100, pixel:{r:0,g:0,b:255}});
	}
}

for (var i = -100; i <= 100; i++){
	for (var j = -100;j <= 100; j++) {
		cubic_volume.push({z:i,x:j, y:100, pixel:{r:127,g:0,b:0}});
	}
}

for (var i = 0; i < cubic_volume.length; i++){
	renderVolume[i] = cubic_volume[i];
}

function rotateZ(a) {
	for (var i = 0; i < cubic_volume.length; i++){
		renderVolume[i] = cubic_volume[i];
		renderVolume[i].x = cubic_volume[i].x*Math.cos(Math.PI * a/180) + cubic_volume[i].y*Math.sin(Math.PI*a/180);
		renderVolume[i].y = cubic_volume[i].y*Math.cos(Math.PI * a/180) - cubic_volume[i].x*Math.sin(Math.PI*a/180);
	}
}

function rotateY(a) {
	for (var i = 0; i < cubic_volume.length; i++){
		renderVolume[i] = cubic_volume[i];
		renderVolume[i].z = cubic_volume[i].z*Math.cos(Math.PI * a/180) + cubic_volume[i].x*Math.sin(Math.PI*a/180);
		renderVolume[i].x = cubic_volume[i].x*Math.cos(Math.PI * a/180) - cubic_volume[i].z*Math.sin(Math.PI*a/180);
	}
}

function rotateX(a) {
	for (var i = 0; i < cubic_volume.length; i++){
		renderVolume[i] = cubic_volume[i];
		renderVolume[i].y = cubic_volume[i].y*Math.cos(Math.PI * a/180) + cubic_volume[i].z*Math.sin(Math.PI*a/180);
		renderVolume[i].z = cubic_volume[i].z*Math.cos(Math.PI * a/180) - cubic_volume[i].y*Math.sin(Math.PI*a/180);
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


function renderPixel(x,y,pixel) {    	
    var index = (y * width + x) * 4;
    imageData.data[index + 0] = pixel.r;
    imageData.data[index + 1] = pixel.g;
    imageData.data[index + 2] = pixel.b;
    imageData.data[index + 3] = 127;
}

function render(){
	var x,y,z,v,p= [], isNeed = false;
	whiteAll();
	for (var i = 0; i < cubic_volume.length; i++){
		isNeed = true;
		x = ~~renderVolume[i].x;
		y = ~~renderVolume[i].y;
		z = ~~renderVolume[i].z;
		v = renderVolume[i].pixel;
		x +=volume_center.x;
		y +=volume_center.y;
		for (var j = 0; j < p.length; j ++) {
			if (p[j].x == x && p[j].y === y) {
				if (p[j].z < z) {
					p[j].z = z;
					p[j].pixel.r = v.r;
					p[j].pixel.g = v.g;
					p[j].pixel.b = v.b;
				}
				isNeed = false;
				break;
			}
		}
		if (isNeed){
			p.push({'x':x,'y':y,'z':z,'pixel':{'r':v.r,'g':v.g,'b':v.b}});
		}
	}
	for (var i = 0 ; i < p.length; i++) {
		renderPixel(p[i].x, p[i].y,p[i].pixel);	
	}	
}


setInterval(function(){
	ctx.putImageData(imageData, 0, 0);
},1000/1);

render();

window.document.addEventListener('keydown',function(ev){
	if (ev.keyCode === 87) {
		rotateX(10);
	} else if (ev.keyCode === 83) {
		rotateX(-10);
	} else if (ev.keyCode === 69) {
		rotateY(10);
	} else if (ev.keyCode === 68) {
		rotateY(-10);
	} else if (ev.keyCode === 81) {
		rotateZ(10);
	} else if (ev.keyCode === 65) {
		rotateZ(-10);
	}
	render();

});