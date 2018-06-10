$(function () {
  var socket = io();
  var username = $('#username')[0].innerHTML;

  // telling the server that you are logged in
  socket.emit('user login', username);

  // telling the server that you are logged out
  $('#logout-button').click(function() {
    socket.emit('user logout', username);
    window.location.href = "/logout"
    return false;
  })

  // updating the online users column (login)
  socket.on('user login', function(user) {
    if (user == username) return;
    var user_object = document.createElement('p');
    user_object.id = 'online-user-' + user;
    user_object.innerHTML = user;
    $(user_object).appendTo($('#online-users'));
  })

  // updating the online users column (logout)
  socket.on('user logout', function(user) {
    var user_object = document.getElementById('online-user-' + user);
    user_object.parentNode.removeChild(user_object);
  })

  // submitting a chat message
  $('#chat-form').submit(function(){
    socket.emit('home page chat message', {
      user: $('#username')[0].innerHTML,
      message: $('#chat-message').val()
    });
    $('#chat-message').val('');
    return false;
  });

  // displaying a new chat message
  socket.on('home page chat message', function(message_object) {
    var card = document.createElement('div');
    $(card).addClass('card card-body')
           .html('<strong>' + message_object.user + ': </strong>' + message_object.message)
           .appendTo($('#chat-messages'));
    // automatically scrolls to the bottom
    var objDiv = document.getElementById("chat-messages");
    objDiv.scrollTop = objDiv.scrollHeight;

  });
});