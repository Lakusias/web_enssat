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
	RIGHT: 39,
	LEFT: 37,
    ENTER: 13,
	REFRESH: 82,
	MUSIC: 80,
	MUTE: 77,
	SUPERMODE: 20
};

///////////////////////////////////
//Orientations
var orientations = {
	UP: 0,
	DOWN: 2,
	LEFT: 1,
	RIGHT: 3
	
};

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
	// player.idle = false;
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys) {
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }
    }
	// player.idle = true;
}

//variables de jeu
var keyStatus = {};
var player;  
var tics = 0;
var stop = false;
var hpMax = 100;
var hpMin = 0;
var enemies = new Array();

//Canvas
var divGame;
var divScore;
var canGame;
var canScore;
var conGame;
var conScore;
var GameWidth = 1000;
var GameHeight = 600;
var ScoreHeight = 100;


//Background + Elements
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;
var grassWidth = 1024;
var grassHeight = 1024;
var finishHeight = 128;
var finishWidth = 128;
var bonusWidth = 340;
var bonusHeight = 376;
var enemyHeight = 291;
var enemyWidth = 200;
var imgGrassReady =false;
var imgGrass1Ready =false;
var imgGrass2Ready =false;
var imgGrass3Ready =false;
var imgFinishReady = false;
var imgBonusReady = false;
var imgEnemyReady = false;
var squareSize = 50;
var destroyedEne = 0;

//audio var
var mute=false;
var audio = new Audio('./sounds/ambiance2.mp3');
audio.play();
audio.loop=true;    //set autoplay on the general music
var audioObj = new Audio('./sounds/Mp3/Jingle_Achievement_01.mp3');
var audioEne = new Audio('./sounds/Mp3/Hero_Death_00.mp3');
var audioEnd = new Audio('./sounds/Mp3/Victory.mp3');
var audioOver = new Audio('./sounds/gameover.mp3');

//Characters parameter
var imgHeightPlayer = 64;
var imgWidthPlayer = 64;
var imgHeightEnemy = 64;
var imgWidthEnemy = 64;
var imgHeightBoss = 64;
var imgWidthBoss = 64;

//global map arrays
var tabMap = new Array(GameWidth/squareSize);
var tabObj = new Array(GameWidth/squareSize);
var tabEne = new Array(GameWidth/squareSize);
// var taboffscreenCanvas = new Array();

//array initialization
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





//character object
Character = function(x,y,height,width,supermode,idle,orientation)
{
    this.x = x;
    this.y = y;
    
    this.height = height;
    this.width = width;
	this.superMode = supermode;
	this.orientation = orientation;
	this.idle = idle;
}

//clear character
Character.prototype.clear = function()
{
    this.anim.clear(this.x,this.y);
}

