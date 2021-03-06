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
     //console.log(this.tabProjectiles.length);
 };
    
};

////////////////////
// un objet Projectile
function Projectile(x,y,speed,width,height,color){
    this.x = x;
    this.y = y;
    this.xSpeed = speed;
    this.width = width;
    this.height = height;
    this.color = color;
    this.exists = true;
    this.collision = function(tabOfObjects){
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
    };
    this.draw = function(){
        if(this.exists){
            conArena.fillStyle = this.color;
            conArena.fillRect(this.x,this.y,this.width,this.height);
        }
    };
    this.clear = function(){
        if(this.exists){
            conArena.clearRect(this.x-1,this.y-1,this.width+2,this.height+2);
        }
    };
    this.update = function(){
        if(this.exists){
            this.x +=   this.xSpeed ;
            var tmp = this.collision([player].concat(enemies.tabEnemies));
            if(tmp != null){
                tmp.explodes();
                this.exists = false;
            }
        }
    };
}
/////////////////////////////////

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

var imgReadyEnemy = false;
var imgExpReadyEnemy = false;
var imgEnnemyHeight = 30;
var imgEnnemyWidth = 40;
var imgExplosionHeight = 128;
var imgExplosionWidth = 128;

enemyImg = new Image();
enemyImg.src = "./assets/Enemy/eSpritesheet_40x30.png";
var taboffscreenCanvasEnemy = new Array();

enemyImg.onload = function() {
    imgReadyEnemy=true;
    for(var j=0;j<6;j++)
    {
        var tmpoffscreenCanvas = document.createElement("canvas");
        tmpoffscreenCanvas.width = imgEnnemyHeight;
        tmpoffscreenCanvas.height = imgEnnemyWidth;
        var tmpoffscreenContext = tmpoffscreenCanvas.getContext("2d");
        
		tmpoffscreenContext.drawImage(enemyImg,0,j*imgEnnemyHeight+1,imgEnnemyWidth,imgEnnemyHeight,0,0,imgEnnemyWidth,imgEnnemyHeight);
        taboffscreenCanvasEnemy.push(tmpoffscreenCanvas);
    }
}


var imgExplosion = new Image();
var imgExplosionHeight = 128;
var imgExplosionWidth = 128;
imgExplosion.src = "./assets/Explosion/explosionSpritesheet_1280x128.png";

