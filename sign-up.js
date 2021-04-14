var submit = document.getElementById('signup-form');
submit.addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(userCredential){
        var user = userCredential.user;
        window.alert('Successfully logged in as ' + user.email);
        window.location.href = 'edit-profile.html';
      }) 
      .catch(function(error){
         window.alert(error.message);
      });
});