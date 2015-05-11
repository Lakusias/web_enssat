var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;


///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};
var player;

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
    
    
var tics = 0;
var _timeToBeAlive = 30;

var stop = false;

//Canvas
var divGame;
var canGame;
var canScore;
var conGame;
var conScore;
var GameWidth = 1000
var GameHeight = 600;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;




var taboffscreenCanvas = new Array();



//character object
Character = function(x,y,speed,height,width)
{
    this.x = x;
    this.y = y;
    this.xSpeed = speed;
    this.xOrigin = x;
    this.yOrigin = y;
    this.height = height;
    this.width = width;
}
/*
Character.prototype.fire = function()
{
    var tmp = new Projectile(this.x-10,this.y+this.height/2,-4,10,5,"rgb(0,200,0)");
    this.projectileSet.add(tmp);
}

Character.prototype.explode = function()
{
    this.exploding = true;
}

Character.prototype.collision = function()
{
    var hits = null;
    var index;
    for(index in tabOfObjects){
        if ((tabOfObjects[index].cptExplosion ==0) && this.x < tabOfObjects[index].x + tabOfObjects[index].width &&
            this.x + this.width > tabOfObjects[index].x &&
            this.y < tabOfObjects[index].y + tabOfObjects[index].height &&
            this.height + this.y > tabOfObjects[index].y) {
                // collision detected!
                hits = tabOfObjects[index];
                break;
        }
    }
    return hits;
}*/

Character.prototype.clear = function()
{
    this.anim.clear(this.x,this.y);
}

Character.prototype.update = function()
{
    this.anim.update();
    this.x = this.x+this.speed;
}

Character.prototype.draw = function()
{
    this.anim.draw(this.x, this.y, this.cpt);
}

Player = function(x,y,speed)
{
    Character.call(this,x,y,speed);
    this.lives = 3;
    this.score = 0;
    
    this.anim = new Animation("./assets/knight_6.png",8,5,70,90);
    //this.explo = new Animation("./assets/Explosion/explosionSpritesheet_128x1280.png",10,128,128);
    
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;



Animation = function(url, xlength, ylength, width, height)
{
    this.tabOffScreenCanvas= new Array();
    var img = new Image();
    img.src = url;
    this.height = height;
    this.width = width;
    this.cpt = 0;
    this.imgReady = false;
    var that = this;
	img.onload = function() {
	    that.imgReady = true;
	    var tmp_offScreenCanvas;
	    var tmp_offScreenContext;
	    for(var k=0; k <= ylength; k++)
	    {
	        for(var j=0; j <= xlength; j++)
	        {
		        tmp_offScreenCanvas = document.createElement("canvas");
		        tmp_offScreenCanvas.width = that.width;
		        tmp_offScreenCanvas.height = that.height;
		        tmp_offScreenContext = tmp_offScreenCanvas.getContext("2d");
		
		        tmp_offScreenContext.drawImage(img,j*that.width+1,k*that.height,that.width,that.height,0,0,that.width, that.height);
		        that.tabOffScreenCanvas.push(tmp_offScreenCanvas);
		        
	        }
	    }
	}
}

//clear animation
Animation.prototype.clear = function(x,y)
{
    conGame.clearRect(x,y,this.width,this.height);
}

//update animation
Animation.prototype.update = function()
{
    if(tics % 5 == 1) {
        this.cpt = (this.cpt + 1) ;
    }
}

//draw animation
Animation.prototype.draw = function(x,y)
{
    if(this.imgReady)
    {
        conGame.drawImage(this.tabOffScreenCanvas[this.cpt],x,y);
    }
}

















/*
function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}*/
function updateItems() {
    "use strict"; 
    player.update();
    tics++;
    /* if(tics % 100 == 1) {
         var rand = Math.floor(Math.random() * ArenaHeight);

        enemies.add(new Enemy(ArenaWidth, rand,-2));
    }
    enemies.update();
    */
}
function drawScene() {
    "use strict"; 
    canGame.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict"; 
    player.draw();
    //enemies.draw();
}
function clearItems() {
    "use strict"; 
    player.clear(); 
    //enemies.clear();
}

function clearScore() {
    conScore.clearRect(0,0,300,50);
}
function drawScore() {
    conScore.fillText("life : "+player.lives, 10, 25);
    this.imgLive = new Image();
    this.imgLiveHeight = 170;
    this.imgLiveWidth = 150;
    this.imgHeight = 17;
    this.imgWidth = 15;
    this.imgLive.src = "./assets/heart.png";
    conGame.drawImage(this.imgLive,this.imgLiveWidth, 0, this.imgLiveWidth,this.imgLiveHeight, 10, 10 ,this.width,this.height);
    //conScore.fillText("score : "+player.projectileSet.score, 150,25);
}
function updateGame() {
    "use strict"; 
    //updateScene();
    updateItems();
}
function clearGame() {
    "use strict"; 
    clearItems();
    clearScore();
}

function drawGame() {
    "use strict"; 
	drawScene();
	drawScore();
	drawItems();
}


function mainloop () {
    "use strict";
    var keycode;
    if(!stop)
    {
	    clearGame();
	    updateGame();
	    drawGame();
	}
	else
	{
		if(player.lives == 0)
		{
			gameOver();
		}
		else
		{
			pausedGame();
		}
		
		for (keycode in keyStatus) {
            if(keyStatus[keycode] == true){
                if(keycode == keys.ENTER) {
                	//pause
                	if(player.nbOfLives == 0)
                	{
                		//clearGame();
                		//xBackgroundSpeed = 1;
                		//clearScore();
                		player.nbOfLives = 3;
                		player.projectileSet.score = 0;
                		//drawScore();
                		//player.init();
					    //enemies.init();
                		init();
                		conScore.drawImage(this.imgLive,this.imgLiveWidth, 0, this.imgLiveWidth,this.imgLiveHeight, 10, 10 ,this.width,this.height);
                	}
                	stop = false;
                	conScore.clearRect ( 0 , 0 , ArenaWidth, ArenaHeight );
                }
            }
         keyStatus[keycode] = false;
        }
	}
}

function gameOver() {
	"use strict";
	conScore.fillText("Game Over press ENTER to restart",25,75);
}


function pausedGame() {
	"use strict";
	conScore.fillText("Game has been paused press ENTER to restart",25,75);
}

function recursiveAnim () {
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init() {
    "use strict";
    divGame = document.getElementById("canva");
    canGame = document.createElement("canvas");
    canGame.setAttribute("id", "canGame");
    canGame.setAttribute("height", GameHeight);
    canGame.setAttribute("width", GameWidth);
    conGame = canGame.getContext("2d");
    divGame.appendChild(canGame);

    canScore = document.createElement("canvas");
    canScore.setAttribute("id","canScore");
    canScore.setAttribute("height", GameHeight);
    canScore.setAttribute("width", GameWidth);
    conScore = canScore.getContext("2d");
    conScore.fillStyle = "rgb(200,0,0)";
    conScore.font = 'bold 12pt Courier';
    divGame.appendChild(canScore);

    player = new Player(GameHeight/2,GameWidth/2,1);
   // player.init();
   // enemies.init();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);