function create_an_account(){
    var submit = document.getElementById('signup-form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();
        createAccount();

    });
}
function sign_user_in(){
    var submit = document.getElementById('signin-form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();
        login();
    });
}
function edit_profile(){
    var submit = document.getElementById('edit-profile-form');
    submit.addEventListener('submit', function(e){
        e.preventDefault();
        updateProfile();
    });
}