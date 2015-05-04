animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;


ArenaWidth = 500;
ArenaHeight = 300;
tics = 0;
timeToBeAlive = 30;

imgPlayer = new Image();
imgPlayer.src = "./assets/Ship/Spritesheet_64x29.png";
imgPlayer.onload = function(){
    
};


Animation = function(url, length, width, height){
    this.tabOffscreenCanvas = new Array();
    this.width = width;
    this.height = height; 
    this.length = length;
    this.ready = false;
    this.cpt = 0;
    var image = new Image();
    image.src = url;
    var that = this;
    image.onload = function(){
        that.ready = true;
        var offscreenCanvas, offscreenContext;
        for(var j=0;j<that.length;j++){ 
			offscreenCanvas = document.createElement("canvas");
			offscreenCanvas.width = that.width;
			offscreenCanvas.height = that.height;
			offscreenContext = offscreenCanvas.getContext("2d");
            offscreenContext.drawImage(image,0,j*that.height,that.width,that.height,0,0,that.width,that.height);
			that.tabOffscreenCanvas.push(offscreenCanvas);
        }
    }
}

Animation.prototype.clear = function(x,y){
    conArena.clearRect(x,y,this.width,this.height);
}
Animation.prototype.update = function(){
    if(tics % 5 == 1) {
        this.cpt = (this.cpt + 1) % this.length;
    }
}
Animation.prototype.draw = function(x,y){
    if(this.ready){
        conArena.drawImage(this.tabOffscreenCanvas[this.cpt],x,y);
    }
}
        


init = function(divId){
    var divArena = document.getElementById(divId);
    this.canArena = document.createElement("canvas");
    this.canArena.setAttribute("id", "canArena");
    this.canArena.setAttribute("width", ArenaWidth);
    this.canArena.setAttribute("height", ArenaHeight);
    this.conArena = this.canArena.getContext("2d");
    divArena.appendChild(this.canArena);  
    
    enemies.init();
    animFrame( recursiveAnim );
    
    
};

function recursiveAnim (){
    clearGame();
    updateGame();
    drawGame();
    animFrame( recursiveAnim );
};
updateGame = function() {
    tics++;
    //updateScene();
    updateItems();
};
clearGame = function() {
    clearItems();
};
drawGame = function() {
    //drawScene();
    drawItems();
};
updateItems = function() {
    enemies.update();
};
drawItems = function() {
    enemies.draw();
};
clearItems = function() {
    enemies.clear();
};

/////////////////// Character
Character = function (x,y,speed) { 
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.xOrigine = x;
    this.yOrigine = y;
    //this.cpt = 0;
    this.exploding =  false;
};

Character.prototype.getSpeed = function(){
        return this.speed;
};
Character.prototype.setSpeed = function(tmp){
        this.speed =  tmp; 
};
Character.prototype.getX = function(){
        return this.x;
};
Character.prototype.setX = function(tmpX){
        this.x = tmpX;
};
Character.prototype.getY = function(){
        return this.y;
};
Character.prototype.setY = function(tmpY){
        this.y = tmpY;
};

Character.prototype.fires = function(){
    
};
Character.prototype.collides = function(){
    
};
Character.prototype.explodes = function(){
    this.exploding = true;
};
Character.prototype.draw = function(){
    this.animation.draw(this.x, this.y);            
};
Character.prototype.update = function(){
    this.animation.update();  
    this.x=this.x+this.speed;
};
Character.prototype.clear = function(){
    this.animation.clear(this.x, this.y);     
};

//////////////////////// Enemy 
Enemy = function(x,y,speed){
    Character.call(this,x,y,speed);
    this.color = "red";
    this.animation = new Animation("./assets/Enemy/eSpritesheet_40x30.png",6,40,30);
    this.explosion = new Animation("./assets/Explosion/explosionSpritesheet_128x1280.png",10,128,128);
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.getColor = function(){
            return this.color;
};


///////////////////////// Enemies
enemies = {
    init : function(){
        this.tabEnemies = new Array();
    },
    add : function (enemy) {
        this.tabEnemies.push(enemy);  
    },
    remove : function () {  
        this.tabEnemies.map(function(obj,index,array){
            if(obj.exists == false ||obj.x >ArenaWidth || obj.x<-50){
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
        if(tics % 100 == 1) {
            var rand = Math.floor(Math.random() * ArenaHeight);
            this.add(new Enemy(ArenaWidth, rand,-2));
        }
        this.tabEnemies.map(function(obj){
            obj.update();
        });
         this.remove();
    }
};

