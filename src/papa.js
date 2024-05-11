// {{{variables
let debugMode=true;
let imageMatrix; 
const tileCenter = document.createElement('div');
const tileLeft = document.createElement('div');
const tileRight = document.createElement('div');
const tileUp = document.createElement('div');
const tileDown = document.createElement('div');

const imgCenter = document.createElement('img');
const imgLeft = document.createElement('img');
const imgRight = document.createElement('img');
const imgUp = document.createElement('img');
const imgDown = document.createElement('img');

const contextElement = document.getElementById("context-menu");

var xCurr, yCurr;
// }}}variables
// {{{event listeners
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
window.addEventListener("DOMContentLoaded", initWin);
window.addEventListener("contextmenu", customContextMenu);
window.addEventListener("click", respondToClick);

function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    switch (keyPressed) {
       case 38  : shiftTiles("up"); break;//key: <up>
       case 40  : shiftTiles("down"); break;//key: <down>
       case 39  : shiftTiles("right"); break; //key: right
       case 37  : shiftTiles("left"); break; //key: left
        default : return;
		} // switch (keyPressed)
} // function evalKeyDown
// }}}event listeners
// {{{init
function initWin() {
		populateImageMatrix();
		arrangeTiles();

} // function initWin
// }}}init
// {{{handlers
function populateImageMatrix()  {
	imageMatrix = [
		["A1","A2","A3","A4","A5","A6"],
		["B1","B2","B3","B4","B5","B6"],
		["C1","C2","C3","C4","C5","C6"],
		["D1","D2","D3","D4","D5","D6"]
	];
} // function populateImageMatrix
function arrangeTiles() {

    tileCenter.setAttribute('id','centerTile');
    imgCenter.setAttribute('id','centerImg');
    imgCenter.setAttribute('class','imgTile');

    tileLeft.setAttribute('id','leftTile');
    imgLeft.setAttribute('id','leftImg');
    imgLeft.setAttribute('class','imgTile');

    tileRight.setAttribute('id','rightTile');
    imgRight.setAttribute('id','rightImg');
    imgRight.setAttribute('class','imgTile');

    tileUp.setAttribute('id','upTile');
    imgUp.setAttribute('id','upImg');
    imgUp.setAttribute('class','imgTile');

    tileDown.setAttribute('id','downTile');
    imgDown.setAttribute('id','downImg');
    imgDown.setAttribute('class','imgTile');


    document.body.appendChild(tileCenter);
    document.body.appendChild(tileLeft);
    document.body.appendChild(tileRight);
    document.body.appendChild(tileUp);
    document.body.appendChild(tileDown);

		tileCenter.appendChild(imgCenter);
		tileLeft.appendChild(imgLeft);
		tileRight.appendChild(imgRight);
		tileUp.appendChild(imgUp);
		tileDown.appendChild(imgDown);
		
		xCurr = 0;
		yCurr = 1;
		imagesToTiles(xCurr,yCurr)
} // function arrangeTiles()

