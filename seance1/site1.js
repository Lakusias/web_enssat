//const
var longueur = 500;
var nbcarre = 10;
var t = 0;
var const_time = 10;

var timer = setInterval(write,const_time); //initialisation de l'intervalle
var i = longueur;
var j;

//création des carré
for(j = 1; j<=nbcarre; j++)
{
	var str = '<div class="carrerouge" id="carre"'+j+'"></div>'; 
	var cr = document.createElement('div');
	cr.setAttribute("id","carre"+j);
	cr.setAttribute("class","carrerouge");
	document.body.appendChild(cr);
}

j=1;

function write(){
	t++;
	var cpt = document.getElementById('compteur');
	cpt.innerHTML = parseInt(t/100);
	if(t>4000/const_time)
	{
		
		var carre = document.getElementById('carre'+j);
		var pos = (longueur-i);
		carre.style.left = pos +"px";
	
		i--;
		if (i < longueur-j*30)
		{
			j++;
			i = longueur;
		}
		if(j > nbcarre && j>0)
		{
			clearInterval(timer);

		}
	}
}



		/*j--;
		var carre = document.getElementById('carre'+j);
		var pos = (longueur-i);
		carre.style.top += 5 +"px";
		*/
