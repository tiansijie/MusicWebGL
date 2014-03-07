document.onkeypress = keyPress;
var keyMovement = {x:0, y:0};

var moveValue = 2;

function keyPress(e){
	if(window.event){ // IE                 
		keynum = e.keyCode;
	}else if(e.which){ // Netscape/Firefox/Opera                  
		keynum = e.which;
	}


	console.log("keynum is " + keynum);

	if(keynum == 119 || keynum == 32)//w
	{
		keyMovement.y = moveValue;
	}
	else if(keynum == 115)//s
	{
		keyMovement.y = -moveValue;      
	}
	else if(keynum == 97)//a
	{
		keyMovement.x = -moveValue;
	}
	else if(keynum == 100)//d
	{
		keyMovement.x = moveValue;
	}
}

