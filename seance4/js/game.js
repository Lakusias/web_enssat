 animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

//Canvas
var divArena;
var canArena;
var conArena;
var ArenaWidth = 1000;
var ArenaHeight = 600;

var canvaHeight;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 3;
var backgroundWidth = 1782;
var backgroundHeight = 600;

///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict"; 
    var keycode = event.keyCode, 
        key; 
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) 
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
        
    }
///////////////////////////////////
// Gameplay var
var nbLife = 3;
var ammo = 100;
var difficulty = 1;

///////////////////////////////////
// Others
var jP=0;
var jE=0;

/////////////////////////////////
// Hero Player
var imgPlayer = new Image();
imgPlayer.src = "./assets/Ship/Spritesheet_64x29.png";
var xPlayer = 20;
var yPlayerSpeed = 10;
var yPlayer = 100;
var PlayerHeight = 32;
var PlayerWidth = 64;
var PlayerImgHeight = 29;
var PlayerImgWidth = 64;

/////////////////////////////////
// Weapons
var missSpeed = 25;
var missWidth = 25;
var missHeight = 20;
var WeapImgWidth = 253;
var WeapImgHeight = 178;
var imgWeapon = new Image();
imgWeapon.src = './assets/Projectile/missile.png';
var tMiss=[];
function Missile() {
	this.x = xPlayer;
	this.y = yPlayer;
}

/////////////////////////////////
// Asteroids
var missSpeed = 25;
var missWidth = 25;
var missHeight = 20;
var WeapImgWidth = 253;
var WeapImgHeight = 178;
var imgWeapon = new Image();
imgWeapon.src = './assets/Projectile/missile.png';
var tMiss=[];
function Missile() {
	this.x = xPlayer;
	this.y = yPlayer;
}

/////////////////////////////////
// Other Players
var e1Player = new Image();
e1Player.src = "./assets/Enemy/Hue Shifted/eSpritesheet_40x30_hue1.png";
var e2Player = new Image();
e2Player.src = "./assets/Enemy/Hue Shifted/eSpritesheet_40x30_hue2.png";
var e3Player = new Image();
e3Player.src = "./assets/Enemy/Hue Shifted/eSpritesheet_40x30_hue3.png";
var e4Player = new Image();
e4Player.src = "./assets/Enemy/Hue Shifted/eSpritesheet_40x30_hue4.png";
var xPlayer = 20;
var yPlayerSpeed = 10;
var yPlayer = 100;
var PlayerHeight = 32;
var PlayerWidth = 64;
var PlayerImgHeight = 29;
var PlayerImgWidth = 64;

function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict"; 
    clearItems();
    
    var keycode;
    for (keycode in keyStatus) {
            if(keyStatus[keycode] == true){
                if(keycode == keys.UP) { 
                    if(yPlayer > yPlayerSpeed) yPlayer -= yPlayerSpeed;   
                }
                if(keycode == keys.DOWN) { 
                    if(yPlayer < ArenaHeight - yPlayerSpeed - PlayerHeight) yPlayer += yPlayerSpeed;
                } 
                if(keycode == keys.SPACE) { 
                    if(ammo>0)
                    {
                    	var miss = new Missile();
                    	tMiss.push(miss);
                    	ammo --;
                    	console.log(ammo);
                 	}
                }             
            }
        keyStatus[keycode] = false;
    }
}
function drawScene() {
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict"; 
    //draw player
    jP++;
    jE++;
    if(jP==4) 	jP = 0;
    if(jE==600) 	jE = 0;
    conArena.drawImage(imgPlayer, 0,29*jP,PlayerImgWidth,PlayerImgHeight, xPlayer,yPlayer,PlayerWidth,PlayerHeight);
    //draw missile
    var i;
    for(i=0; i < tMiss.length; i++)
    {
    	tMiss[i].x+=missSpeed;
    	conArena.drawImage(imgWeapon,0,0,WeapImgWidth,WeapImgHeight,tMiss[i].x,tMiss[i].y,missWidth,missHeight);
    	//check xbox
    	//check border
    	if(tMiss[i].x >= ArenaWidth)
    	{
    		tMiss.shift();	//ddelete missile from array when it goes out of canvas
    	}
    }
    
}
function clearItems() {
    "use strict"; 
    conArena.clearRect(xPlayer,yPlayer,PlayerWidth,PlayerHeight);
    var i;
    for(i=0; i < tMiss.length; i++)
    {
    	conArena.clearRect(tMiss[i].x,tMiss[i].y,missWidth,missHeight);
    }
}

function updateGame() {
    "use strict"; 
    updateScene();
    updateItems();
}

function drawGame() {
    "use strict"; 
    drawScene();
    drawItems();    
}


function mainloop () {
    "use strict"; 
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init() {
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    canArena.width = ArenaWidth;
    canArena.height = ArenaHeight;
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);
 
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
