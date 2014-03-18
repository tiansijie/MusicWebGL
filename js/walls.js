function Walls() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new ObjectPool();

	this.createLookupTables();

	this.slices = [];
	//this.createTestMap();

	this.viewportX = 0;
  	this.viewportSliceX = 0;
};


Walls.constructor = Walls;
Walls.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Walls.VIEWPORT_WIDTH = 512;
Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH/WallSlice.WIDTH) + 1;


Walls.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);
	
	var prevViewportSliceX = this.viewportSliceX;
	this.viewportSliceX = Math.floor(this.viewportX/WallSlice.WIDTH);

	this.removeOldSlices(prevViewportSliceX);
	this.addNewSlices();
};


Walls.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.slices.length - Walls.VIEWPORT_NUM_SLICES) * 
	                 WallSlice.WIDTH;
	if (viewportX < 0)
	{
		viewportX = 0;
	}
	else if (viewportX > maxViewportX)
	{
		viewportX = maxViewportX;
	}

	return viewportX;
};




Walls.prototype.createLookupTables = function() {
	
	this.borrowObjectSpriteLookup = [];
	this.borrowObjectSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
	this.borrowObjectSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
	this.borrowObjectSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
	this.borrowObjectSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
	this.borrowObjectSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

	this.returnObjectSpriteLookup = [];
	this.returnObjectSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
	this.returnObjectSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
	this.returnObjectSpriteLookup[SliceType.STEP] = this.pool.returnStep;
	this.returnObjectSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
	this.returnObjectSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;

};


Walls.prototype.borrowObjectSprite = function(sliceType){
	return this.borrowObjectSpriteLookup[sliceType].call(this.pool);
};


Walls.prototype.returnObjectSprite = function(sliceType, sliceSprite) {
	return this.returnObjectSpriteLookup[sliceType].call(this.pool, sliceSprite);
};
 

Walls.prototype.addSlice = function(sliceType, y){
	var slice = new WallSlice(sliceType, y);
	this.slices.push(slice);
};




Walls.prototype.removeOldSlices = function(prevViewportSliceX) {
	var numOldSlices = this.viewportSliceX - prevViewportSliceX;
	
	if (numOldSlices > Walls.VIEWPORT_NUM_SLICES)
  	{
    	numOldSlices = Walls.VIEWPORT_NUM_SLICES;
  	}

  	for(var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; ++i)
  	{
  		var slice = this.slices[i];
  		if(slice.sprite != null){
  			this.returnObjectSprite(slice.type, slice.sprite);
  			this.removeChild(slice.sprite);
  			slice.sprite = null;
  		}	
  	}
};



Walls.prototype.addNewSlices = function(){

	var firstX = -(this.viewportX % WallSlice.WIDTH);

	for(var i = this.viewportSliceX, sliceIndex = 0; 
		i < this.viewportSliceX + Walls.VIEWPORT_NUM_SLICES; ++i, ++sliceIndex)
	{
		var slice = this.slices[i];
		if(slice.sprite == null && slice.type != SliceType.GAP)
		{
			slice.sprite = this.borrowObjectSprite(slice.type);

			slice.sprite.position.x = firstX + sliceIndex * WallSlice.WIDTH;
			slice.sprite.position.y = slice.y;

			this.addChild(slice.sprite);
		}
		else if(slice.sprite != null)
		{
			slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
		}
	}
};



