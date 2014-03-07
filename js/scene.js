var stage;
var renderer;
var bunny;
var far;
var mid;


var scroller;

function init() {
	// create an new instance of a pixi stage
	stage = new PIXI.Stage(0x66FF99);

	// create a renderer instance.
	renderer = PIXI.autoDetectRenderer(512, 384, document.getElementById("game-canvas"));	

	//// add the renderer view element to the DOM
	//document.body.appendChild(renderer.view);	

	scroller = new Scroller(stage);
	scroller.setViewportX(0);

	requestAnimFrame( animate );
}


function animate() {

	scroller.moveViewportXBy(5);

    //reset Movement
    keyMovement.x = keyMovement.y = 0;


    requestAnimFrame( animate );

    
    
    // just for fun, lets rotate mr rabbit a little
    //bunny.rotation += 0.1;

    // render the stage   
    renderer.render(stage);
}