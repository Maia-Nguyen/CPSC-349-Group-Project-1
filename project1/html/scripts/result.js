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

      // Display username in text box in edit profile
      firebase_username.on('value', function (snapshot) {
        if(window.location.href.includes("edit-profile.html")) {
          document.getElementById("inputName").value = snapshot.val();
        }
      })

      // Display saved user profile picture in edit profile
      firebase.storage().ref('users/' + user.uid + '/profile.jpg')
      .then(function (url) {
        var img = document.getElementById('picture-file');
        img.setAttribute('src', url);
      })
      .catch(function (error) {
        console.log(error);
      });


      // Display saved user background color in edit profile
      firebase_backgroundcolor.on('value', function (snapshot) {
        if(window.location.href.includes("edit-profile.html")) {
          document.getElementById("color").value = snapshot.val();
        }
      })

      // Display user bio in text box in edit profile
      firebase_description.on('value', function (snapshot) {
        if(window.location.href.includes("edit-profile.html")) {
          document.getElementById("inputDescription").value = snapshot.val();
        }
      })

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

      firebase_github.on('value', function (snapshot) {
        if(window.location.href.includes("edit-profile.html")) {
          document.getElementById("github").value = snapshot.val();
        }
        if(window.location.href.includes("result.html")) {
          github_link.href = snapshot.val();
          if(github_link.href === 'https://www.github.com/'){
            github_link.style.display = 'none';
          }
        }
      });

      firebase_twitter.on('value', function (snapshot) {
        if(window.location.href.includes("result.html")) {
          twitter_link.href = snapshot.val();
      }
      if(twitter_link.href === "https://www.twitter.com/"){

        twitter_link.style.display = 'none';
      }
      if(window.location.href.includes("edit-profile.html")) {
        document.getElementById("twitter").value = snapshot.val();
      }
      });

      // this here is to change the links
      firebase_facebook.on('value', function (snapshot) {
        // updates href if on result.html
        if(window.location.href.includes("result.html")) {
          facebook_link.href = snapshot.val();
        }
        if(facebook_link.href === 'https://www.facebook.com/'){
          facebook_link.style.display = 'none';
        }
        // updates user value if on edit-profile.html
        if(window.location.href.includes("edit-profile.html")) {
          document.getElementById("facebook").value = snapshot.val();
        }
      });

      firebase_instagram.on('value', function (snapshot) {
        if(window.location.href.includes("result.html")) {
          instagram_link.href = snapshot.val();
      }
      if(instagram_link.href === 'https://www.instagram.com/'){
        instagram_link.style.display = 'none';
      }
      if(window.location.href.includes("edit-profile.html")) {
        document.getElementById("instagram").value = snapshot.val();
      }
      });
    } else {
      // No user is signed in.
      console.log('No user is currently logged in');
    }

    // Show social media link--------------------------------------------------------------------
    // Can't figure this part out -Maia
    // function showNetworks(){
    //   firebase.auth().onAuthStateChanged(function(user) {
    
    //     var firebase_facebook = firebase.database().ref('users/' + user.uid + '/facebook');
    //     var firebase_github = firebase.database().ref('users/' + user.uid + '/github');
    //     var firebase_instagram = firebase.database().ref('users/' + user.uid + '/instagram');
    //     var firebase_twitter = firebase.database().ref('users/' + user.uid + '/twitter');
    
    //     if (user) {
    //       if(firebase_github === "https://www.github.com/") {
    //         document.getElementById('github').style.display = "none";
    //       } else {
    //         document.getElementById('github').style.display = "block";      
    //       }
    
    //       if(firebase_twitter === "https://www.twitter.com/") {
    //         document.getElementById('twitter').style.display = 'none';
    //       } else {
    //         document.getElementById('twitter').style.display = 'block';
    //       }
    
    //       if(firebase_facebook === "https://www.facebook.com/") {
    //         document.getElementById('facebook').style.display = 'none';
    //       } else {
    //         document.getElementById('facebook').style.display = 'block';
    //       }
    
    //       if(firebase_instagram === "https://www.instagram.com/") {
    //         document.getElementById('instagram').style.display = 'none';
    //       } else {
    //         document.getElementById('instagram').style.display = 'block';
    //       }
    //     } 
    //     else {
    //       // No user is signed in.
    //       console.log('No user is currently logged in');
    //     }
    //   });
    // }
  });
  /*
    // Access the user profile by using specific user url

    function getParameterByName(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
   }

   function loginIfHasUrlCreds(){
    'use strict';

    var usernameFromQueryStr = getParameterByName("user");
    var passwordFromQueryStr = getParameterByName("password");
    console.log("user from query string: "+usernameFromQueryStr+" password: "+passwordFromQueryStr)


    if(usernameFromQueryStr === null) {
      return;
    }
    

    firebase.auth().signInWithEmailAndPassword(usernameFromQueryStr, passwordFromQueryStr)
    .then(function(userCredential){
        var user = userCredential.user;
        // location.href redirect user to other pages
        window.location.href = "result.html";
        console.log(user);
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });
    event.preventDefault();
  }


  loginIfHasUrlCreds()

  */

})();
