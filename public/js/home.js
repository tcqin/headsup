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

displayUsers();


// function styleDOMObject(styleJSON) {
//   const card = document.createElement('div');
//   card.setAttribute('id', styleJSON.file_name + '-style');
//   console.log(card.id);
//   card.className = 'story card';
//   card.style.height = "140px";
//   card.style['font-family'] = "garamond";

//   const body = document.createElement('div');
//   body.className = 'row style';
//   card.appendChild(body);

//   const picture = document.createElement('col-4');
//   const style_image = document.createElement('img');
//   style_image.src = '/static/pics/styles/' + styleJSON.file_name;
//   style_image.height = "140";
//   picture.appendChild(style_image);
//   body.appendChild(picture);

//   const info = document.createElement('col-6');
//   const cardBody = document.createElement('div');
//   cardBody.className = 'card-body';
//   cardBody.style.height = "150px";
//   cardBody.style.width = "300px";
//   info.appendChild(cardBody);
//   body.appendChild(info);

//   const style_name = document.createElement('h4');
//   style_name.innerHTML = styleJSON.style_name;
//   cardBody.appendChild(style_name);

//   const description = document.createElement('p');
//   description.innerHTML = styleJSON.description;
//   cardBody.appendChild(description);

//   const style_footer = document.createElement('div');
//   cardBody.appendChild(style_footer);

//   // on click, select the card by graying the background
//   card.addEventListener('click', function() {
//     var cards = document.getElementsByClassName('story card');
//     for (index = 0; index < cards.length; index++) {
//       c = cards[index];
//       c.style.backgroundColor = '#fff';
//     }
//     document.getElementById(styleJSON.file_name + '-style').style.backgroundColor = '#ccc';
//     renderDesigns(styleJSON.style_name);
//   });

//   return card;
// }