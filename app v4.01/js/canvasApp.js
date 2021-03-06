
function canvasApp() {

	if (!Modernizr.canvas) {
		return;
	}
	
	var theCanvas = document.getElementById("paillasse");
	var context = theCanvas.getContext("2d");
	
	init();
	var shapes;

	var dragIndex=0; //Pour éviter les shapes[dragIndex] undefined
	var dragging;
	var mouseX;
	var mouseY;
	var dragHoldX;
	var dragHoldY;
	
	var steps;
	var scenario;
	
	var microActive = 0;
	var sousMicro = "";
	
	// Fonction d'initialisation du canvas
	function init() {
		shapes = [];
		scenario = new Scenario(scenarios[currentScen]);
		
		makeShapes(this.currentScen);
		initEtiquette();	
		
		drawScreen(true);
		
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
		theCanvas.addEventListener("mousemove", mouseMoveListener, false);
	}
	
	//quand on clic sur le canvas
	function mouseDownListener(evt) {
		if(microActive == 1)
		{
			microActive = 0;
			drawScreen(true);
		}
		else
		{
			drawScreen(false);
		}
	
		console.log("mouseDown");
		var i;
		//We are going to pay attention to the layering order of the objects so that if a mouse down occurs over more than object,
		//only the topmost one will be dragged.
		var highestIndex = -1;
		
		//getting mouse position correctly, being mindful of resizing that may have occured in the browser:
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
				
		//find which shape was clicked
		for (i=0; i < shapes.length; i++) {
			if	(shapes[i].isDragable() && hitTest(shapes[i], mouseX, mouseY)) {
				dragging = true;
				if (i > highestIndex) {
					//We will pay attention to the point on the object where the mouse is "holding" the object:
					dragHoldX = mouseX - shapes[i].x;
					dragHoldY = mouseY - shapes[i].y;
					highestIndex = i;
					dragIndex = i;
					shapes[i].changeState('mouseDown'); 
				}
			}
		}
		theCanvas.removeEventListener("mousedown", mouseDownListener, false);
		window.addEventListener("mouseup", mouseUpListener, false);
		
		//réinitialise la position des objets non cliqués.
		for (i=0; i < shapes.length; i++){
			if(i!=dragIndex){
				shapes[i].reset();
			}
		}
		drawScreen();
		shapes[dragIndex].drawElement(); //Redessine l'élément qui a été draggé en dernier
		
		//code below prevents the mouse down from having an effect on the main browser window:
		if (evt.preventDefault) {
			evt.preventDefault();
		} //standard
		else if (evt.returnValue) {
			evt.returnValue = false;
		} //older IE
		return false;
	}
	
	
	//fin du clic
	function mouseUpListener(evt) {
		
		theCanvas.addEventListener("mousedown", mouseDownListener, false);
		window.removeEventListener("mouseup", mouseUpListener, false);
		if (dragging) {
			var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
		for (i=0; i < shapes.length; i++) {
			if	(dragIndex!== i && hitTest(shapes[i], mouseX, mouseY)) {
					var message = shapes[dragIndex].id+" on "+shapes[i].id;
					console.log(message);
					scenario.signal(message);	//envoi d'un signal pour savoir si on a rempli la step du scénario en cours
					Animation(i);	//lancer une animation si un élément est posé sur un autre
			}
		}
		
			shapes[dragIndex].changeState('mouseUp');
			shapes[dragIndex].drawElement(); 
			dragging = false;
		}
	}
	
	//déplacement de la souris
	function mouseMoveListener(evt) {
		
		//getting mouse position correctly 
		var bRect = theCanvas.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(theCanvas.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(theCanvas.height/bRect.height);
		
		//remettre les éléments à leur taille initiale
		degrossis();
		
		//supprimer la textbox si elle est affichée
		var element = document.getElementById("txtbox");
		if(element!=null){
			element.parentNode.removeChild(element);
		}
		
		if (dragging) {
			var posX;
			var posY;
			var shapeX = shapes[dragIndex].width;
			var shapeY = shapes[dragIndex].height;
			var minX = 0;
			var maxX = theCanvas.width - shapeX;
			var minY = 0;
			var maxY = theCanvas.height - shapeY;
			
			//clamp x and y positions to prevent object from dragging outside of canvas
			posX = mouseX - dragHoldX;
			posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
			posY = mouseY - dragHoldY;
			posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
			//faire bouger l'objet en même temps que la souris
			shapes[dragIndex].setPosition(posX,posY);
			
			for (i=0; i < shapes.length; i++) {
				if	(i!==dragIndex && hitTest(shapes[i], mouseX, mouseY)) {
					console.log("hovering "+shapes[i].id);
					//faire grossir l'élément en dessous de celui déplacé
					grossis(i);
				}
			}
			//redissiner l'écran en prennant en compte les changements
			drawScreen(false);
			//on redessine l'élément qui est déplacé afin de s'assurer qu'il soit affiché au dessus des autres
			shapes[dragIndex].drawElement();
		}else{
			//vérifier si le microscope est actif
			if(!microActive)
			{
				drawScreen(false);	//non, on redessines l'écran
			}
			//regarder si la souris passe sur un objet
			for (i=0; i < shapes.length; i++) {
				if	(hitTest(shapes[i], mouseX, mouseY)) {
					//on affiche la textbox et on le grossis
					var txtToTprint = shapes[i].nom;
					grossis(i);
					if(txtToTprint){
						shapes[dragIndex].drawElement();
						var canvas = document.getElementById('paillasse');
						if (canvas.getContext)
						{    
							var boxsize = txtToTprint.length*13;
							var ctx = canvas.getContext('2d'); 
							ctx.font = "15pt Arial";
							ctx.strokeStyle = "rgb(250,250,250)";
							ctx.fillStyle = "rgb(250,250,250)";
					 		ctx.beginPath();
						 	  
						 	ctx.moveTo(mouseX, mouseY+5);
							ctx.lineTo(mouseX + boxsize, mouseY+5);
							ctx.lineTo(mouseX + boxsize, mouseY-20);
							ctx.lineTo(mouseX , mouseY-20);
							ctx.lineTo(mouseX , mouseY+5);
							ctx.fill();
							ctx.strokeStyle = "rgb(1,1,1)";
							ctx.fillStyle = "rgb(1,1,1)";
							ctx.fillText(txtToTprint, mouseX+5, mouseY-5);
						} 
					}
				}
			}
		}
	}
		
	//fonction qui regarde si l'objet et les coordonnées fournies sont en contact
	function hitTest(shape,mx,my) {		
		return ( mx > shape.x && mx < shape.x + shape.width && my > shape.y && my < shape.y + shape.height);	
	}
	
	//créer les éléments et les zones dans le canvas
	function makeShapes(){
		var paillasseElements = elements;
		for(var i = 0, l = paillasseElements.length; i < l; ++i){
			var paillasseElem = paillasseElements[i];
			var tempShape = new PaillasseElem(paillasseElem,eval(paillasseElem+'Style'));  
			shapes.push(tempShape);
		}
		
		var paillasseZones = zones;
		for(var i = 0, l = paillasseZones.length; i < l; ++i){
			var paillasseZone = paillasseZones[i];
			var tempShape = new PaillasseZone(paillasseZone,eval(paillasseZone+'Style'));  
			shapes.push(tempShape);
		}
	}

	//dessiner tous les éléments
	function drawShapes() {
		var i;
		for (i=0,l = shapes.length;i<l; i++) {
			(shapes[i]).drawElement();
		}
	}
	
	
	//fonction qui s'occupe de dessiner le fond ainsi que les éléments (fonction ci-dessus)
	//il vérifie aussi grâce au paramètre qu'il ne faut pas charger l'image de fond sauf dans 
	//le cas ou il y a l'initialisation du canvas
	function drawScreen(initial) {
		var backgroundImage = new Image(); 
		backgroundImage.src = 'images/labo.jpg';
		if(initial){	//charger l'image puis la dessiner
			backgroundImage.onload=function(){
				context.drawImage(backgroundImage, 0, 0);
				drawShapes();	
			}
		}
		else
		{	
			context.drawImage(backgroundImage, 0, 0);
		}
		// si le microscope est actif, le dessiner
		if(microActive == 1){
			zone_microscope();
		}
		drawShapes();
	
	}
	
	//fonction qui gère toutes animations des objets en appelant des sous-fonctions qui permettent
	//1- de fusionner
	//2- de faire disparaître
	//3- de faire apparaître
	//4- de modifier (image, ph etc...)
	function Animation(i){
		if(shapes[i].id==="lavage"){
			lavage(dragIndex);
		}
		else if(shapes[dragIndex].id.substring(0,9)==="etiquette"){
			//Si l'élément déposé est une étiquette, on change le pH a afficher.
			changePh(i);
			shapes[dragIndex].reset();		
		}
		else if(shapes[dragIndex].id=="phmetre"){
			console.log(shapes[i].trueph);
			if(shapes[i].type === "elem" && shapes[i].id.substring(0,9)!=="etiquette" && shapes[i].trueph>=0){
			//Si le phmetre est déposé sur un élément qui n'est pas une étiquette,
				alert("pH de l'élément : "+shapes[i].trueph);
				console.log(shapes[i].nom +" de pH "+shapes[i].trueph);
				console.log(shapes[i].nom.substring(shapes[i].nom.length-1,shapes[i].nom.length));
				if(shapes[i].nom.substring(shapes[i].nom.length-1,shapes[i].nom.length)!==(""+shapes[i].trueph)){
					changeNom(i,shapes[i].nom + " de pH " + shapes[i].trueph);
				}
				shapes[dragIndex].reset();
			}
			else{
			//Sinon, le dépôt n'est pas valide.
				shapes[dragIndex].reset();
			}
		}
		else if(shapes[i].id === "microscope"){
			sousMicro = shapes[dragIndex].id;
			microActive = 1;
			drawScreen(false);
		}
		else if(shapes[dragIndex].id==="becher1" && shapes[i].id==="petri"){
			//animation de changement d'image.
			changeImage(dragIndex, "bunsen");
		}
		else if (shapes[dragIndex].id==="becher1" && shapes[i].id==="echantillon"){
			//animation d'ajout d'objet.
			ajoute("becher1",becher1Style);
		}
		else if(shapes[dragIndex].id==="flacon" && shapes[i].id==="tourie"){
			ajouteAndSet("flacon_plein",flacon_pleinStyle, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else if(shapes[dragIndex].id==="becher1" && shapes[i].id==="tourie"){
			ajouteAndSet("becher_eau1",becher_eau1Style, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else if(shapes[dragIndex].id==="becher2" && shapes[i].id==="tourie"){
			ajouteAndSet("becher_eau2",becher_eau2Style, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else if(shapes[dragIndex].id==="pipette_pasteur" && shapes[i].id==="algues"){
			ajouteAndSet("pipette_verte",pipette_verteStyle, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else if(shapes[dragIndex].id==="pipette_verte1" && shapes[i].id==="becher1"){
			ajouteAndSet("algues1",algues1Style, shapes[dragIndex].x, shapes[dragIndex].y);
			lavage(dragIndex);
			supprime(i);
		}
		else if(shapes[dragIndex].id==="pipette1" && shapes[i].id==="algues"){
			ajouteAndSet("pipette_verte1",pipette_verte1Style, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else if(shapes[dragIndex].id==="pipette2" && shapes[i].id==="algues"){
			ajouteAndSet("pipette_verte2",pipette_verte2Style, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else if(shapes[dragIndex].id==="pipette3" && shapes[i].id==="algues"){
			ajouteAndSet("pipette_verte3",pipette_verte3Style, shapes[dragIndex].x, shapes[dragIndex].y);
			supprime(dragIndex);
		}
		else
		{
		
		}
		/*else if(shapes[dragIndex].id==="becher" && shapes[i].id==="petri"){
			//animation de changement d'image.
			changeImage(dragIndex, "bunsen");
		}
		else if (shapes[dragIndex].id==="becher" && shapes[i].id==="echantillon"){
			//animation d'ajout d'objet.
			ajoute("becher",becherStyle);
		}
		else if (shapes[dragIndex].id === "echantillon" && shapes[i].id === "microscope"){
			fusion(dragIndex,i,"becher",becherStyle);
		}
		else{
			//animation de base : décalage d'un des objets vers le bas.			
			shapes[dragIndex].setPosition(shapes[i].x,shapes[i].y);
			shapes[i].y += shapes[dragIndex].height;
		}*/
		drawScreen();
	}
	
	//suppression d'un élément du tableau de shapes
	function supprime(i){
		shapes.splice(i,1);
	}
	
	//changement de l'image de l'élément du tableau dont l'indice est passé en paramètre
	function changeImage(i, source){
		var image = new Image();
    	image.onload = function() {
   		context.drawImage(image, shapes[i].x, shapes[i].y,50,50);
    	};
    	image.src = "./images/" + source + ".png";
    	shapes[dragIndex].imageObj = image;
	}
	
	//ajout d'un élément OBSOLETE
	function ajoute(id,style){
		//scenarios[currentScen].elements.push(id);
		var tempShape = new PaillasseElem(id,style);
		shapes.push(tempShape); //ajout de l'élément dans le tableau
	}
	
	//ajout d'un élément + positionnement
	function ajouteAndSet(id,style, x, y){
		//création d'un élément temporaire dont on initialise les coordonnées
		var tempShape = new PaillasseElem(id,style);
		tempShape.setPosition(x,y);
		tempShape.imageObj.onload = function() {
			context.drawImage(tempShape.imageObj, 
				tempShape.x, 
				tempShape.y,
				tempShape.width,
				tempShape.height);
		};
		shapes.push(tempShape);
	}
	
	
	//fusion de deux éléments, consiste à ajouter un éléméent et à supprimer les deux autres
	function fusion(obj1,obj2, id,style){
		ajoute(id,style);
		supprime(obj1);
		supprime(obj2);
	}
	
	//créer une zone de microscope
	function zone_microscope(){
		//dessin de la zone de microscope
		var sizeX = 1030;
		var microSizeX = 250;
		var microSizeY = 250;
		
		var canvas = document.getElementById('paillasse');
		var ctx = canvas.getContext('2d');
		
		//chargement de l'image à afficher
		var microImage = new Image(); 
		
		microImage.src = 'images/micro_'+ sousMicro+'.jpg'; 
		
		//cette fonction a pour but de créer un masque rond que l'on applique à l'image en le positionnement
		microImage.onload=function(){
			//dessin du premier rond qui sert de masque
			ctx.save();
			ctx.beginPath();
			ctx.arc(sizeX - (microSizeX/2), (microSizeX/2), (microSizeY/2), 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.clip();
			//dessin de l'image
			ctx.drawImage(microImage, sizeX-microSizeX, 0, microSizeX, microSizeY);
			
			//dessin du deuxième rond
		    ctx.beginPath();
			ctx.arc(0, 0, 25, 0, Math.PI * 2, true);
			ctx.clip();
			ctx.closePath();
			ctx.restore();
		};
		
		
		if (canvas.getContext)
		{
			//dessin du carré de fond
			var ctx = canvas.getContext('2d'); 
			
			ctx.strokeStyle = "rgb(0,0,0)";
			ctx.fillStyle = "rgb(0,0,0)";
	 		ctx.beginPath();
		 	  
		 	ctx.moveTo(sizeX, 0);
			ctx.lineTo(sizeX, microSizeY);
			ctx.lineTo(sizeX - microSizeX, microSizeY);
			ctx.lineTo(sizeX - microSizeX, 0);
			ctx.lineTo(sizeX, 0);
			ctx.fill();
			
		}
	}
	
	//effectue le lavage, consiste à réinitialiser l'objet ou appeler son parent s'il en a un
	function lavage(i){
		console.log(shapes[i].id);
		if(shapes[i].parent == 0){
			//recréer l'élément
			ajoute(shapes[i].id, eval(shapes[i].id+"Style"));
		}
		else {
			//mettre son parent
			ajoute(shapes[i].parent, eval(shapes[i].parent+"Style"));
		}
		//suppression de l'élément
		supprime(i);
	}
	
	//fonction de grossissement des éléments, positionne aussi un booléen pour permettre de le dégrossir
	function grossis(i){
		if(shapes[i].gros===false){
			shapes[i].height += 10;
			shapes[i].width += 10;
			drawScreen();
			shapes[i].gros=true;
		}
	}
	
	//fonction de dégrossissement qui regarde quel élément est grossis et modifie son style grâce
	//aux valeurs d'origine précisée dans le style des éléments
	function degrossis() {
		var i;
		for(i=0; i<shapes.length; i++){
			if(shapes[i].gros === true){
				shapes[i].height = shapes[i].heightOrig;
				shapes[i].width =  shapes[i].widthOrig;
				shapes[i].gros = false;
			}
		}
	}
	
	//modifie le nom d'un élément
	function changeNom(i,nom){
		shapes[i].nom=nom;
	}
	
	
	//initialise le pH des étiquettes à partir de leur nom
	function initEtiquette(){
		for(i=0;i<shapes.length;i++){
			if(shapes[i].id.substring(0,9)==="etiquette"){
				shapes[i].ph=shapes[i].id.substring(11,13);
			}
		}
	}
	
	//fonction qui modifie le ph d'un élément
	function changePh(i){
		if(shapes[i].type === "elem" && shapes[i].id.substring(0,9)!=="etiquette"){
				//on vérifie que l'objet est un élément et que ce n'est pas une étiquette
				shapes[i].ph=shapes[dragIndex].ph;
				shapes[dragIndex].reset();
			}
			if(shapes[i].type === "elem" && shapes[i].ph==shapes[i].trueph){
				//si l'étiquette du ph affiché est le même que le vrai ph de l'objet
				console.log("Alerte !");
				alert("Bien joué !");
			}
	}
}
