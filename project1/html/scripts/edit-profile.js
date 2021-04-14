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


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        console.log('Currently logged in as ' + user.email);
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
            updateUserPic(user.uid, file);
        });
    }
    else{
        console.log('No user is currently signed in.');
    }
});
