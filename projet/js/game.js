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
    for (key in keys) {
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
    }
}
    
var tics = 0;
var _timeToBeAlive = 30;

var stop = false;

var hpMax = 100;
var hpMin = 0;

//Canvas
var divGame;
var canGame;
var canScore;
var conGame;
var conScore;
var GameWidth = 1000;
var GameHeight = 600;
var squareSize = 50;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;
var grassWidth = 1024;
var grassHeight = 1024;
var finishHeight = 128;
var finishWidth = 128;

//Player
var imgHeightPlayer = 64;
var imgWidthPlayer = 64;


var tabMap = new Array(GameWidth/squareSize);
var tabObj = new Array(GameWidth/squareSize);
var tabEne = new Array(GameWidth/squareSize);

for(var i=0; i < GameWidth/squareSize; i++)
{
    tabMap[i] = new Array(GameHeight/squareSize);
    tabObj[i] = new Array(GameHeight/squareSize);
    tabEne[i] = new Array(GameHeight/squareSize);
    for(var j=0; j < GameHeight / squareSize; j++)
    {
        tabMap[i][j]=0;
        tabObj[i][j]=0;
        tabEne[i][j]=0;
    }
}

var taboffscreenCanvas = new Array();



//character object
Character = function(x,y,speed,height,width)
{
    this.orientation = 3;
    this.x = x;
    this.y = y;
    this.xSpeed = speed;
    this.xOrigin = x;
    this.yOrigin = y;
    this.height = height;
    this.width = width;
}


/*
On s'en fout pas
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
    this.health = hpMax;
    this.score = 0;
    
    this.anim = new Animation("./assets/lidia.png",9,4,imgWidthPlayer,imgHeightPlayer);
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
        if(this.cpt < this.tabOffScreenCanvas.length)
        {
            conGame.drawImage(this.tabOffScreenCanvas[this.cpt],x,y);
        }
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
    conScore.clearRect(0,0,GameWidth,GameHeight);
}
function drawScore() {
    conScore.fillText("health : "+player.health, 10, 25);
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
                	if(player.health == hpMin)
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
                	conScore.clearRect ( 0 , 0 , GameWidth, GameHeight );
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

    player = new Player(0,6*squareSize,1);
   // player.init();
   // enemies.init();
   
   init_map();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

function init_map()
{
    var imgGrass = new Image();   // Crée un nouvel objet Image
    imgGrass.src = './assets/grass.png'; // Définit le chemin vers sa source
    var imgFinish = new Image();   // Crée un nouvel objet Image
    imgFinish.src = './assets/fountain.png'; // Définit le chemin vers sa source
    imgGrass.onload = function()
    {
        
        for(i=0; i < GameWidth/squareSize; i ++)
        {
            for(j=0; j < GameHeight/ squareSize; j++)
            {
                nb = Math.random();
                if (nb < 0.7)
                {
                //on a de la terre l'afficher
                    conGame.drawImage(imgGrass,0,0,grassWidth,grassHeight,i*squareSize,j*squareSize,squareSize, squareSize);
                    tabMap[i][j] = 1;
                    nb = Math.random();
                    if(nb < 0.18)
                    {
                        //ajout d'un objet sur la case
                        //conGame.drawImage(imgObj,0,0,objWidth,objHeight,i*squareSize+0.5*squareSize,j*squareSize+0.5*squareSize,squareSize, squareSize);
                        tabObj[i][j] = Math.round(Math.round(nb*100)/2);
                        //console.log("nouvel objet   :" + Math.round(Math.round(nb*100)/2));
                    }
                    nb = Math.random();
                    if (nb < 0.15)
                    {
                        //ajout d'un ennemi sur la case
                        nb = Math.random();
                        tabEne[i][j] = Math.round(nb * 10)*3;
                        //console.log("nouvel ennemi:  "+ Math.round(nb * 10)*3);   
                    }
                }
                
            }
        }
        conGame.drawImage(imgGrass,0,0,grassWidth,grassHeight,0,5*squareSize,squareSize, squareSize);
        conGame.drawImage(imgGrass,0,0,grassWidth,grassHeight,19*squareSize,5*squareSize,squareSize, squareSize);
        imgFinish.onload = function() {
            conGame.drawImage(imgFinish,0,0,finishWidth,finishHeight,19*squareSize,5*squareSize,squareSize, squareSize);
        }
    }
}

window.addEventListener("load", init, false);