//update character
Character.prototype.update = function()
{
	if(!this.idle && !stop)	//regarder si le joueur bouge et si le jeu n'est pas en pause
	{
		var posy,posx;
		this.anim.update();
		
		switch(this.orientation)
		{
			case 0:	//on va vers le haut
				if(this.y<this.height/2)	//collision avec le bord
				{
					this.y=0;
					this.idle=true;
				}
				else
				{
					posy = Math.round((this.y - this.height*0.5) / squareSize);
					posx = Math.round((this.x) / squareSize);
					// console.log("posx== " + posx + "  posy==  " + posy);
					if(tabMap[posx][posy] == 0)	//collision avec de l'eau
					{
						this.idle = true;
					}
					else
					{
						if(this.endAnim)	//pas d'animation en cours
						{
							this.xSvt = this.x;
							this.ySvt = this.y - squareSize;
							this.endAnim = false;
						}
						else
						{
							
							if(this.y > this.ySvt) this.y -= this.speed;
							else
							{
								this.endAnim = true;
								if(!this.superMode) this.idle= true;
							}
						}
					}
				}
				break;
			case 1:	//on va vers la gauche
				if(this.x< this.width*0.5) //collision avec le bord
				{
					this.x = 0;
					this.idle = true;
				}
				else
				{
					posy = Math.round((this.y) / squareSize);
					posx = Math.round((this.x - this.width*0.5) / squareSize);
					// console.log("posx== " + posx + "  posy==  " + posy);
					if(tabMap[posx][posy] == 0)	//collision avec de l'eau
					{
						this.idle = true;
					}
					else
					{
						if(this.endAnim)
						{
							this.xSvt = this.x - squareSize;
							this.ySvt = this.y;
							this.endAnim = false;
						}
						else
						{
							if(this.x > this.xSvt) this.x -= this.speed;
							else
							{
								this.endAnim = true;
								if(!this.superMode) this.idle= true;
							}
						}
					}
				}
				break;
			case 2:	//on va vers le bas
				if(this.y>GameHeight-this.height)//collision avec le bord
				{
					this.y=GameHeight-this.height*0.5;
					this.idle=true;
				}
				else
				{
					posy = Math.round((this.y + this.height*0.25) / squareSize);
					posx = Math.round((this.x) / squareSize);
					// console.log("posx== " + posx + "  posy==  " + posy);
					if(tabMap[posx][posy] == 0)	//collision avec de l'eau
					{
						this.idle = true;
					}
					else
					{
						if(this.endAnim)
						{
							this.xSvt = this.x;
							this.ySvt = this.y + squareSize;
							this.endAnim = false;
						}
						else
						{
							if(this.y < this.ySvt) this.y += this.speed;
							else
							{
								this.endAnim = true;
								if(!this.superMode) this.idle= true;
							}
						}
					}
				}
				break;
			case 3:	//on va vers la droite
				if(this.x>GameWidth-this.width*1.5)//collision avec le bord
				{
					this.x=GameWidth-this.width*0.75;
					this.idle = true;	//on arrête l'annimation
				}
				else
				{
					posy = Math.round((this.y) / squareSize);
					posx = Math.round((this.x + this.width*0.5) / squareSize);
					// console.log("posx== " + posx + "  posy==  " + posy);
					if(tabMap[posx][posy] == 0)	//collision avec de l'eau
					{
						this.idle = true;
					}
					else
					{
						if(this.endAnim)
						{
							this.xSvt = this.x + squareSize;
							this.ySvt = this.y;
							this.endAnim = false;
						}
						else
						{
							if(this.x < this.xSvt) this.x += this.speed;
							else
							{
								this.endAnim = true;
								if(!this.superMode) this.idle= true;
							}
						}
					}
				}
				break;
			case -1:
				this.idle = true;
			default:
				this.idle = true;
		}
		//console.log(this.endAnim);
		//regarder si on a un objet
		posy = Math.round((this.y) / squareSize);
		posx = Math.round((this.x + this.width*0.25) / squareSize);
		
		if(tabObj[posx][posy] != 0)
		{
			// console.log("objet");
			//sing a song
			if(!mute)	audioObj.play();
			
			//ajouter les bonus
			player.score += tabObj[posx][posy];
			player.health += tabObj[posx][posy];
			if(player.health>100) player.health=100;
			//supprimer l'objet du terrain
			tabObj[posx][posy] = 0;
		}
		
		//regarder si on a un ennemi
		if(tabEne[posx][posy] != -1)
		{
			//sing a song
			if(!mute)	audioEne.play();
			
			//faire les modifs de l'ennemi
			if(player.superMode)	player.health -= Math.round(enemies[tabEne[posx][posy]-destroyedEne].power/2);
			else                    player.health -= enemies[tabEne[posx][posy]-destroyedEne].power;
			if(player.health < 0)   player.health = 0;
			
			//supprimer l'enemi du terrain
			//enemies[tabEne[posx][posy]].clear();
			console.log(tabEne[posx][posy]-destroyedEne);
			enemies.splice(tabEne[posx][posy]-destroyedEne-1,1);
			tabEne[posx][posy] = -1;
			destroyedEne++;
		}	
	}
}

//draw character
Character.prototype.draw = function()
{
    if(this.superMode)		this.superanim.draw(this.x, this.y,this.idle,this.orientation);
	else					this.anim.draw(this.x, this.y,this.idle,this.orientation);

}