var taboffscreenCanvasExpEnemy = new Array();
this.imgExplosion.onload = function(){ 
    imgExpReadyEnemy = true;
    for(var j=0;j<=11;j++)
    {
        var offscreenCanvasExp = document.createElement("canvas");
	    offscreenCanvasExp.width = imgExplosionWidth;
	    offscreenCanvasExp.height = imgExplosionHeight;
	    var offscreenContextExp = offscreenCanvasExp.getContext("2d");
	
        offscreenContextExp.drawImage(imgExplosion,j*imgExplosionWidth+1,0,imgExplosionWidth,imgExplosionHeight,0,0,imgExplosionWidth, imgExplosionHeight);
	    taboffscreenCanvasExpEnemy.push(offscreenCanvasExp);
    }
    

}

	
//test
function Enemy(x,y,speed){
    this.x = x;
    this.yOrigine = y;
    this.y = this.yOrigine;
    this.xSpeed = speed;
    this.exists = true;
    this.height = 30;
    this.width = 40;
    
    this.cpt = 0;

    this.cptExplosion =  0;//10 images
		
    	
    this.projectileSet = new ProjectileSet();
    this.explodes = function(){
        this.cptExplosion = 1;
    };
    this.collision = function(tabOfObjects){
        var hits = null;
        var index;
        for(index in tabOfObjects){
            if (this.x < tabOfObjects[index].x + tabOfObjects[index].width &&
                this.x + this.width > tabOfObjects[index].x &&
                this.y < tabOfObjects[index].y + tabOfObjects[index].height &&
                this.height + this.y > tabOfObjects[index].y) {
                    // collision detected!
                    hits = tabOfObjects[index];
                    break;
            }
        }
        return hits;
    };
    this.fire = function (){
        var tmp = new Projectile(this.x-10,this.y+this.height/2,-4,10,5,"rgb(0,200,0)");
        this.projectileSet.add(tmp);
    };
    this.draw = function(){ 

        this.projectileSet.draw();
        if(this.cptExplosion!=0){
            if(imgExpReadyEnemy)
            {
                //conArena.drawImage(this.imgExplosion, this.cptExplosion*this.imgExplosionWidth, 0, this.imgExplosionWidth,this.imgExplosionHeight, this.x,this.y,this.width,this.height);
               // conArena.drawImage(taboffscreenCanvasExpEnemy[this.cptExplosion],this.x,this.y);
            }
            
        }else{
            //conArena.drawImage(this.img,  0,this.cpt*this.height,this.width,this.height, this.x,this.y,this.width,this.height);
            if(imgReadyEnemy) {
                conArena.drawImage(taboffscreenCanvasEnemy[this.cpt],this.x,this.y);
            }
        }
    };
    this.clear = function(){
        if(this.exists){
            conArena.clearRect(this.x,this.y,this.width,this.height);
        }
        this.projectileSet.clear();
    };
    this.update = function(){
       if(this.cptExplosion==0){//is not exploding
            this.x +=   this.xSpeed ;
            this.y = this.yOrigine+ ArenaHeight/3 * Math.sin(this.x / 100);
            var tmp = this.collision([player]);
                if(tmp != null){
                    tmp.explodes();
                    this.exists = false;
                }

            if(tics % 5 == 1) {
                    this.cpt = (this.cpt + 1) % 6;
            }
            if(tics % 50 == 1) this.fire();
       }else{
            if(tics % 3 == 1) {
                this.cptExplosion++;
            }
            if(this.cptExplosion>=11){//end of animation
                this.cptExplosion=0;
                this.exists = false;
            }
        }
        this.projectileSet.update();
    };
}
/////////////////////////////////

