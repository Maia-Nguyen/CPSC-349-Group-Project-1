var firebaseConfig = {
  apiKey: "AIzaSyDXwzhjBRafKkta_SDSsRZHw_7Bvhm28q0",
  authDomain: "team-projec.firebaseapp.com",
  projectId: "team-projec",
  storageBucket: "team-projec.appspot.com",
  messagingSenderId: "434710215462",
  appId: "1:434710215462:web:0b65cc627d33b9d0531fe7",
  measurementId: "G-W72V0CV5W9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Create account function-----------------------------
// function writeUserData(userId, name, user_email, user_description) {
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: user_email,
//       description: user_description
//     });
// }
// // store image function that store the user imgages
// function storeUserImage(userId, pictureFile){
//   firebase.storage().ref('users/' + userId + '/profile.jpg').put(pictureFile)
//     .then(function(){
//       console.log("Sucessfully upload picture");
//     })
//     .catch(function(error) { window.alert(error.message); });
// }
// function createAccount(){
//     var name = document.getElementById("inputName").value;
//     var description = document.getElementById("inputDescription").value;
//     var email = document.getElementById("inputEmail").value;
//     var password = document.getElementById("inputPassword").value;
//     var file = document.getElementById('myfile').files[0];

//     console.log('name is ' + name);
//     // firebase.auth().createUserWithEmailAndPassword(email, password)
//     //   .then(function(userCredential){
//     //     var user = userCredential.user;
//     //     storeUserImage(user.uid, file);
//     //     writeUserData(user.uid, name, email, description);
//     //     window.alert('Create sucessfull');
//     //   })
//     //   .catch(function(error){
//     //      window.alert(error.message);
//     //   });
// }

// Delete data
function delete_user_data(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // delete picture
      firebase.storage().ref('users/' + user.uid + '/profile.jpg').delete()
        .then(function(){   console.log("delete picture sucessfully");  })
        .catch(function(error){   console.log(error.message);   });
      // delete user data in realtime database
      firebase.database().ref('users/' + user.uid).remove()
        .then(function(){   console.log("delete data sucessfulyy"); })
        .catch(function(error) { console.log(error.message);  });
      } 
    else {
      console.log('No user is currently logged in');
    }
  });
}

// Login function------------------------------------------------
function login(){
  'use strict';
  event.preventDefault();
  var userEmail = document.getElementById("inputEmail").value;
  var userPassword = document.getElementById("inputPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
  .then(function(userCredential){
      window.alert('Sign in sucessful');
      window.location.href = "result.html";
  })
  .catch(function(error){
     window.alert("Error: " + error.message);
  });
}

// signout function------------------------------------------
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.href = 'login.html';
  }).catch(function(error){
    // An error happened.
  });
}

// show user information
// for debug purpose
function Authentication_checking(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // Debug purpose-------------------------
      console.log(user);
      console.log('currently logged in as ' + user.email);
    } 
    else {
      // No user is signed in.
      console.log('No user is currently logged in');
    }
  });
}

// // Update social media----------------------------------------------
// // I merged these function together
// function updateUserProfile(userId, name, bio, github_link, twitter_link, facebook_link, instagram_link){
//   firebase.database().ref('users/' + userId).update({
//     username: name,
//     description: bio,
//     github: github_link,
//     twitter: twitter_link,
//     facebook: facebook_link,
//     instagram: instagram_link
//   });
// }
// // Update user pic missed a parameter, i fixed it
// function updateUserPic(userId, picturefile){
//   firebase.storage().ref('users/' + userId + '/profile.jpg').put(file).then(function(){
//     console.log("sucessfully uploaded piture");
//   });
// }

// function updateProfile(){
//   var github = document.getElementById('github').value;
//   var twitter = document.getElementById('twitter').value;
//   var facebook = document.getElementById('facebook').value;
//   var instagram = document.getElementById('instagram').value;
//   var name = document.getElementById('inputName').value;
//   var bio = document.getElementById('inputDescription').value;
//   // This is the picture file from the edit-profile
//   file = document.getElementById('picture-file').files[0];
 
//   console.log('name is ' + name);
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // if user did not enter the website url
//       // append the user's input to the end of the url
//       // if user did not enter anything, database will save the value as website url without username (default value)

//       // example: user inputs "username" which does not include "github.com", therefore save value as
//       // "https://www.github.com/" + "username"
      
//       // example2: user enters full url of their profile like "https://github.com/username" 
//       // since user input .includes "github.com" no change to the value is done
//       if(!github.includes("github.com")) {
//         github = "https://www.github.com/" + github;
//       }
//       if(!twitter.includes("twitter.com")) {
//         twitter = "https://www.twitter.com/" + twitter;
//       }
//       if(!facebook.includes("facebook.com")) {
//         facebook = "https://www.facebook.com/" + facebook;
//       }
//       if(!instagram.includes("instagram.com")) {
//         instagram = "https://www.instagram.com/" + instagram;
//       }
//       console.log(facebook);
//       updateSocialMedia(user.uid,name, bio, github, twitter, facebook, instagram);
//       updateUserPic(user.uid, file);
//       // window.location.href = 'result.html';
//     } 
//     else {
//       // No user is signed in.
//       console.log('No user is currently logged in');
//     }
//   });
// }

