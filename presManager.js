inlets = 1;
outlets = 0;

var p = this.patcher;

var maxx;
var maxy;

var zerox;
var zeroy;

var multix;
var multiy;

var positions	= [[]];
var tsize	= 100;

var picobs		= [];
var lineobs		= [];

var grid		= [];

function bang (){

	for( var i = 1; i < 24; i++ ){
		
		picobs[i] 	= p.getnamed("fpic["+i+"]");
		lineobs[i] 	= p.getnamed("alphaline["+i+"]");
	
	}
	
	grid = [16,16];
	
}

function gridsize (x , y){

	
	grid = [640 / x,480 / y];

}


function tuioin (dunno, num, x , y ){

	if (num > 3){
		x *= 640;
		y *= 480;
	
		x = 640 - x;
		
	
		move( num, x, y);
		resize( num, 100, 100);
	
	}
}

function move( num, x , y ){
	
	
	positions[num] = [x,y];
	
	x *= multix;
	y *= multiy;
	
	x += zerox;
	y += zeroy;
			
	var curr = picobs[num].getattr( "presentation_rect");
	picobs[num].message( "presentation_rect", x, y, curr[2], curr[3]);

	
		
}

function resize( num, x , y ){
		
	var curr = picobs[num].getattr("presentation_rect");
	picobs[num].message("presentation_rect", curr[0], curr[1], x, y);	

}

function tokensize( num ){
	
	tsize = num;
	
	for(var i = 4;i < 24;i++){
		resize(i, tsize, tsize);
	}

}

function newpic( num, file ){

	
	picobs[num].message("autofit", 1);
	picobs[num].message("read", file);

}

function windowsize( x, y, x2, y2 ){
	
	x2 -= x;
	y2 -= y;

	maxx = x2;
	maxy = x2 / (640 / 480);
	
	if ( maxy > y2 ){
		maxx = y2 * (640 / 480);
		maxy = y2;
	}
	
	zerox = (x2 - maxx) / 2;
	zeroy = (y2 - maxy) / 2;
	
	for( var i = 1;i < 4;i++ ){
		resize( i, maxx, maxy);
		move( i, 0, 0);
	}
	for(var i = 4;i < 24;i++){
		if (positions[i] != null){
			move(i, positions[i][0], positions[i][1]);
		}
	}
	
	tokensize(tsize);
	
}