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

//Getting the user profile picture's link-------------------------------
// It's in sign-up.html
var file = {};
function chooseFile(e){
  file = e.target.files[0];
  if(file == '{}'){
    console.log('file is null');
  }
}

// write user data in realtime database--------------------------
// it's in sign-up.html
function writeUserData(userId, name, email, description) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    description: description
  });
}

// Delete data
function deleteData(userId){
  firebase.database().ref('users/' + userId).remove().then(function(){
    console.log('delete sucessfully');
  })
  .catch(function(error){
    window.alert(error.message);
  });
}
function deletePicture(userId){
  var storage = firebase.storage();
  var pathReference = storage.ref('users/' + userId + '/profile.jpg');
    // Delete the file
  pathReference.delete().then(function(){
    // File deleted successfully
    console.log("delete sucessfully")
  }).catch(function(error){
    window.alert(error.message);
    // Uh-oh, an error occurred!
  });
}

// This function will call delete data and delete picture above
// Call this function before you remove user in authentication
function delete_user_data(){
  var user = firebase.auth().currentUser;
  // var credential;
  // user.reauthenticateWithCredential(credential).then(function() {
  //   console.log('please sign in again')
  //   // User re-authenticated.
  // }).catch(function(error) {
  //   // An error happened.
  // });
  deleteData(user.uid);
  deletePicture(user.uid);
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


// Login function------------------------------------------------
// In login.html, it's linked with signed in button
function login(){
  'use strict';
  var userEmail = document.getElementById("inputEmail").value;
  var userPassword = document.getElementById("inputPassword").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
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

// This function is to check if user is currently logged in or not
// I tried to link this function to our login button but i failed
function check_user(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.href = 'result.html';
    } else {
      // No user is signed in.
      window.location.href = 'login.html';
    }
  });
}

// sign-up function-----------------------------------------
// In sign-up.html, it's linked with create an Account button
function createAccount(){
  'use strict';
  var name = document.getElementById("inputName").value;
  var description = document.getElementById("inputDescription").value;
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(userCredential){
  // Signed in 
  var user = userCredential.user;

  // Store image-----------------------------------------------
  firebase.storage().ref('users/' + user.uid + '/profile.jpg').put(file).then(function(){
    console.log("sucessfully uploaded piture");
  })
  .then(function(){
    window.location.href = 'result.html';
  })
  .catch(function(error){
    window.alert("Error: " + error.message);
  });
  // -------------------------------------------------------------
  
  // store bio, it call writeUser data function above
  writeUserData(user.uid, name, email, description);
  // window.location.href = 'result.html';
})
.catch(function(error){
  var errorCode = error.code;
  var errorMessage = error.message;
  window.alert("Error: " + errorMessage);
  // ..
});
event.preventDefault();
}

// signout function------------------------------------------
// In our result.html, linked it with our
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    // Once the user sign out, we will redirect them back to login page, which is login.html
    window.location.href = 'login.html';
  }).catch(function(error){
    // An error happened.
  });
}

// Update social media----------------------------------------------
function updateSocialMedia(userId,github_link, twitter_link, facebook_link, instagram_link){
  firebase.database().ref('users/' + userId).update({
    github: github_link,
    twitter: twitter_link,
    facebook: facebook_link,
    instagram: instagram_link
  });
}

// NOT FINISHED, IT ONLY UPDATE THE USER SOCIAL MEDIA LINKS
function updateProfile(){
  var github = document.getElementById('github').value;
  var twitter = document.getElementById('twitter').value;
  var facebook = document.getElementById('facebook').value;
  var instagram = document.getElementById('instagram').value;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // if user did not enter the website url
      // append the user's input to the end of the url
      // if user did not enter anything, database will save the value as website url without username (default value)

      // example: user inputs "username" which does not include "github.com", therefore save value as
      // "https://www.github.com/" + "username"
      
      // example2: user enters full url of their profile like "https://github.com/username" 
      // since user input .includes "github.com" no change to the value is done
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
      updateSocialMedia(user.uid, github, twitter, facebook, instagram);
      window.location.href = 'result.html';
    } 
    else {
      // No user is signed in.
      console.log('No user is currently logged in');
    }
  });
}

