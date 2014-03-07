function Mid() {
	var texture = PIXI.Texture.fromImage("./img/bg-mid.png");
	PIXI.TilingSprite.call(this, texture, 512, 256);

	this.position.x = 0;
  	this.position.y = 128;
  	this.tilePosition.x = 0;
  	this.tilePosition.y = 0;

  	this.viewportX = 0;
  	this.viewportY = 0;
};


Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.TilingSprite.prototype);

Mid.DELTA_X = 0.64;
Mid.DELTA_Y = 0.64;

Mid.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
};

Mid.prototype.setViewportY = function(newViewportY) {
	var distanceTravelled = newViewportY - this.viewportY;
	this.viewportY = newViewportY;
	this.tilePosition.y -= (distanceTravelled * Mid.DELTA_Y);	
};
