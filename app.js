var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs') //file system
  , request = require('request')
    //,util = require('util')
    ;

global.io = io;
global.request = request;

require('./public/util.js');
require('./server.player.js');
require('./server.map.js');

io.set('log level', 2); // reduce logging
//io.set('log level', 1); // only warnings and errors

//specify static www dir
app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

var port = process.env.PORT || 3000;
server.listen(port);

global.players = {};
global.map = new Map();

//gameloop
setInterval(function(){
	io.sockets.emit('sync',map,players,new Date().getTime());
},45);

//onPlayerConnect
io.sockets.on('connection', function(client){

    var player = new Player(client);
    //console.log(players);

});