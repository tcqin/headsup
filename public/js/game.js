$(function () {
  var socket = io();

  var room_id = $('#room_id')[0].innerHTML;

	socket.on('connect', function() {
	   // Connected, let's sign-up for to receive messages for this room
	   socket.emit('room', room_id);
	});

  $('#chat-form').submit(function(){
    socket.emit('send-action', $('#chat-message').val());
    $('#chat-message').val('');
    return false;
  });
  socket.on('update-hand', function(data) {
    console.log('udpate:', data);
    $('#chat-form').append($('<li>').text(data));
  });
});