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
  var pathReference = storage.ref('users/' + user.uid + '/profile.jpg');
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
    // Once the user sign out, we will redirect them back to main page, which is about.html
    window.location.href = 'about.html';
  }).catch(function(error){
    // An error happened.
  });
}

