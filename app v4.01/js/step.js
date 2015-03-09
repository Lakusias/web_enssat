function Step(instruction, hint, action){
	this.instruction = instruction;
	this.hint = hint;
	this.action = action;
	
}

Step.prototype.createDomElement = function(){
			var tempElem = document.createElement('li');
			tempElem.innerHTML = this.instruction;
			tempElem.setAttribute('class','toBeDone');
			this.domElement = tempElem;
			return tempElem;
}

Step.prototype.setActive = function(){
	this.domElement.setAttribute('class','active');
}


Step.prototype.setDone = function(){
	this.domElement.setAttribute('class','done');
}
