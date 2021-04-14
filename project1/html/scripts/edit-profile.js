function updateUserProfile(userId, user_email, name, bio, github_link, twitter_link, facebook_link, instagram_link, backgroundcolor){
firebase.database().ref('users/' + userId).update({
  username: name,
  email: user_email,
  description: bio,
  github: github_link,
  twitter: twitter_link,
  facebook: facebook_link,
  instagram: instagram_link,
  user_backgroundColor: backgroundcolor
});
}

function updateUserPic(userId, picturefile){
firebase.storage().ref('users/' + userId + '/profile.jpg').put(picturefile)
.then(function(){
    console.log('Upload picture sucessful');
    window.location.href = 'result.html';
    window.alert('Sucesfully Save changes');
});
}
function change_profile_image(){
file = document.getElementById('picture-file').files[0];
user_profile_pic = document.getElementById('user_profile_pic');
user_profile_pic.src = URL.createObjectURL(file);

user_profile_pic.onload = function() {
  URL.revokeObjectURL(user_profile_pic.src) // free memory
}
}

// Tests to see if /users/<userId> has any data. 
function checkIfUserExists(userId) {
  var usersRef = firebase.database().ref('users/');
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}
function userExistsCallback(userId, exists) {
  if (exists) {
    console.log('User exist');
    // Name, bio
    var firebase_username = firebase.database().ref('users/' + userId + '/username');
    var firebase_description = firebase.database().ref('users/' + userId + '/description');
    var firebase_backgroundColor = firebase.database().ref('users/' + userId + '/user_backgroundColor');
    // social network links
    var firebase_facebook = firebase.database().ref('users/' + userId + '/facebook');
    var firebase_github = firebase.database().ref('users/' + userId + '/github');
    var firebase_instagram = firebase.database().ref('users/' + userId + '/instagram');
    var firebase_twitter = firebase.database().ref('users/' + userId + '/twitter');

    // Change name, description, images if user logged in before
    firebase_username.on('value', function (snapshot) {
      document.getElementById("inputName").value = snapshot.val();
    });

    firebase_description.on('value', function (snapshot) {
      document.getElementById("inputDescription").innerHTML = snapshot.val();
    });

    firebase_backgroundColor.on('value', function (snapshot) {
      document.getElementById("color").value = snapshot.val();
    });

    firebase.storage().ref('users/' + userId + '/profile.jpg').getDownloadURL()
        .then(function (url) {
          var img = document.getElementById('user_profile_pic');
          img.setAttribute('src', url);
        })
        .catch(function (error) {
          console.log(error);
    });

    // Change social media links
    firebase_facebook.on('value', function (snapshot) {
      document.getElementById('facebook').value = snapshot.val();
    });

    firebase_github.on('value', function (snapshot) {
      document.getElementById('github').value = snapshot.val();
    });

    firebase_twitter.on('value', function (snapshot) {
      document.getElementById('twitter').value = snapshot.val();
    });

    firebase_instagram.on('value', function (snapshot) {
      document.getElementById('instagram').value = snapshot.val();
    });

  } else {
    console.log('New user');
  }
}

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    console.log('Currently logged in as ' + user.email);
    checkIfUserExists(user.uid);
    var colorBg = document.querySelector(".colorPicker");
    var body = document.getElementById("backgroundColor");

    colorBg.addEventListener("input", function(){
      body.style.background = colorBg.value;
      CSS.textContent = body.style.background;
    });

    var submit = document.getElementById('edit-profile-form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();
        var github = document.getElementById('github').value;
        var twitter = document.getElementById('twitter').value;
        var facebook = document.getElementById('facebook').value;
        var instagram = document.getElementById('instagram').value;
        var name = document.getElementById('inputName').value;
        var bio = document.getElementById('inputDescription').value;
        file = document.getElementById('picture-file').files[0];
        
    
        // Check to see if the user put their link correctly
        if(!github.includes("github.com")) {
            github = "https://www.github.com/" + github;
          }
          if(!twitter.includes("twitter.com")) {
            twitter = "https://www.twitter.com/" + twitter;
          }
          if(!facebook.includes("facebook.com")) {
            facebook = "https://www.facebook.com/" + facebook;
          }
          if(!instagram.includes("instagram.com")) {
            instagram = "https://www.instagram.com/" + instagram;
          }
          
          console.log('user background color is' + colorBg.value);
        updateUserProfile(user.uid, user.email, name, bio, github, twitter, facebook, instagram, colorBg.value);
        // Update user image on edit profile
        if(file !== undefined){
          updateUserPic(user.uid, file);
        }
        else{
          window.location.href = 'result.html';
        }
    });
  } else{
    console.log('No user is currently signed in.');
}
});

function go() {
var userId = prompt('Username?', 'Guest');
checkIfUserExists(userId);
}
