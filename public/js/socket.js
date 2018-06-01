$(function () {
  var socket = io();
  $('#chat-form').submit(function(){
    socket.emit('home page chat message', $('#chat-message').val());
    $('#chat-message').val('');
    return false;
  });
  socket.on('home page chat message', function(message) {
    $('#chat-form').append($('<li>').text(message));
  });
});