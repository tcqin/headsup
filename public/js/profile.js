var username = $('#username')[0].innerHTML

function displayOnlineUsers() {
  const user_dropdown = document.getElementById("online-users");
  console.log('here');
  get('/api/users', {'online' : true}, function(online_users) {

    for (let i = 0; i < online_users.length; i++) {
      const online_user = online_users[i];
      const user_object = document.createElement('div');
      $(user_object).addClass('card online-user')
                    .attr('id', 'online-user-' + online_user.local.username);
      const body = document.createElement('div')
      if (!(online_user.local.username == username)) {
        $(body).addClass('card card-body')
               .html(online_user.local.username)
               .appendTo($(user_object));
        $(user_object).appendTo($(user_dropdown));
      }
    }
  });
}

displayOnlineUsers();