//Player constructor
Player = function(x,y,speed)
{
    Character.call(this,x,y,imgHeightPlayer,imgWidthPlayer,false,true,3);
	this.speed = speed;
    this.health = hpMax;
    this.score = 0;
	this.xOrigin = x;
    this.yOrigin = y;
	this.xSvt = x;
	this.ySvt = y;
	this.endAnim = true;
    this.anim = new Animation("./assets/lidia.png",9,4,imgWidthPlayer,imgHeightPlayer);
	this.superanim = new Animation("./assets/superlidia.png",9,4,imgWidthPlayer,imgHeightPlayer);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


//Enemy constructor
Enemy = function(x,y,power,boss)
{
    Character.call(this,x,y,imgHeightEnemy,imgWidthEnemy,boss,false,0);
    this.power = power;
    this.anim = new Animation("./assets/goblin_0.png",11,1,imgWidthEnemy,imgHeightEnemy);
	this.superanim = new Animation("./assets/boss.png",4,1,imgWidthBoss,imgHeightBoss);
}


Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Player;

//Draw enemy
Enemy.prototype.draw = function()
{
	if(this.superMode)		this.superanim.draw(this.x, this.y,false,0);
	else                	this.anim.draw(this.x, this.y,false,0);
}

//Animation constructor
Animation = function(url, xlength, ylength, width, height)
{
	this.tabOffScreenCanvas= new Array();
    var img = new Image();
    img.src = url;
    this.height = height;
    this.width = width;
    this.cpt = 0;
    this.imgReady = false;
	this.xlength = xlength;
	this.ylength = ylength;
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
    conGame.clearRect(x,y-this.height/2,this.width,1.5*this.height);
}

//update animation
Animation.prototype.update = function()
{
    if(tics % 3 == 1) {
        this.cpt = (this.cpt + 1) ;
    } 
}

//draw animation
Animation.prototype.draw = function(x,y,idle,orientation)
{
    //this.cpt ++;
	if(this.cpt == this.xlength-2) this.cpt =0;
	// console.log("toto");
	if(this.imgReady)
    {
		if(idle)
		{
			if(orientation > 3 || orientation <0) conGame.drawImage(this.tabOffScreenCanvas[4*this.xlength -2],x,y-this.height/2);
			else conGame.drawImage(this.tabOffScreenCanvas[(orientation+1)*this.xlength -2],x,y-this.height/2);
		}
		else
		{
    		//console.log(orientation*this.xlength+this.cpt+2);
    		conGame.drawImage(this.tabOffScreenCanvas[(orientation*this.xlength) +this.cpt+2],x,y-this.height/2);
		}
	}
}

////////////////////////////////
//Update, clear and draw context
//callbacks of the main loop
function updateItems() {
    "use strict"; 
    player.update();
    tics++;
}

function drawItems() {
    "use strict"; 
    player.draw();
	for(var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw();
	}
}
function clearItems() {
    "use strict"; 
    player.clear(); 
}

function clearScore() {
    conScore.clearRect(0,0,GameWidth,GameHeight);
}
function drawScore() {
    conScore.fillText("health : " + player.health, 10, 25);
    conScore.fillText("score : " + player.score, 10,50);
}
function updateGame() {
    "use strict"; 
    updateItems();
}
function clearGame() {
    "use strict"; 
    clearItems();
    clearScore();
}

function drawGame() {
    "use strict"; 
	drawScore();
	drawItems();
}

//mainloop
function mainloop () {
    "use strict";
    var keycode;
	//get player position
	var tmpx = Math.round(player.x/squareSize);
	var tmpy = Math.round(player.y/squareSize);
	//check if player has finish
	var finish = (tmpx == 19 && tmpy ==5);
	
	//check for player's action
	for (keycode in keyStatus) {
		if(keyStatus[keycode] == true){
			if(keycode == keys.UP) {
				player.orientation = 0;
				player.idle = false;
			}
			if(keycode == keys.DOWN) {
				player.idle = false;
				player.orientation = 2;
			}
			if(keycode == keys.LEFT) {
				player.idle = false;
				player.orientation = 1;
			}
			if(keycode == keys.RIGHT) {
				player.idle = false;
				player.orientation = 3;
			}
			if(keycode == keys.REFRESH) {	//map reset
				
				//player.score = 0;
				player.health = 100;
				enemies.splice(0,enemies.length);
				init_map();
				conScore.clearRect ( 0 , 0 , GameWidth, GameHeight );
				conGame.clearRect ( 0 , 0 , GameWidth, GameHeight );
				player.x = 0;
				player.y = 5*squareSize;
				player.orientation = 3;
				destroyedEne = 0;
				//player.superMode = false;
			}
			if(keycode == keys.MUSIC) {	//pause musique
				if(!mute && audio.paused) 		audio.play();
				else					audio.pause();
				player.orientation = 3;
			}
			if(keycode == keys.SUPERMODE) {	//super mode:: buggé
				/*if(player.superMode) player.speed = 5;
				else*/ player.speed = 10;
				player.superMode = true;
			}
			if(keycode == keys.MUTE) {	//enlever tous les sons
				if(!mute)
				{
					audio.pause();
					audioEnd.pause();
					audioOver.pause();
					mute = true;
				}
				else
				{
					mute = false;
				}
				player.orientation = 3;
			}
			if(keycode == keys.ENTER) {
				
				player.orientation = -1;
				//touche entrée lancer faire un choix selon l'état du jeu
				if(player.health == 0)	//le joueur à perdu relancer le jeu
				{
					conScore.clearRect ( 0 , 0 , GameWidth, GameHeight );
					player.score = 0;
					player.health = 100;
					player.orientation = 0;
					enemies.splice(0,enemies.length);
					conGame.clearRect ( 0 , 0 , GameWidth, GameHeight );
					init_map();
					player.x = 0;
					player.y = 5*squareSize;
					destroyedEne = 0;
					//player.superMode = false;
				} else if (finish) {	//le joueur est arrivé à la fin, recommencer le jeu
					conScore.clearRect ( 0 , 0 , GameWidth, GameHeight );
					audioEnd.pause();
					audio.play();
					player.score += player.health;
					player.health = 100;
					enemies.splice(0,enemies.length);
					init_map();
					conGame.clearRect ( 0 , 0 , GameWidth, GameHeight );
					player.x = 0;
					player.y = 5*squareSize;
					destroyedEne = 0;
					//player.superMode = false;
				} else if(!stop) {
					pausedGame();
					stop =true;
					
				} else {	//le jeu est en pause, le relancer
					stop = false;
					conScore.clearRect ( 0 , 0 , GameWidth, GameHeight );
					
				}
			}
		}
	 keyStatus[keycode] = false;
	}
	//le jeu continue
    if(!stop && (player.health > 0) && !finish)
    {
	    // if(audio.ended && !mute) audio.play();
		clearGame();
	    updateGame();
		draw_map();
	    drawGame();
		
	}
	else //interruption du jeu
	{
		if(finish)
		{
			win();	//victoire ...
		}
		if(player.health <= 0)
		{
			gameOver(); 	//... ou défaite...
		}
	}
}

function gameOver() {
	"use strict";
	if(!mute)
	{
		audio.pause();
		audioOver.play();
	}
	conScore.fillText("Game Over press ENTER to restart",25,75);
}

function win() {
	"use strict";
	if(!mute)
	{
		audio.pause();
		audioEnd.play();
	}
	conScore.fillText("Congratulations, you have won! Press ENTER to restart",25,75);
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
	//on initialise la zone de jeu
    divGame = document.getElementById("canva");
    canGame = document.createElement("canvas");
    canGame.setAttribute("id", "canGame");
    canGame.setAttribute("height", GameHeight);
    canGame.setAttribute("width", GameWidth);
    conGame = canGame.getContext("2d");
    divGame.appendChild(canGame);

	//on initialise la zone de score
	divScore = document.getElementById("score");
    canScore = document.createElement("canvas");
    canScore.setAttribute("id", "canScore");
    canScore.setAttribute("height", ScoreHeight);
    canScore.setAttribute("width", GameWidth);
    conScore = canScore.getContext("2d");
	conScore.font = 'bold 20pt Calibri';
    divScore.appendChild(canScore);
	
	//initialisation du joueur
    player = new Player(0,5*squareSize,5,60,60);
   
   //initialisation de la carte
   init_map();
    
window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);
    
    animFrame( recursiveAnim );
    
}

