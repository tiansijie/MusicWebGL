function Far() {
	var texture = PIXI.Texture.fromImage("./img/bg-far.png");
	PIXI.TilingSprite.call(this, texture, 512, 256);

	this.position.x = 0;
	this.position.y = 0;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewportX = 0;
	this.viewportY = 0;
};


Far.constructor = Far;
Far.prototype = Object.create(PIXI.TilingSprite.prototype);

Far.DELTA_X = 0.128;
Far.DELTA_Y = 0.128;

Far.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};


Far.prototype.setViewportY = function(newViewportY) {
	var distanceTravelled = newViewportY - this.viewportY;
	this.viewportY = newViewportY;
	this.tilePosition.y -= (distanceTravelled * Far.DELTA_Y);	
};
