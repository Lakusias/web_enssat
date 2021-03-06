//variable globale pour connaitre le scénario actuel et l'étape actuelle du scénario
var currentScen = 0;
var currentStep = 0;

function Scenario(scenario)
{
	this.loadScenario(currentScen);
}

Scenario.prototype.signal =function(message){
		var step = this.steps[currentStep];
		console.log(message+' to be compared to '+step.action);
		if(step.action == message){
			//on passe à l'étape suivante
			this.steps[currentStep].setDone();
			currentStep++;
			if(currentStep==this.steps.length) 
			{
				//fin du scénario, on charge le suivant
				currentStep = 0;
				currentScen++;
				this.loadScenario();
			}
			else	this.steps[currentStep].setActive();
			console.log(currentStep + "===" + this.steps.length);
		}	
	
}
	
Scenario.prototype.loadScenario = function(){
	this.steps = scenarios[currentScen].steps;
	
	var olElement = document.createElement('ol');
	
	
	for(var i = 0, l = this.steps.length; i < l; ++i){
		var step = this.steps[i];
		var tempElem = step.createDomElement();
		olElement.appendChild(tempElem);
	}
	var instructionsElement = document.getElementById("contenu_onglet_instructions");
	instructionsElement.appendChild(olElement);
	this.steps[currentStep].setActive();
	//chargement du glossaire et des objectifs du scénario
	document.getElementById("contenu_onglet_glossaire").innerHTML=glosary;
	document.getElementById("contenu_onglet_objectif").innerHTML=scenarios[currentScen].aim;
}