//les images des éléments présents sur la carte
var imgFinish = new Image();
var imgGrass = new Image();
var imgGrass1 = new Image();
var imgGrass2 = new Image();
var imgGrass3 = new Image();
var imgBonus = new Image();
var imgEnemy = new Image();

//initialisation de la map
function init_map()
{
    imgGrass.src = './assets/grass.png'; // Définit le chemin vers sa source
    imgGrass.onload = function()
    {
		imgGrassReady = true;
	}
	
	imgGrass1.src = './assets/grass1.png'; // Définit le chemin vers sa source
    imgGrass1.onload = function()
    {
		imgGrass1Ready = true;
	}
	
	imgGrass2.src = './assets/grass2.png'; // Définit le chemin vers sa source
    imgGrass2.onload = function()
    {
		imgGrass2Ready = true;
	}
	
	imgGrass3.src = './assets/grass3.png'; // Définit le chemin vers sa source
    imgGrass3.onload = function()
    {
		imgGrass3Ready = true;
	}
	
	imgFinish.src = './assets/fountain.png'; // Définit le chemin vers sa source
	imgFinish.onload = function() {
		imgFinishReady = true;
	}
	
	imgBonus.src = './assets/old.png'; // Définit le chemin vers sa source
	imgBonus.onload = function() {
		imgBonusReady = true;
	}
	
	for(i=0; i < GameWidth/squareSize; i ++)
	{
		for(j=0; j < GameHeight/ squareSize; j++)
		{
		    tabEne[i][j] = -1;
			nb = Math.random();
			if (nb < 0.7)
			{
			//on a de la terre l'afficher
				
				tabMap[i][j] = 1;
				nb = Math.random();
				if(nb < 0.18)
				{
					//ajout d'un objet sur la case
					//conGame.drawImage(imgObj,0,0,objWidth,objHeight,i*squareSize+0.5*squareSize,j*squareSize+0.5*squareSize,squareSize, squareSize);
					tabObj[i][j] = Math.round(Math.round(nb*100)/2);
					//console.log("nouvel objet   :" + Math.round(Math.round(nb*100)/2));
				}
				else
				{
					tabObj[i][j] = 0;
				}
				nb = Math.random();
				if (nb < 0.25)
				{
					//ajout d'un ennemi sur la case
					nb = Math.random();
					nb2 = Math.random();
					var power = Math.round(nb * 100);
					var e;
					if((i!=0 && j!=5)&&(i!=19 && j!=5))
					{
					    if(nb2 < 0.2)
					    {
						    //c'est un boss
						    e = new Enemy(i*squareSize,j*squareSize,power,true);
					    }
					    else
					    {
						    e = new Enemy(i*squareSize,j*squareSize,Math.round(power/2),false);
					    }
					    enemies.push(e);
					    tabEne[i][j] = enemies.length;	 //store enemy's position
					    //console.log("nouvel ennemi:  "+ Math.round(nb * 10)*3);  
					}
				}
			}
			else
			{
				tabMap[i][j] = 0;
			}
			//regarder si il n'y a pas eu d'erreur de positionnement sur les ennemis et objets
			if(tabMap[i][j] == 0 && tabObj[i][j] != 0)
			{
				// console.log("OBJECT_ERROR:----" + i + " :: " + j);
				tabObj[i][j] = 0;
			}
			if(tabMap[i][j] == 0 && tabEne[i][j] != -1)
			{
				// console.log("ENNEMY_ERROR:----" + i + " :: " + j);
				tabEne[i][j] = -1;
			}
			
			//enlever les objets/ennemis de l'arrivée et du depart
			tabObj[0][5] = 0;
			tabEne[0][5] = -1;
			tabMap[0][5] = 1;
			tabObj[19][5] = 0;
			tabEne[19][5] = -1;
			tabMap[19][5] = 1;
		}
	}
}


