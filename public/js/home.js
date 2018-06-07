function displayUsers() {
  const user_dropdown = document.getElementById("online-users");
  console.log('here');
  get('/api/users', {'online' : true}, function(online_users) {

    for (let i = 0; i < online_users.length; i++) {
      const online_user = online_users[i];
      const user_object = document.createElement('p');
      user_object.innerHTML = online_user.facebook.name;
      user_dropdown.appendChild(user_object);
    }
  });
}

// displayUsers();