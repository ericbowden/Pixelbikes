var Player = enchant.Class.create(enchant.Sprite, {

	initialize: function(player, playable) {
		enchant.Sprite.call(this, 320, 320);
		this.x = player.x;
		this.y = player.y;
        this.id = player.id;
		this.initX = this.x;
		this.initY = this.y;
		//this.image = game.assets["./pics/megaman.jpg"];

		this.dir = player.dir;
		this.speed = player.speed;
		this.hasMoved = false;
		this.originX = 0; //sprite placement
		this.originY = 0;
		this.scale(.1);
        var me = this;
		//this.frame = 5;
		//sprite.scale(.2);		
		//this.rotate(120);
        game.load(player.image,function(asset){
            me.image = asset.target;
        });

        game.rootScene.addChild(me);

        this.addEventListener('enterframe', function () {
            if(!playable)
                return;

            socket.emit('update',game.input);
        });
	},

    sync: function(serverPlayer) {
        this.x = serverPlayer.x;
        this.y = serverPlayer.y;
    },

    disconnect: function() {
        game.rootScene.removeChild(this);
    }

});