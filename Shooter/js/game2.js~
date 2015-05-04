var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

var tics = 0;
var _timeToBeAlive = 30;

var stop = false;

//Canvas
var divArena;
var canArena;
var canScore;
var conArena;
var conScore;
var ArenaWidth = 1000
var ArenaHeight = 600;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;
//une modification

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




///////////////////
// une collection de projectiles
function ProjectileSet(tabTarget){
    this.tabTarget = tabTarget;
    this.score = 0;
    this.tabProjectiles = new Array();
    this.add = function (projectile) {
    this.tabProjectiles.push(projectile);  
    };
    this.remove = function () {  

       this.tabProjectiles.map(function(obj,index,array){
            if(obj.exists == false ||obj.x >ArenaWidth || obj.x<0){
                  delete array[index];
            }
        });

    };


    this.update = function(){
            this.remove();
            var score = 0;
            this.tabProjectiles.map(function(obj){
                obj.update();
                if(obj.exists == false) {//hit
                    score = score +1;
                }
            });
            this.score = this.score + score;
        };
        this.clear = function(){
        this.tabProjectiles.map(function(obj){
             obj.clear();
        });
        };
        this.draw = function(){
        this.tabProjectiles.map(function(obj){
            obj.draw();
        });
    };
    
};




Animation = function(url, length, width, height)
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
	    var offScreenCanvas;
	    var offScreenContext;
	    for(var j=0;j<=that.length;j++)
	    {
		    offScreenCanvas = document.createElement("canvas");
		    offScreenCanvas.width = that.width;
		    offScreenCanvas.height = that.height;
		    offScreenContext = offScreenCanvas.getContext("2d");
		
		    offScreenContext.drawImage(that.img,j*that.width+1,0,that.width,that.height,0,0,that.width, that.height);
		    that.tabOffScreenCanvas.push(offScreenCanvas);
	    }
	}
}

//clear animation
Animation.prototype.clear = function(x,y)
{
    conArena.clearRect(x,y,this.width,this.height);
}

//update animation
Animation.prototype.update = function()
{
    if(tics % 5 == 1) {
        this.cpt = (this.cpt + 1) % this.length;
    }
}

//draw animation
Animation.prototype.draw = function(x,y)
{
    if(this.imgReady)
    {
        conArena.drawImage(this.tabOffScreenCanvas[this.cpt],x,y);
    }
}


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
}

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


}

Player = function(x,y,speed)
{
    Character.call(this,x,y,speed);
    this.lives = 3;
    this.score = 0;
    
    this.anim = new Animation("./assets/Ship/Spritesheet_64x29.png",6,40,30);
    this.explo = new Animation("./assets/Explosion/explosionSpritesheet_128x1280.png",10,128,128);
    
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Enemy = function(x,y,speed)
{
    Character.call(this,x,y,speed);
    this.anim = new Animation("./assets/Enemy/eSpritesheet_40x30.png",6,40,30);
    this.explo = new Animation("./assets/Explosion/explosionSpritesheet_128x1280.png",10,128,128);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

/////////////////////////////////
// Enemy
var enemies = {
    init : function(){
        this.tabEnemies = new Array();
    },
    add : function (enemy) {
        this.tabEnemies.push(enemy);  
    },
    remove : function () {  
        this.tabEnemies.map(function(obj,index,array){
            if(obj.exists == false ||obj.x >ArenaWidth || obj.x<0){
                  delete array[index];
            }
        });
    },
    draw : function(){ 
        this.tabEnemies.map(function(obj){
            obj.draw();
        });
    },
    clear : function(){
       this.tabEnemies.map(function(obj){
            obj.clear();
        });
    },
    update : function(){

        this.tabEnemies.map(function(obj){
            obj.update();
        });
         this.remove();
    }
    
};



function updateScene()
{
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}

function updateItems()
{
    "use strict"; 
    tics++;
     if(tics % 100 == 1) {
         var rand = Math.floor(Math.random() * ArenaHeight);

        enemies.add(new Enemy(ArenaWidth, rand,-2));
    }
    enemies.update();
}
function drawScene()
{
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems()
{
    "use strict"; 
    enemies.draw();
}
function clearItems()
{
    "use strict"; 
    enemies.clear();
}

function clearScore()
{
    conScore.clearRect(0,0,300,50);
}
/*
function drawScore()
{
    conScore.fillText("life : "+player.nbOfLives, 10, 25);
    this.imgLive = new Image();
    this.imgLiveHeight = 170;
    this.imgLiveWidth = 150;
    this.imgHeight = 17;
    this.imgWidth = 15;
    this.imgLive.src = "./assets/heart.png";
    conArena.drawImage(this.imgLive,this.imgLiveWidth, 0, this.imgLiveWidth,this.imgLiveHeight, 10, 10 ,this.width,this.height);
    conScore.fillText("score : "+player.projectileSet.score, 150,25);
}*/

function updateGame()
{
    "use strict"; 
    updateScene();
    updateItems();
}

function clearGame()
{
    "use strict"; 
    clearItems();
    //clearScore();
}

function drawGame()
{
    "use strict"; 
	drawScene();
	//drawScore();
	drawItems();
}


function mainloop ()
{
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
		if(player.nbOfLives == 0)
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
                		//conScore.drawImage(this.imgLive,this.imgLiveWidth, 0, this.imgLiveWidth,this.imgLiveHeight, 10, 10 ,this.width,this.height);
                	}
                	stop = false;
                	conScore.clearRect ( 0 , 0 , ArenaWidth, ArenaHeight );
                }
            }
         keyStatus[keycode] = false;
        }
	}
}

function gameOver()
{
	"use strict";
	conScore.fillText("Game Over press ENTER to restart",25,75);
}


function pausedGame()
{
	"use strict";
	conScore.fillText("Game has been paused press ENTER to restart",25,75);
}

function recursiveAnim ()
{
    "use strict"; 
    mainloop();
    animFrame( recursiveAnim );
}
 
function init()
{
    "use strict";
    divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    canArena.setAttribute("height", ArenaHeight);
    canArena.setAttribute("width", ArenaWidth);
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);

    canScore = document.createElement("canvas");
    canScore.setAttribute("id","canScore");
    canScore.setAttribute("height", ArenaHeight);
    canScore.setAttribute("width", ArenaWidth);
    conScore = canScore.getContext("2d");
    conScore.fillStyle = "rgb(200,0,0)";
    conScore.font = 'bold 12pt Courier';
    divArena.appendChild(canScore);
    
    enemies.init();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
