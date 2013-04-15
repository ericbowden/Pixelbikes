var myMap = enchant.Class.create(enchant.Map, {

	initialize: function(map) {

		// Create a Map and draw it on-screen
		this.cellWidth = map.cellWidth;
		this.cellHeight = map.cellHeight;
		this.cellsWide = map.cellsWide; //number of cells wide
		this.cellsHigh = map.cellsHigh; //number of cells high
		enchant.Map.call(this, this.cellWidth, this.cellHeight); //call parent to initialize
		this.image = game.assets['./pics/kitten.jpg'];
		//this.scale(.1);
		//this.resetMap();
        this.sync(map);
	
		// this.addEventListener('enterframe', function() {});
	
		game.rootScene.addChild(this);
	},

    sync: function(serverMap) {
        this._data[0] = serverMap.data;
        this._dirty = true;
    }

});