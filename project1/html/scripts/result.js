// This is a new file that has a function automatically get information from user and put it on to our result page
// INCLUDE IT FOR RESULT.HTML ONLY
(function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // get user description and bio
      var firebase_username = firebase.database().ref('users/' + user.uid + '/username');
      var firebase_description = firebase.database().ref('users/' + user.uid + '/description');
      // Get the back ground color
      var body = document.getElementById("backgroundColor");

      // Change the username box in result.html into the value we got fromm firebase
      firebase_username.on('value', function (snapshot) {
        document.getElementById("userName").innerHTML = snapshot.val();
      });
      // Change description
      firebase_description.on('value', function (snapshot) {
        document.getElementById("description_box").innerHTML = snapshot.val();
      });
      // Change the bacground color
      var firebase_backgroundcolor = firebase.database().ref('users/' + user.uid + '/user_backgroundColor');
      firebase_backgroundcolor.on('value', function(snapshot){
        body.style.background = snapshot.val();
        CSS.textContent = body.style.background;
      })

      // Upload image on to the image in result.html-------------------------------------------
      firebase.storage().ref('users/' + user.uid + '/profile.jpg').getDownloadURL()
        .then(function (url) {
          var img = document.getElementById('user_profile_pic');
          img.setAttribute('src', url);
        })
        .catch(function (error) {
          console.log(error);
        });

      // make reference to storages
      // I edit the show network icons
      var firebase_facebook = firebase.database().ref('users/' + user.uid + '/facebook');
      var firebase_github = firebase.database().ref('users/' + user.uid + '/github');
      var firebase_instagram = firebase.database().ref('users/' + user.uid + '/instagram');
      var firebase_twitter = firebase.database().ref('users/' + user.uid + '/twitter');
      
      var facebook_link = document.getElementById('facebook');
      var github_link = document.getElementById('github');
      var twitter_link = document.getElementById('twitter');
      var instagram_link = document.getElementById('instagram');
      // this here is to change the links
      firebase_facebook.on('value', function (snapshot) {
        if(window.location.href.includes("result.html")) {
         facebook_link.href = snapshot.val();
      }
      if(facebook_link.href === 'https://www.facebook.com/'){
        facebook_link.style.display = 'none';
      }
      });

      firebase_github.on('value', function (snapshot) {
        if(window.location.href.includes("result.html")) {
           github_link.href = snapshot.val();
        }
        if(github_link.href === 'https://www.github.com/'){
          github_link.style.display = 'none';
        }
      });

      firebase_instagram.on('value', function (snapshot) {
        if(window.location.href.includes("result.html")) {
          instagram_link.href = snapshot.val();
      }
      if(instagram_link.href === 'https://www.instagram.com/'){
        instagram_link.style.display = 'none';
      }
      });
      firebase_twitter.on('value', function (snapshot) {
        if(window.location.href.includes("result.html")) {
          twitter_link.href = snapshot.val();
      }
      if(twitter_link.href === "https://www.twitter.com/"){
        twitter_link.style.display = 'none';
      }
      });
    } else {
      // No user is signed in.
      console.log('No user is currently logged in');
    }
  });
})();
