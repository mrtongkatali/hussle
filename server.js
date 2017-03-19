'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var __  = require('lodash');

let connections = [];

app.get('/', function(req, res){
  console.log("Connected to socketio");
});


io.on('connection', function(socket) {

  let send = function(EVENT_NAME, username, obj) {
    let conn = __.filter(connections, (conn) => conn.id == username)[0];
    // send to all user socket connection
    console.log("EVENT_NAME", EVENT_NAME, conn);
    __.map( (conn ? conn.connections : []) , (conn) => socket.broadcast.to(conn).emit(EVENT_NAME, obj) );
  };

  console.log("Connected to socket");

  socket.on('mapCurrentSession', (username) => {

    //- Check if the username is already in the connection list and its socket connection already exists in connection pool
    let conn = __.filter(connections, (conn) => conn.id === username && __.indexOf(conn.connections, socket.id) === -1 )[0];

    //- Push new connection if it doesn't exists
    if(conn) conn.connections.push(socket.id);

    console.log("Socket connection : ", conn, username);

  });

  socket.on('_SOCK_LOGOUT', (user) => {
    send('_SOCK_LOGOUT', user);
  });

  socket.on('_SOCK_UPDATE_TASK_LIST', (user, obj) => {
    send('_SOCK_UPDATE_TASK_LIST', user, obj);
  });

  //- Register new socket
  socket.on('_SOCK_REGISTER_USER', function(username){

    console.log("Socket register: ", username);
    connections.push({
      id: username,
      connections: [socket.id]
    });

  });


});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
