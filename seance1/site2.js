//const
var longueur = 500;
var nbcarre = 10;
var timer = setInterval(write,10);
var i = longueur;
var j = 1;


function write(){
	var cpt = document.getElementById('compteur');
	cpt.innerHTML = j;
	
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
		/*j--;
		var carre = document.getElementById('carre'+j);
		var pos = (longueur-i);
		carre.style.top += 5 +"px";
		*/
	}
}
