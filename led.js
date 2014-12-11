/*
** Program: led screen.
** Author: zJh.
** Org: HUNAU.
** Date: 2014-10-18.
** Update: 2014-12-11.
** Copyright (c) 2014, zJh
** Site: zjhou.com
** Email: z@zjhou.com
*/

//------------------------------
// :: MAKE A TABLE AS SCREEN
//------------------------------
var timer = 0;

(function(){
 
 	var W = document.body.clientWidth; // SCREEN's width
 	var H= document.body.clientHeight;// SCREEN's height
	var TW = 6; // cells' width and height.
	var c = (W + 1)/(TW + 1);
	var r = (H + 1)/(TW + 1);
	var HTM = "";
	for( var j = 0; j < r; j++)
	{
		HTM += "<tr>";
		for(var i = 0; i < c; i++)
			HTM += ("<td id=c"+j+"_"+i+"></td>");
		HTM += "</tr>";
	}

	document.getElementById("tb").innerHTML = "<tbody>"+HTM+"</tbody>";

	COL = c;
	ROW = r;

}())

//------------------------------
// :: SCREEN OPT 
//------------------------------

function cls(){
	var l = document.getElementsByTagName('td');
	var ll = l.length;
	for ( var i = 0; i < ll; i++)
		l[i].style.background = '#111';
}

// TEXT
function colorPixel(
		 x, y, // Coordinate.
		 c // HEX color value, eg. #00ac50
){ 
	if( x >= 0 && x <= COL &&
		y >= 0 && y <= ROW){
		var px = document.getElementById("c"+y+"_"+x);
		px.style.background = c;
	}
}

function showLter(
		 x, y, // Top left corner's coordinate.
		 l, c){
	var a = FONT.getLter(l);
	if (a == 'ent'){ // Enter to make new line
		showLter(x, y, ' ', c);
	}
	else{
		var w = a[0].length;
		var h = a.length;
		for (var i = 0; i < h; i++)
			for(var j = 0; j < w; j++)
				if ( a[i][j] )colorPixel(x+j, y+i, c);
	}

}

function showWord(
		 x, y, //The first letter's top-left cornor's coordinate.
		 word, color
		){

	var l = word.length;
	for (var i = 0; i < l; i++)
	{
		var lt = word.charAt(i);
		showLter(x, y, lt, color);
		if (lt == '\n' || x > COL - ltl ){ // auto newline.
			var ltl = FONT.getLter(' ')[0].length;
			var lth = FONT.height+FONT.line_space;
			x = 0;
			y += lth;
		}else{
			var ltl = FONT.getLter(lt)[0].length;
			x += ltl;
		}
	}
}

function showText(m){
	showWord(1, 10, m, '#222');
}

//Pic
function drawLine(x1, y1, x2, y2, color){
	if (x1 == x2 ) {
		for ( var i = y1; i < y2; i++)
			colorPixel(x1 , i, color);
	}else if( y1 == y2 ) {
		for ( var i = x1; i < x2; i++)
			colorPixel(i , y1, color);
	}else{}
}

function drawRect(x, y, //top-left x,y
				  wid, ht,
				  color)
{
	for( var i = 0; i < ht; i++)
		for( var j = 0; j < wid; j++)
			colorPixel(j+x, i+y, color);
}

//Utils
function rand(){return Math.floor(Math.random()*2);}
function ms(){return new Date().getTime();}

//Ajax
function get(url, callback) {
	var request = new XMLHttpRequest();
	request.open("GET", url);

	request.onreadystatechange = function(){
		if (request.readyState === 4 && request.status === 200){
			var type = request.getResponseHeader("Content-Type");
			if( type == 'application/json')
				callback(JSON.parse(request.responseText));
			else 
				callback(request.responseText);
		}
	}

	request.send(null);
}

//------------------------------
// :: GUI RESULT
//------------------------------
var go = true;


function hm(){
	cls();
	go = false;
	
	showWord(5, 5, 'HELLO WORLD', '#96ed89');
	showWord(11, 19, 'LED BOARD DEMO PAGE', '#4bbf55');
}

function tmp(){
	cls();
	go = false;
	showWord(5, 5, 'BLANKET:', '#96ed89');
	showWord(11, 19, 'construction...', '#45bf55');
}

function abt(){
	cls();
	go = false;

	showWord(5, 5, 'Contact:', '#96ed89');
	showWord(21, 30, 'http://zjhou.com ', '#167f39');
	showWord(18, 45, 'email: z@zjhou.com', '#044c29');
}

function showLogo(){
	var logo_a = FONT.getLter('`');

	var logo_wid = logo_a[0].length;
	var logo_ht = logo_a.length;
	
	// gain the center position.
	var x = parseInt((COL - logo_wid)/2);
	var y = parseInt((ROW - logo_ht)/2);

	showWord(x, y, '`', '#222');
}

//tmp
var tmp_y = parseInt(ROW-15);

//The LED clock
function update(){
	if (go)
	{
		var mydt = new Date();

		var h = mydt.getHours();
		var m = mydt.getMinutes();
		var s = mydt.getSeconds();
		
		if (h < 10 ) h = "0" + h;
		if (m < 10 ) m = "0" + m;
		if (s < 10 ) s = "0" + s;

		//Clear the previous info and show digit.
		showWord(1, tmp_y-11, '~~~', '#111'); 
		showWord(1, tmp_y, '~~~~~', '#111'); 

		showWord(1, tmp_y-11, h+":", '#167f39');
		showWord(1, tmp_y, m+":"+s, '#167f39');
	}
}

//------------------------------
// :: MAIN FUNCTION 
//------------------------------
setInterval(update, 1000);
showLogo();

//DFA.
var bt = document.getElementById('tb');
var state = '0';
bt.onclick = function(){
	if( ms() - timer > 1000){ // avoid click too frequently.
		switch ( state ) {
			case '0' : hm(); state = '1'; break;
			case '1' : tmp(); state = '2'; break;
			case '2' : abt(); state = '3'; break;
			case '3' : hm(); state = '1'; break;
		}

		timer = ms();
	}
}
