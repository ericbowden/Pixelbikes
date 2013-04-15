var Players={};
var map;
var game;
var socket = io.connect('/');

window.onload = function(){ //main function
	
	initGame();
};

function initGame() {

	enchant();
 	var width = 32*50; //cellsize*number of cells
 	var height = 32*50;
	game = new Game(width, height);
	game.fps = 30;
	game.preload('./pics/kitten.jpg', './sounds/boop.wav',"./pics/megaman.jpg");

	//after preloading is done
	game.onload = function () {	

		initSockets();
		//Players.push(new Player(64,64));
	};
	game.start();	
}

function initSockets() {

    var clientInit = false;

	socket.on('init', function (serverMap,players,id) {
		console.log(arguments,'init');

        clientInit = true;

        map = new myMap(serverMap); //custom map class
		for(var p in players)
			Players[p] = new Player(players[p],id==p?1:0);
	});
	
	socket.on('player_connect', function (player) {
		console.log(player.id,'connected');
		Players[player.id] = new Player(player,0)
	});
	
	socket.on('disconnect', function (id) {
		console.log(id,'disconnected');
		Players[id].disconnect();
		delete Players[id];
	});
	
	socket.on('sync', function (serverMap,players,time) {
        //console.log(arguments);
        if(!clientInit)
            return;

        map.sync(serverMap);
		for(var p in players) {
            Players[p].sync(players[p]);
			//console.log(players[p].x,players[p].y);
		}
		//console.timeEnd("time");
		//pause=false;
		//console.log(timer2.getTimeDiff(time));
	});

}


