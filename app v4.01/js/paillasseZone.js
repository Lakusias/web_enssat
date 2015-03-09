

function PaillasseZone(id,style) {
 
   var canvas = document.getElementById('paillasse');
	var context = canvas.getContext('2d');
		
    this.id  = id;
    this.context = context;
    this.dragable = false;

	var x = style.x,
		y = style.y,
		height = style.height,
		width = style.width; //closure
		
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y,width,height);
    };
    imageObj.src = style.src;
	
	this.imageObj = imageObj;
 	this.x = this.xOrig = style.x;
	this.y = this.yOrig = style.y;
	this.height = this.heightOrig = style.height;
	this.width =  this.widthOrig = style.width; 
	this.nom = style.nom;
	this.parent = style.parent;		//l'objet à un objet parent
	this.visible = style.visible;	//inutile
	this.gros = false;				//l'objet est grossis
	this.son = style.son;			//l'objet à un objet fils
}

PaillasseZone.prototype.drawElement = function(){
	this.context.drawImage(this.imageObj, this.x, this.y,this.width,this.height);
}

PaillasseZone.prototype.reset = function () {
	this.x = this.xOrig;
	this.y = this.yOrig;
};

PaillasseZone.prototype.changeState = function (state) {
	this.state = state;
	console.log('state of element '+this.id+' is '+this.state);
};



PaillasseZone.prototype.isDragable = function(){ 
	return this.dragable;
}

