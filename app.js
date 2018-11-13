var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const localport = 3000;
const users = {};

app.set('port', process.env.PORT || localport);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(require('./routes/index'));

io.on('connection', function(socket){

    console.log(`${(new Date()).toLocaleTimeString()} - initial socket connected: ${socket.id}` );
  
    socket.on('disconnect', function(){
      console.log(`${(new Date()).toLocaleTimeString()} - socket disconnected: ${socket.id} - ${users[socket.id]}`);
      io.emit('chat message', `${(new Date()).toLocaleTimeString()} < ${users[socket.id]} has left >`);
      delete users[socket.id];
      console.log(users);
    });

    socket.on('user joined to server', function(user){
      console.log(`${(new Date()).toLocaleTimeString()} - socket connected: ${socket.id} - ${user}`);
      users[socket.id]=user;
      console.log(users);
      io.emit('chat message', `${(new Date()).toLocaleTimeString()} < ${user} has joined >`);
    });
    
    socket.on('chat message to server', function(msg){
      console.log(`${(new Date()).toLocaleTimeString()} - message: ${msg}`);
      io.emit('chat message', `${(new Date()).toLocaleTimeString()} - ${msg}`);
    });
    
  });

http.listen(3000, function(){
  console.log(`listening on port ${app.get('port')}`);
});