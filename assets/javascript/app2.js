$(document).ready(function() {
    var config = {
        apiKey: "AIzaSyD4NgBcKaPo0lBiNZ82dy8ZcFNb2U52fA0",
        authDomain: "spice-it-67e90.firebaseapp.com",
        databaseURL: "https://spice-it-67e90.firebaseio.com",
        projectId: "spice-it-67e90",
        storageBucket: "spice-it-67e90.appspot.com",
        messagingSenderId: "725483217593"
      };
      firebase.initializeApp(config);
      
///////////////////////////////////////////////////////////////
//   \\         LOG INTO SPICEIT ACCOUNT         \\     //                      //                                                //
      ////////////////////////////////////////////////

// Log in button event
$(document).on('click', '#btnLogin', function(e) {
    // Get email and password
    var email = $('#userEmail').val();
    var password = $('#userPassword').val();
    // Sign in
    var promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e.message));
    $('#userEmail').val('');
    $('#userPassword').val('');
    

})

///////////////////////////////////////////////////////////////
//   \\         SIGN UP FOR SPICEIT RECIPIES          \\     //                      //                                                //
      ////////////////////////////////////////////////

//Signup event
$(document).on('click', '#saveNew', function(e) {
     // Get email and password
     console.log('sign up')
     var email = $('#newEmail').val();
     var password = $('#newPassword').val();
     // Sign in
     var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
     promise.catch(e => console.log(e.message));
     $('#newEmail').val('');
     $('#newPassword').val('');
});

$(document).on('click', '#btnLogout', function() {
    firebase.auth().signOut();
});


    //realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            $('#userMail').html(firebaseUser.email);
            $('#btnLogin,#btnNewAcc,#userEmail,#userPassword').hide()
            $('#btnLogout,#userMail').show()
        } else {
            console.log('not logged in');
            $('#btnLogin,#btnNewAcc,#userEmail,#userPassword').show()
            $('#btnLogout,#userMail').hide()
        }
    });
});


