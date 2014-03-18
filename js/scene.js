function Scene() {
	// create an new instance of a pixi stage
	this.stage = new PIXI.Stage(0x66FF99);

	// create a renderer instance.
	this.renderer = PIXI.autoDetectRenderer(512, 384, document.getElementById("game-canvas"));	

	//// add the renderer view element to the DOM
	//document.body.appendChild(renderer.view);	
	this.loadSpriteSheet();

}


Scene.prototype.animate = function() {

	this.scroller.moveViewportXBy(5);

    //reset Movement
    //keyMovement.x = keyMovement.y = 0;

    requestAnimFrame( this.animate.bind(this) );    
    
    // render the stage   
    this.renderer.render(this.stage);
}

Scene.prototype.loadSpriteSheet = function() {
	var assetsToLoad = ["./img/wall.json", "./img/bg-mid.png", "./img/bg-far.png"];
	loader = new PIXI.AssetLoader(assetsToLoad);
	loader.onComplete = this.spriteSheetLoaded.bind(this);
	loader.load();
};



Scene.prototype.spriteSheetLoaded = function() {
	this.scroller = new Scroller(this.stage);
	requestAnimFrame( this.animate.bind(this) );

	this.pool = new ObjectPool();
	this.wallSlices = [];
};


Scene.prototype.generateTestWallSpan = function() {
  var lookupTable = [
    this.pool.borrowFrontEdge,  // 1st slice
    this.pool.borrowWindow,     // 2nd slice
    this.pool.borrowDecoration, // 3rd slice
    this.pool.borrowStep,     	// 4th slice
    this.pool.borrowWindow,     // 5th slice
    this.pool.borrowBackEdge    // 6th slice
  ];


  var yPos = [
  	128,
  	128,
  	128,
  	192,
  	192,
  	192
  ];


  for (var i = 0; i < lookupTable.length; i++)
  {
    var func = lookupTable[i];

    var sprite = func.call(this.pool);
    sprite.position.x = 64 + (i * 64);
    sprite.position.y = yPos[i];

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }

};


Scene.prototype.clearTestWallSpan = function() {

  var lookupTable = [
   this.pool.returnFrontEdge,  // 1st slice
    this.pool.returnWindow,     // 2nd slice
    this.pool.returnDecoration, // 3rd slice
    this.pool.returnStep,       // 4th slice
    this.pool.returnWindow,     // 5th slice
    this.pool.returnBackEdge    // 6th slice
  ];

  for (var i = 0; i < lookupTable.length; i++)
  {
    var func = lookupTable[i];
    var sprite = this.wallSlices[i];

    this.stage.removeChild(sprite);
    func.call(this.pool, sprite);
  }

  this.wallSlices = [];
};
