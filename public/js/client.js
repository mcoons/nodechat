
$(function () {
  var username = prompt("Please enter your chat name:", "Unknown");

  var socket = io();
  
  // send join message to server
  socket.on("connect", function(){
    socket.emit('user joined to server', username);
  })

  // send chat message to server after button click
  $('form').submit(function(){
    socket.emit('chat message to server', username + ": " + $('#newmsg').val());
    $('#newmsg').val('');
    return false;
  });

  // receive chat message from server
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0,document.body.scrollHeight);
    // $('#messages').scrollTop($('#messages')[0].scrollHeight)
  });

});