//dessin de la map
function draw_map()
{
	if(imgGrassReady && imgGrass1Ready && imgGrass2Ready && imgGrass3Ready && imgFinishReady && imgBonusReady)
	{
	
		conGame.drawImage(imgGrass,0,0,grassWidth,grassHeight,0,5*squareSize,squareSize, squareSize);
		conGame.drawImage(imgGrass,0,0,grassWidth,grassHeight,19*squareSize,5*squareSize,squareSize, squareSize);
        
		var i,j;
		for(i=0; i < GameWidth/squareSize; i ++)
		{
			for(j=0; j < GameHeight/ squareSize; j++)
			{
				if(tabMap[i][j] == 1)
				{
					if(player.health >= 75)	conGame.drawImage(imgGrass,0,0,grassWidth,grassHeight,i*squareSize,j*squareSize,squareSize, squareSize);
					else if(player.health >= 50) conGame.drawImage(imgGrass1,0,0,grassWidth,grassHeight,i*squareSize,j*squareSize,squareSize, squareSize);
					else if(player.health >= 25) conGame.drawImage(imgGrass2,0,0,grassWidth,grassHeight,i*squareSize,j*squareSize,squareSize, squareSize);
					else  conGame.drawImage(imgGrass3,0,0,grassWidth,grassHeight,i*squareSize,j*squareSize,squareSize, squareSize);
				}
				if(tabObj[i][j] != 0)	conGame.drawImage(imgBonus,0,0,bonusWidth,bonusHeight,i*squareSize,j*squareSize,squareSize, squareSize);//console.log("objet en "+i +j); 	//dessiner l'objet en question
				//if(tabEne[i][j] != 0)	conGame.drawImage(imgEnemy,0,0,enemyWidth,enemyHeight,i*squareSize,j*squareSize,squareSize, squareSize);//console.log("objet en "+i +j); 	//dessiner l'objet en question
			}
		}
		conGame.drawImage(imgFinish,0,0,finishWidth,finishHeight,19*squareSize,5*squareSize,squareSize, squareSize);
	}
}

window.addEventListener("load", init, false);
