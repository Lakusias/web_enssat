var step0 = new Step('fin','fin','becher on bunsen');

///Final steps

//Etapes d'initialisation
var stepI1 = new Step('Laver le becher avec la zone de lavage', 'Laver le becher avec la zone de lavage', 'becher1 on lavage');
var stepI2 = new Step('Laver l\'echantillon avec la zone de lavage','Laver l\'echantillon avec la zone de lavage','echantillon on lavage');
var stepI3 = new Step('Laver la boite de petri avec la zone de lavage','Laver la boite de petri avec la zone de lavage','petri on lavage');


var step1 = new Step('Placer le bécher sur le secoueur orbital','Placer le bécher sur le secoueur orbital','becher1 on secoueur');
var step2 = new Step('Placer l\'échantillon sur le microscope','Placer l\'échantillon sur le microscope','echantillon on microscope');
var step3 = new Step('Remplissez le becher avec de l\'eau', 'Remplissez le becher avec de l\'eau','becher1 on tourie');
var step4 = new Step('Vérifier le ph avec la sonde','Vérifier le ph avec la sonde','phmetre on becher_eau1');
var step5 = new Step('Placer l\'étiquette du pH correspondant sur le becher d\'eau','Placer l\'étiquette du pH correspondant sur le becher d\'eau','etiquetteph8 on becher_eau1');
var step6 = new Step('Déposer le bécher plein sur la bouteille de CO2','Cliquer sur la bouteille de CO2','becher_eau1 on bouteille_co2');
var step7 = new Step('Laver le bécher rempli d\'eau','Laver le bécher rempli d\'eau','becher_eau1 on lavage');
var step8 = new Step('Prélever le bécher d\'algues avec la pipette','Prélever le bécher d\'algues avec la pipette','pipette1 on algues');
var step9 = new Step('Mettre le contenu de la pipette dans le bécher','Mettre le contenu de la pipette dans le bécher','pipette_verte1 on becher1');
var step10 = new Step('Vérifier le ph avec la sonde','Vérifier le ph avec la sonde','phmetre on algues1');
var step11 = new Step('Placer l\'étiquette du pH correspondant sur le becher','Placer l\'étiquette du pH correspondant sur le becher','etiquetteph10 on algues1');
var step12 = new Step('Laver le bécher','Laver le bécher','algues1 on lavage');

//les éléments zones ainsi que le glossaires on été mis indépendamment des scénarios
//elements + zones + glosary
var elements = ['becher1','echantillon','petri','pipette1','flacon','phmetre','etiquetteph6','etiquetteph7','etiquetteph10','etiquetteph8'];
var zones = ['microscope','bunsen','lavage','secoueur','bouteille_co2','tourie','algues','sol_tampon'];
	
var glosary = '<h3>Section Glossaire :</h3>\
				<ul><li><h4><u>Agitateur magnétique</u></h4> Une fois allumé, l\'agitateur va entraîner le barreau magnétique (placé dans la solution) dans un mouvement rotatif qui va mélanger la solution</li>\
				<li><h4>Barreau magnétique</h4>Un agitateur est un élément d\'une unité de procédé ayant pour but d\'assurer l\'homogénéisation d\'un milieu (homogénéisation du point de vue des composants du milieu et/ou de la température).</li>\
				<li><h4>Bouteille de CO2</h4>Bouteille contenant du CO2.</li>\
				</ul>';

var scenario1 = {
	num : 1,
	aim : 'Section Objectif <h2>Lavage</h2>',
	elements: ['becher2','echantillon','petri'],
	zones: ['microscope','bunsen'],
	steps: [stepI1,stepI2,stepI3], //procedure	
};

var scenario2 = {
	num : 2,
	aim : 'Section Objectif <h2>Expérimentation</h2>',
	elements: ['becher2','echantillon'],
	zones: ['bunsen'],
	steps: [step1,step2,step3,step4] //procedure
	
};

var scenario3 = {
	num : 3,	//c'est le dernier
	aim : 'Section Objectif <h2>Expérimentation</h2>',
	elements: ['becher2','echantillon'],
	zones: ['bunsen'],
	steps: [step5,step6,step7,step8,step9,step10,step11,step12] //procedure
	
};

var scenario0 = {
	num : 0,	//c'est le dernier
	aim : 'Section Objectif <h2>Expérimentation</h2>',
	elements: ['becher2','echantillon'],
	zones: ['bunsen'],
	steps: [step0] //procedure
};


//tableau contenant tout les scénarios
var scenarios = [scenario1,scenario2,scenario3,scenario0];

