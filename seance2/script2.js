//drawImage(coin,0,0);
var stop = false;
var posx = 0;
var bt = document.getElementById("start");
bt.addEventListener("click",start,false);	//lancement
bt = document.getElementById("stop");
bt.addEventListener("click",arret,false);	//arret

requestID = window.requestAnimationFrame(draw);

function draw()
{
	if(!stop)
	{
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
		var img = new Image();
		img.onload = function(){
			ctx.drawImage(img,posx,0,100,100,0,0,50,50);
		};
		posx += 100;
		if(posx >= 1000)
		{
			posx=0;
		}
		img.src = 'images/coin-sprite-animation.png';
	}
	requestID = window.requestAnimationFrame(draw);
}

function start()
{
	stop =false;
}

function arret()
{
	stop= true;
}

