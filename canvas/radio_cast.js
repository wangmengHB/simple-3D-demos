var ctx = window.document.getElementById('myCanvas').getContext('2d');
var width = 400;
var height = 400;
var imageData = ctx.createImageData(width, height);
var volume_center = {x:400, y:400, z:400}
var volume_length = 100;
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

for (var i = -100; i <= 100; i++){
	for (var j = -100;j <= 100; j++) {
		cubic_volume.push({x:i,y:j, z:-100, pixel:{r:0,g:255,b:0}});
	}
}

for (var i = -100; i <= 100; i++){
	for (var j = -100;j <= 100; j++) {
		cubic_volume.push({y:i,z:j, x:-100, pixel:{r:0,g:0,b:255}});
	}
}

for (var i = -100; i <= 100; i++){
	for (var j = -100;j <= 100; j++) {
		cubic_volume.push({z:i,x:j, y:-100, pixel:{r:127,g:0,b:0}});
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

setInterval(function(){
	ctx.putImageData(imageData, 0, 0);
}, 1000/1);

// window.document.addEventListener('keydown',function(ev){
// 	if (ev.keyCode === 87) {
// 		rotateX(10);
// 	} else if (ev.keyCode === 83) {
// 		rotateX(-10);
// 	} else if (ev.keyCode === 69) {
// 		rotateY(10);
// 	} else if (ev.keyCode === 68) {
// 		rotateY(-10);
// 	} else if (ev.keyCode === 81) {
// 		rotateZ(10);
// 	} else if (ev.keyCode === 65) {
// 		rotateZ(-10);
// 	}
// 	render();
// });

rotateX(45);
rotateY(45);
rotateZ(45);

var origin = {x:0,y:0,z:0};

var matrix = [];
for (var i = 0; i < 360; i++){
	matrix[i] = [];
	for (var j = 0; j < 360; j++) {
		matrix[i].push({r:0,g:0,b:0});	
	}
}

var FOV = 45;


for (var i = 0; i < renderVolume.length; i++){
	var x, y, z,ha,va, tanx,tany,v;
	x = ~~renderVolume[i].x;
	y = ~~renderVolume[i].y;
	z = ~~renderVolume[i].z;
	v = renderVolume[i].pixel;
	if (x !== 0) {
		tanx = ~~(Math.atan2(y,x));
		tany = ~~(Math.atan2(z,x));
		if (x < 0 && y < 0) {
			ha = 360 - tanx;
		} else if ( x < 0 && y >0 ){
			ha = 180 - tanx
		} else if (x >=0) {
			ha = 90 + tanx;
		}
		if (x < 0 && z < 0) {
			va = 270 - tany;
		} else if ( x < 0 && z >0 ){
			va = 180 + 90 - tany;
		} else if (x >=0) {
			va = 90 - tany;
		}
	} else if (x === 0) {
		if (y >0) { 
			ha = 180;
		} else if ( y < 0) {
			ha = 0;
		}
		if (z >0) { 
			va = 0;
		} else if ( z < 0) {
			ha = 180;
		}
	}
	va = va % 360;
	ha = ha % 360;
	matrix[ha][va].r = v.r;
	matrix[ha][va].g = v.g;
	matrix[ha][va].b = v.b;
}

var ww = 90, hh = 90; 

render(ww,hh);

function render(w,h){
	w = w?w:-w;
	w = w % 360;
	h = h?h:-h;
	h = h % 360;
	for (var i = w- FOV; i < w + FOV; i++) {
		for (var j = h -FOV; j < h + FOV; j++) {
			renderPixel(i-(w- FOV),j-(h -FOV),matrix[i][j]);
		}
	}
}

function renderPixel(x,y,pixel) {    	
    var index = (y * width + x) * 4;
    if (!pixel) {
    	alert('x:' +x + 'y:' + y);
    }
    imageData.data[index + 0] = pixel.r;
    imageData.data[index + 1] = pixel.g;
    imageData.data[index + 2] = pixel.b;
    imageData.data[index + 3] = 127;
}


window.document.addEventListener('keydown',function(ev){
	if (ev.keyCode === 87) {
		ww++;
	} else if (ev.keyCode === 83) {
		ww--;
	} else if (ev.keyCode === 69) {
		hh++;
	} else if (ev.keyCode === 68) {
		hh--;
	} 
	
	render(ww,hh);
});

