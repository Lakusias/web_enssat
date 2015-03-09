

function PaillasseElem(id,style) {
 
   var canvas = document.getElementById('paillasse');
	var context = canvas.getContext('2d');
		
    this.id  = id;
    this.context = context;
    this.state = 'resting';
    this.dragable = true;

	var x = style.x,
		y = style.y,
		nom = style.nom,
		height = style.height,
		width = style.width; //closure
		
    var imageObj = new Image();
    imageObj.onload = function() {
        context.drawImage(imageObj, x, y,width,height);
    };
    imageObj.src = style.src;
	//récupération de tous les attribus
	this.imageObj = imageObj;
 	this.x = this.xOrig = style.x;
	this.y = this.yOrig = style.y;
	this.height = this.heightOrig = style.height;
	this.width =  this.widthOrig = style.width; 
	this.nom = this.nomOrig = style.nom;
	this.gros = false;				//l'objet est grossis
	this.parent = style.parent;		//l'objet à un objet parent
	this.son = style.son;			//l'objet à un objet fils
	this.ph = -1;					//ph affiché dans la textbox après étiquettage
	this.trueph = style.ph;			//vrai ph de l'objet
	this.visible = style.visible;	//inutile
	this.type="elem";				//l'objet est un élément ou pas
}

PaillasseElem.prototype.drawElement = function(){
	this.context.drawImage(this.imageObj, this.x, this.y,this.width,this.height);
	if (this.type === "elem" && this.ph>0 && this.id.substring(0,9)!=="etiquette")
						{     
							this.context.font = "15pt Arial";
							this.context.strokeStyle = "rgb(1,1,1)";
							this.context.fillStyle = "rgb(1,1,1)";
							this.context.fillText(""+this.ph, this.x+5, this.y-5);
						}
	//Modification pour permettre d'avoir plusieurs textbox affichée en même temps comme lors de l'affichage de l'étiquette
}


//getters/setters/reset
PaillasseElem.prototype.isDragable = function(){ 
	return this.dragable;
}



PaillasseElem.prototype.reset = function () {
	this.x = this.xOrig;
	this.y = this.yOrig;
};

PaillasseElem.prototype.setPosition = function (x,y) {
	this.x = x;
	this.y = y;
};

PaillasseElem.prototype.changeState = function (state) {
	this.state = state;
	console.log('state of element '+this.id+' is '+this.state);
};


