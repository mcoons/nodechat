
$(function () {
  
  var username = prompt("Please enter your chat name:", "Unknown");


  var socket = io();
  // socket.emit('user joined to server', username);

  // send chat message to server after button click
  $('form').submit(function(){
    socket.emit('chat message to server', username + ": " + $('#newmsg').val());
    $('#newmsg').val('');
    return false;
  });

  // receive chat message from server
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));

    // $('#messages').scrollTop($('#messages')[0].scrollHeight)

    // chatWindow = document.getElementById('messages'); 
    // var xH = chatWindow.scrollHeight; 
    // chatWindow.scrollTo(0, xH);

    window.scrollTo(0,document.body.scrollHeight);
  });
 

  socket.on("connect", function(){
    socket.emit('user joined to server', username);
  })

  // socket.on('disconnect', function(username){
  //   socket.emit('user left', username);
  // })


});