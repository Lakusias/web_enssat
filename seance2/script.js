var left = 0;
var stop = false;
var time = 0;
var lastFrame=0;
var shapes=[];
var fin=false;

//mise en place des listener
var bt = document.getElementById("start");
bt.addEventListener("click",start,false);	//lancement
bt = document.getElementById("stop");
bt.addEventListener("click",arret,false);	//arret

makesquare();
requestID = window.requestAnimationFrame(affichage);


function makesquare()
{
	//création des carré
	for(j = 1; j<=10; j++)
	{
		var str = '<div class="carrerouge" id="carre"'+j+'"></div>'; 
		var cr = document.createElement('div');	//on crée un div
		cr.setAttribute("id","carre"+j);		//on lui donne un identifiant
		cr.setAttribute("class","carrerouge");	//on lui attribue sa classe de style
		document.body.appendChild(cr);	//on l'ajoute dans le body
		shapes.push(cr);
	}
}


function affichage(timestamp)
{
	time++;
	if(!stop)
	{
		for(var j=1; j<=10; j++)
		{
			movecarre(j);	//création de 10 carré
		}
		if(document.getElementById('carre10').style.left = window.screen.availWidth-100)
		{
			//relancer à la fin
			inverse = true;
		}
	}
	requestID = window.requestAnimationFrame(affichage);
}

function movecarre(index)
{
	var carre = document.getElementById('carre'+index);	//on sélectionne le carré
	left = (carre.offsetLeft - carre.scrollLeft + carre.clientLeft);
	if(left< window.screen.availWidth-100 && !stop)
	{
		
		//console.log('carre  '+ index + ' position ' + left);
		left += 20/3*index;
		carre.style.left = left +"px"; //on met à jour la position du carré
	}
	if(left > window.screen.availWidth-100)
	{
		carre.style.left =  window.screen.availWidth-100 +"px";	//mettre tout les carré à la même place
	}
}

function start()
{
	stop =false;
}

function arret()
{
	stop= true;
}

function inverse()
{
	inverse = true;
}
