function Player(client) {

    //var clientObj = players[client.id];
    players[client.id] = this;
    this.id = client.id;
    this.__proto__.count = this.__proto__.count+1||1;
    this.x = (this.__proto__.count%20+1)*64;
    this.y = 64;
    this.initX = this.x;
    this.initY = this.y;
    this.dir = "down";
    this.speed = map.cellWidth;
    var timer = new util.Timer();
    this.age = 0;
    this.hasMoved = false;
    var me = this;

    //http://api.flickr.com/services/rest/?method=flickr.interestingness.getList&oauth_consumer_key=181e7ab409966cf55e969d6956a46023
    //http://api.flickr.com/services/rest/?page=3&method=flickr.interestingness.getList&api_key=705626789aa232c6d1be4f5811ce0491&per_page=1&format=json&nojsoncallback=1
    //http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
    request.get({
        url:"http://api.flickr.com/services/rest/?page="+util.objectSize(players)+"&method=flickr.interestingness.getList&api_key=705626789aa232c6d1be4f5811ce0491&per_page=1&format=json&nojsoncallback=1",
        json: true
    },function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var photo = body.photos.photo[0];
            me.image = "http://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg"
            start();
        }
    });

    function start() {
        client.emit('init',map,players,me.id);
        client.broadcast.emit('player_connect',me); //to others
    }

    //on client message receive
    client.on('update', function(input){
        me.age++;

        //this saves the keypressed until the game update
        if(me.hasMoved==false)	{

            if (input.left && me.dir != "right") {
                me.dir = "left";
                me.hasMoved=true;
            }

            if (input.right && me.dir != "left") {
                me.dir = "right";
                me.hasMoved=true;
            }

             if (input.up && me.dir != "down") {
                    me.dir = "up";
                    me.hasMoved=true;
            }

            if (input.down && me.dir != "up") {
                me.dir = "down";
                me.hasMoved=true;
            }

        }

        //this acts as a counter to slow down the movement, 60 (fps) mod 6 = 10 fps
        if(me.age%3 != 0)
            return;

        me.hasMoved = false;

        //var move = me.speed * timer.getPeriod()*10;
        var move = me.speed;

        switch(me.dir) {
            case "up":
                me.y -= move;
                break;
            case "down":
                me.y += move;
                break;
            case "right":
                me.x += move;
                break;
            case "left":
                me.x -= move;
                break;
        }

        var x = Math.floor(me.x/map.cellWidth);
        var y = Math.floor(me.y/map.cellHeight);

        //if collision is detected
        if(map.hitTest(x,y)==1) {
            map.resetMap();
            me.x = me.initX;
            me.y = me.initY;
            me.dir = "down";
        } else if(x < map.cellsWide && y < map.cellsHigh && y >=0 && x >=0) {
            map.addPoint(x,y);
        }
    });

    //on client receive
    client.on('disconnect', function(){
        client.broadcast.emit('disconnect',me.id);
        delete players[me.id];
    });
}

//node.js export
if('undefined' != typeof global ) { //global should be changed
    module.exports = global.Player = Player;
}