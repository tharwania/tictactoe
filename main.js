var HEIGHT = 500;
var WIDTH = 500;
var TILES = 10;
var WIN_DIOGNOL = 5;

var TILE_HEGHT = HEIGHT / TILES;
var TILE_WIDTH = WIDTH / TILES;

var mainCanvas = document.getElementById('mainCanvas');
var ctx = mainCanvas.getContext("2d");

// Draw Tiles
for(i = 1; i < TILES; i++){
	ctx.moveTo(HEIGHT/ TILES * i, 0);
	ctx.lineTo(HEIGHT/ TILES * i, WIDTH);
	ctx.stroke();

	ctx.moveTo(0, WIDTH / TILES * i);
	ctx.lineTo(HEIGHT, WIDTH/ TILES * i);
	ctx.stroke();
}

function getColumnIndex(x, y){
	var a = 0;
	while(x >= TILE_WIDTH){
		x -= TILE_WIDTH
		a++;
	}
	var b = 0;
	while(y >= TILE_HEGHT){
		y -= TILE_HEGHT
		b++;
	}
	return {
		x: a,
		y: b
	}
}

function drawInTheBox(arrayIndex, drawColor){
	var centerX = ((arrayIndex.x * TILE_WIDTH) - (TILE_WIDTH / 2) + TILE_WIDTH);
	var centerY = ((arrayIndex.y * TILE_HEGHT) - (TILE_HEGHT / 2) + TILE_HEGHT);
	var radius = 7;

	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * 3.14, false);
	ctx.fillStyle = drawColor;
	ctx.fill();
	ctx.lineWidth = 0;
	ctx.stroke();
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function checkForDiagonal(mainArray, arrayIndex, turn){
	var diagonalLength = 1;
	for(var i = 1; i <= 4; i++){

		if(arrayIndex.x + i < TILES && arrayIndex.y + i < TILES 
			&& mainArray[arrayIndex.x + i][arrayIndex.y + i] === turn){
			diagonalLength++;
		}
		else{
			break;
		}
	}
	for(var i = 1; i <= 4; i++){
		if(arrayIndex.x - i >= 0 && arrayIndex.y - i >= 0 
			&& mainArray[arrayIndex.x - i][arrayIndex.y - i] === turn){
			diagonalLength++;
		}
		else{
			break;
		}
	}
	return diagonalLength ===  WIN_DIOGNOL ? true : false;
}

function checkForHeight(mainArray, arrayIndex, turn){
	var heightLength = 1;
	for(var i = 1; i <= 4; i++){

		if(arrayIndex.x < TILES && arrayIndex.y + i < TILES 
			&& mainArray[arrayIndex.x][arrayIndex.y + i] === turn){
			heightLength++;
		}
		else{
			break;
		}
	}
	for(var i = 1; i <= 4; i++){
		if(arrayIndex.x >= 0 && arrayIndex.y - i >= 0 
			&& mainArray[arrayIndex.x][arrayIndex.y - i] === turn){
			heightLength++;
		}
		else{
			break;
		}
	}
	return heightLength ===  WIN_DIOGNOL ? true : false;
}

function checkForLength(mainArray, arrayIndex, turn){
	var lengthLength = 1;
	for(var i = 1; i <= 4; i++){

		if(arrayIndex.x + i < TILES && arrayIndex.y < TILES 
			&& mainArray[arrayIndex.x + i][arrayIndex.y] === turn){
			lengthLength++;
		}
		else{
			break;
		}
	}
	for(var i = 1; i <= 4; i++){
		if(arrayIndex.x - i >= 0 && arrayIndex.y >= 0 
			&& mainArray[arrayIndex.x - i][arrayIndex.y] === turn){
			lengthLength++;
		}
		else{
			break;
		}
	}
	return lengthLength ===  WIN_DIOGNOL ? true : false;
}

function checkForWin(mainArray, arrayIndex, turn){
	return checkForLength(mainArray, arrayIndex, turn) || checkForHeight(mainArray, arrayIndex, turn) || checkForDiagonal(mainArray, arrayIndex, turn);
}

var turn = true; // P1 = TRUE, P2 = FALSE;
var mainArray =  createArray(TILES, TILES);


mainCanvas.onclick = function(e){
	var arrayIndex = getColumnIndex(e.x, e.y);

	var drawColor = turn ? 'green' : 'red';
	mainArray[arrayIndex.x][arrayIndex.y] = turn;
	drawInTheBox(arrayIndex, drawColor)
	if(checkForWin(mainArray, arrayIndex, turn)){
		alert(drawColor + ' won');
	}
	

	turn = !turn;
}