function imagesToTiles(xCenter,yCenter) {
		matrixWidth  = imageMatrix.length;
		matrixHeight  = imageMatrix[0].length;

    tileCenter.setAttribute('class','tile center');
    tileLeft.setAttribute('class','tile left');
    tileRight.setAttribute('class','tile right');
    tileUp.setAttribute('class','tile up');
    tileDown.setAttribute('class','tile down');

		let xLeft = xCenter - 1; if (xLeft < 0) xLeft = matrixWidth - 1;
		let xRight = xCenter + 1; if (xRight > matrixWidth - 1) xRight = 0;
		let yUp = yCenter - 1; if (yUp < 0) yUp = matrixHeight - 1;
		let yDown = yCenter + 1; if (yDown > matrixHeight - 1) yDown = 0;

		let imgNameCenter = imageMatrix[xCenter][yCenter];
		let imgNameLeft = imageMatrix[xLeft][yCenter];
		let imgNameRight = imageMatrix[xRight][yCenter];
		let imgNameUp = imageMatrix[xCenter][yUp];
		let imgNameDown = imageMatrix[xCenter][yDown];

		setTimeout(() => {imgCenter.setAttribute("src","high/"+imgNameCenter+".webp")},1)
		tileCenter.setAttribute("style","background-image: url(low/"+imgNameCenter+".webp)")

		setTimeout(() => {imgLeft.setAttribute("src","high/"+imgNameLeft+".webp")},1)
		tileLeft.setAttribute("style","background-image: url(low/"+imgNameLeft+".webp)")

		setTimeout(() => {imgRight.setAttribute("src","high/"+imgNameRight+".webp")},1)
		tileRight.setAttribute("style","background-image: url(low/"+imgNameRight+".webp)")

		setTimeout(() => {imgUp.setAttribute("src","high/"+imgNameUp+".webp")},1)
		tileUp.setAttribute("style","background-image: url(low/"+imgNameUp+".webp)")

		setTimeout(() => {imgDown.setAttribute("src","high/"+imgNameDown+".webp")},1)
		tileDown.setAttribute("style","background-image: url(low/"+imgNameDown+".webp)")

		debugLog ("Center: "+imgNameCenter);
		debugLog ("Left: "+imgNameLeft);
		debugLog ("Right: "+imgNameRight);
		debugLog ("Up: "+imgNameUp);
		debugLog ("Down: "+imgNameDown);
} // function imagesToTiles(xPos,YPos)

function shiftTiles(direction) {

			if (direction=="random") {
								let getDirection = Math.floor(Math.random()*4);
								debugLog("random direction: "+getDirection);
								switch (getDirection) {
										case 0: direction="left";break;
										case 1: direction="right";break;
										case 2: direction="down";break;
										case 3: direction="up";break;
										default: return;
								} //switch(getDirection)
			} // if (direction=="random")

    switch (direction) {
			case "left" : 
				tileRight.setAttribute('class','tile rightToCenter');
				tileCenter.setAttribute('class','tile centerToLeft'); 
				xCurr++; if (xCurr > matrixWidth-1) xCurr = 0;
				break;
			case "right" : 
				tileLeft.setAttribute('class','tile leftToCenter');
				tileCenter.setAttribute('class','tile centerToRight'); 
				xCurr--; if (xCurr < 0) xCurr = matrixWidth - 1;
				break;
			case "up" : 
				tileDown.setAttribute('class','tile downToCenter');
				tileCenter.setAttribute('class','tile centerToUp'); 
				yCurr++; if (yCurr > matrixHeight-1) yCurr = 0;
				break;
			case "down" : 
				tileUp.setAttribute('class','tile upToCenter');
				tileCenter.setAttribute('class','tile centerToDown'); 
				yCurr--; if (yCurr < 0) yCurr = matrixHeight - 1;
				break;
			default: return;
		} // switch (direction)
		debugLog (xCurr+","+yCurr)
		settleAndRetile();
} // function shiftTiles(direction)

function settleAndRetile() {
		let settleTime = 400;
		let overlay = document.getElementById("overlay")
		overlay.setAttribute("class","flashOverlay")
		window.removeEventListener("keydown", evalKeyDown); 
		setTimeout(() => {
			imagesToTiles(xCurr,yCurr)
			window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
			overlay.setAttribute("class","invisible")
		}, settleTime)
} // function settleAndRetile()

function customContextMenu(event) {
	event.preventDefault();

	contextElement.style.top = event.offsetY + "px";
	contextElement.style.left = event.offsetX + "px";
	// contextElement.classList.add("active");
	contextElement.setAttribute("class","active")
	console.log("show context menu")
} // function customContextMenu

function respondToClick() {
	contextElement.setAttribute("class","inactive")
} // function respondToClick()
// }}}handlers
// {{{helpers
function debugLog(msg) {
	if (debugMode) console.log (msg);
} // function debugLog(msg)
// }}}helpers
