var canvas = document.getElementById("canvas");
var stop = false;
var bt = document.getElementById("start");
var posx = 0;
var posy = 0;
var speed = 150;



var playerPosX = 0;
var playerPosY = 0;

requestID = window.requestAnimationFrame(draw);
document.getElementById("canvas").addEventListener("mousedown", doMouseDown,false);

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Should do nothing if the key event was already consumed.
  }
	console.log(event.key);
  switch (event.key) {
    case "Down":
      // Do something for "down arrow" key press.
//          alert("ArrowDown");
		posy = 256;
      break;
    case "Up":
      // Do something for "up arrow" key press.
      	posy = 384;
      break;
    case "Left":
      // Do something for "left arrow" key press.
      	posy = 0;
      break;
    case "Right":
      // Do something for "right arrow" key press.
      	posy = 128;
      break;
    case "Enter":
      // Do something for "enter" or "return" key press.
      	stop = false;
      break;
    case "Esc":
      // Do something for "esc" key press.
      	if(!stop) stop = true;
      	else stop =false;
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Consume the event for suppressing "double action".
  event.preventDefault();
}, true);



bt.addEventListener("click",start,false);	//lancement
bt = document.getElementById("stop");
bt.addEventListener("click",arret,false);	//arret

function draw()
{
	if(!stop)
	{
		var ctx = document.getElementById('canvas').getContext('2d');
		ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
		var img = new Image();
		img.src = 'sprite.png';
		img.onload = function(){
			ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
			switch(posy)
			{
				case 256:
					if(playerPosY < canvas.height - 138) playerPosY += 20;
					break;
				case 384:
					if(playerPosY > 20) playerPosY -= 20;
					break;
				case 0:
					if(playerPosX > 20) playerPosX -= 20;
					break;
				case 128:
					if(playerPosX < canvas.width-128) playerPosX += 20;
					break;
				default:
					console.log('bug spotted');
			}
			ctx.drawImage(img,posx,posy,128,128,playerPosX,playerPosY,128,128);
		};
		posx += 128;
		if(posx == 512)
		{
			posx=0;
		}
	}
	//requestID = window.requestAnimationFrame(draw);
	setTimeout(function(){window.requestAnimationFrame(draw)},speed);
}

function doMouseDown(event){
    alert("X="+event.clientX);
}


function start()
{
	stop =false;
}

function arret()
{
	stop= true;
}