var taboffscreenCanvasExpPlayer = new Array();
var taboffscreenCanvasPlayer = new Array();
/////////////////////////////////
// Hero Player
var player = {
    init : function(){
        this.img = new Image();
        this.img.src = "./assets/Ship/Spritesheet_64x29.png";
        this.spriteHeight = 16;
        this.cpt = 0;
        this.cptExplosion =  0;//10 images
        this.imgExplosion = new Image();
        this.imgExplosionHeight = 128;
        this.imgExplosionWidth = 128;
        this.imgExplosion.src = "./assets/Explosion/explosionSpritesheet_1280x128.png";
        
        this.imgReady=false;
        this.imgExpReady=false;
        
		this.imgExplosion.onload = function() {
		    player.imgExpReady=true;
		    for(var j=0;j<=10;j++)
		    {
			    player.offscreenCanvasExp = document.createElement("canvas");
			    player.offscreenCanvasExp.width = player.width;
			    player.offscreenCanvasExp.height = player.height;
			    player.offscreenContextExp = player.offscreenCanvasExp.getContext("2d");
			
			    player.offscreenContextExp.drawImage(player.imgExplosion,j*player.imgExplosionWidth+1,0,player.imgExplosionWidth,player.imgExplosionHeight,0,0,player.width, player.height);
			    taboffscreenCanvasExpPlayer.push(player.offscreenCanvasExp);
		    }
		}
        
        this.projectileSet = new ProjectileSet();
        this.img.onload = function() {
            player.imgReady=true;
            for(var j=0;j<4;j++)
            {
		        var offscreenCanvas = document.createElement("canvas");
			    offscreenCanvas.width = player.width;
			    offscreenCanvas.height = player.height;
			    var offscreenContext = offscreenCanvas.getContext("2d");
			
		        offscreenContext.drawImage(player.img,0,j*player.height+1,player.width,player.height,0,0,player.width,player.height);
			    taboffscreenCanvasPlayer.push(offscreenCanvas);
		    }
		}
    },
    x : 20,
    ySpeed : 10,
    y : 100,
    height : 29,
    width : 64,
    nbOfLives : 3,
    timeToBeAlive : 0,
    fires : function(){
        var tmp = new Projectile(this.x+this.width,this.y+this.height/2,4,10,3,"rgb(200,0,0)");
        this.projectileSet.add(tmp);
    },
    explodes : function(){
        if(this.timeToBeAlive == 0) {
            this.nbOfLives--;
            if(this.nbOfLives>0){
                this.timeToBeAlive = _timeToBeAlive;
                this.cptExplosion = 1;
            }else{
                //Game Over
                stop = true;
                console.log("GAME OVER");
            }
        }
    },
    clear : function(){
        conArena.clearRect(this.x,this.y,this.width,this.height);
        this.projectileSet.clear();
    },
    update :  function(){
        var keycode;
        if(tics % 10 == 1) {
                this.cpt = (this.cpt + 1) % 4;
            }
        if(this.timeToBeAlive>0) {
            this.timeToBeAlive --;
        }else{
            for (keycode in keyStatus) {
                if(keyStatus[keycode] == true){
                    if(keycode == keys.UP) {
                        this.y -= this.ySpeed;
                        if(this.y<0) this.y=0;
                    }
                    if(keycode == keys.DOWN) {
                        this.y += this.ySpeed;
                        if(this.y>ArenaHeight-this.height) this.y=ArenaHeight-this.height;
                    }
                    if(keycode == keys.SPACE) {
                        //shoot
                        this.fires();
                    }
                    if(keycode == keys.ENTER) {
                    	//pause
                    	stop = true;
                    }
                }
             keyStatus[keycode] = false;
            }
        }
        this.projectileSet.update();
    },
    draw : function(){
        if(this.timeToBeAlive == 0) {

            //conArena.drawImage(this.img, 0,this.cpt*this.height,this.width,this.height, this.x,this.y,this.width,this.height);
            if(this.imgReady)
            {
                var tmpCanvas = taboffscreenCanvasPlayer[this.cpt];
                conArena.drawImage(tmpCanvas, this.x,this.y);
            }
        }else
        {
            //exploding
            if(this.cptExplosion!=0){
            
                //conArena.drawImage(this.imgExplosion, this.cptExplosion*this.imgExplosionWidth, 0, this.imgExplosionWidth,this.imgExplosionHeight, this.x,this.y,this.width,this.height);
                if(this.imgExpReady)
                {
                    conArena.drawImage(taboffscreenCanvasExpPlayer[this.cptExplosion],this.x,this.y);
                   if(tics % 3 == 1) {this.cptExplosion++;}
                    if(this.cptExplosion>=10) this.cptExplosion=0;
                }
            }
        }
        this.projectileSet.draw();
    }
};



function updateScene() {
    "use strict"; 
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict"; 
    player.update();
    tics++;
     if(tics % 100 == 1) {
         var rand = Math.floor(Math.random() * ArenaHeight);

        enemies.add(new Enemy(ArenaWidth, rand,-2));
    }
    enemies.update();
}
function drawScene() {
    "use strict"; 
    canArena.style.backgroundPosition = xBackgroundOffset + "px 0px" ;
}
function drawItems() {
    "use strict"; 
    player.draw();
    enemies.draw();
}
function clearItems() {
    "use strict"; 
    player.clear(); 
    enemies.clear();
}

function clearScore() {
    conScore.clearRect(0,0,300,50);
}
function drawScore() {
    conScore.fillText("life : "+player.nbOfLives, 10, 25);
    this.imgLive = new Image();
    this.imgLiveHeight = 170;
    this.imgLiveWidth = 150;
    this.imgHeight = 17;
    this.imgWidth = 15;
    this.imgLive.src = "./assets/heart.png";
    conArena.drawImage(this.imgLive,this.imgLiveWidth, 0, this.imgLiveWidth,this.imgLiveHeight, 10, 10 ,this.width,this.height);
    conScore.fillText("score : "+player.projectileSet.score, 150,25);
}
function updateGame() {
    "use strict"; 
    updateScene();
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

 
    player.init();
    enemies.init();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

window.addEventListener("load", init, false);
