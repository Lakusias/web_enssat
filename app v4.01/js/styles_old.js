
var bouteille_co2Style = {
  'src': './images/bouteille_co2.png',
  'nom': 'Bouteille de CO2',
  'y': 200,
  'x': 200, 
  'width' : 50,
  'height' : 90,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var lavageStyle = {
  'src': './images/lavage.png',
  'nom': 'Zone de lavage',
  'y': 460,
  'x': 200, 
  'width' : 90,
  'height' : 90
};

var tourieStyle = {
  'src': './images/tourie.png',
  'nom': 'Tourie contenant de l\'eau de mer',
  'y': 300,
  'x': 200, 
  'width' : 90,
  'height' : 90,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var sol_tamponStyle = {
  'src': './images/sol_tampon.png',
  'nom': 'Solution tampon',
  'y': 365,
  'x': 525, 
  'width' : 20,
  'height' : 20,
  'visible' : 1,
  'parent' : 0,
  'son' : 0,
  'ph'	: 7
};

var phmetreStyle = {
  'src': './images/phmetre.png',
  'nom': 'pHmètre',
  'y': 300,
  'x': 500, 
  'width' : 60,
  'height' : 90,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var pipette_pasteurStyle = {
  'src': './images/pipette_pasteur.png',
  'nom': 'Pipette pasteur',
  'y': 100,
  'x': 200, 
  'width' : 10,
  'height' : 70,
  'visible' : 1,
  'parent' : 0,
  'son' : 'pipette_verte'
};

var pipette_verteStyle = {
  'src': './images/pipette_verte.png',
  'nom': 'Pipette pasteur contenant des algues',
  'y': 300,
  'x': 100, 
  'width' : 30,
  'height' : 60,
  'visible' : 0,
  'parent' : 'pipette_pasteur',
  'son' : 0
};

var flaconStyle = {
  'src': './images/flacon.png',
  'nom': 'Flacon avec bouchon',
  'y': 100,
  'x': 100, 
  'width' : 25,
  'height' : 60,
  'visible' : 1,
  'parent' : 0,
  'son' : 'flacon_plein'
};

var flacon_pleinStyle = {
  'src': './images/flacon_plein.png',
  'nom': 'Flacon fermé rempli d\'eau de mer',
  'y': 200,
  'x': 300, 
  'width' : 25,
  'height' : 60,
  'visible' : 0,
  'parent' : 'flacon',
  'ph' : 8,
  'son' : 0
};

var secoueurStyle = {
  'src': './images/secoueur.png',
  'nom': 'Secoueur orbital',
  'y': 200,
  'x': 100, 
  'width' : 60,
  'height' : 90,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var becher_eau2Style = {
  'src': './images/becher_eau.png',
  'nom': 'Becher',
  'y': 200,
  'x': 400, 
  'width' : 60,
  'height' : 60,
  'visible' : 1,
  'parent' : 'becher2',
  'son' : 0,
  'ph' : 8
};

var becher_eau1Style = {
  'src': './images/becher_eau.png',
  'nom': 'Becher',
  'y': 200,
  'x': 350, 
  'width' : 60,
  'height' : 60,
  'visible' : 1,
  'parent' : 'becher1',
  'son' : 0,
  'ph' : 8
};

var becher2Style = {
  'src': './images/becher.png',
  'nom': 'Becher',
  'y': 200,
  'x': 350, 
  'width' : 40,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son' : 0,
  'ph' : 6
};

var becher1Style = {
  'src': './images/becher.png',
  'nom': 'Becher',
  'y': 200,
  'x': 400, 
  'width' : 40,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son' : 0,
  'ph' : 6
};

var alguesStyle = {
  'src': './images/algues.png',
  'nom': 'Becher contenant des algues',
  'y': 100,
  'x': 400, 
  'width' : 60,
  'height' : 60,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var bunsenStyle = {
  'src': './images/bunsen.png',
  'nom': 'Bec bunsen',
  'y': 10,
  'x': 100, 
  'width' : 40,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var echantillonStyle = {
  'src': './images/echantillon.png',
  'nom': 'Echantillon',
  'y': 10,
  'x': 200, 
  'width' : 40,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var echantillon_vertStyle = {
  'src': './images/algues.png',
  'nom': 'Echantillon avec des algues',
  'y': 10,
  'x': 200, 
  'width' : 40,
  'height' : 50,
  'visible' : 1,
  'parent' : 'echantillon',
  'son' : 0,
  'ph'	: 10
};

var microscopeStyle = {
  'src': './images/microscope.png',
  'nom': 'Microscope',
  'y': 10,
  'x': 300, 
  'width' : 80,
  'height' : 100,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var petriStyle = {
  'src': './images/petri.png',
  'nom': 'Petri',
  'y': 10,
  'x': 400, 
  'width' : 50,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son' : 0
};

var etiquetteph6Style = {
	'src': './images/turbulent.png',
  'nom': 'etiquette ph 6',
  'y': 300,
  'x': 400, 
  'width' : 50,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son': 0
}

var etiquetteph10Style = {
	'src': './images/turbulent.png',
  'nom': 'etiquette ph 10',
  'y': 300,
  'x': 300, 
  'width' : 50,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son': 0
}

var etiquetteph7Style = {
	'src': './images/turbulent.png',
  'nom': 'etiquette ph 7',
  'y': 380,
  'x': 300, 
  'width' : 50,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son': 0
}

var etiquetteph8Style = {
  'src': './images/turbulent.png',
  'nom': 'etiquette ph 8',
  'y': 380,
  'x': 400, 
  'width' : 50,
  'height' : 50,
  'visible' : 1,
  'parent' : 0,
  'son': 0
}
