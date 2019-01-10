(function() {
    var config = {
        apiKey: "AIzaSyD4NgBcKaPo0lBiNZ82dy8ZcFNb2U52fA0",
        authDomain: "spice-it-67e90.firebaseapp.com",
        databaseURL: "https://spice-it-67e90.firebaseio.com",
        projectId: "spice-it-67e90",
        storageBucket: "spice-it-67e90.appspot.com",
        messagingSenderId: "725483217593"
      };
      firebase.initializeApp(config);
      
// Elements
var userEmail = document.getElementById('userEmail');
var userPassword = document.getElementById('userPassword');
var btnLogin = document.getElementById('btnLogin');
var btnSignUp = document.getElementById('btnSignUp');
var btnLogout = document.getElementById('btnLogout');


///////////////////////////////////////////////////////////////
//   \\         LOG INTO SPICEIT ACCOUNT         \\     //                      //                                                //
      ////////////////////////////////////////////////

// Log in button event
btnLogin.addEventListener('click', e => {
    // Get email and password
    var email = userEmail.value;
    var pass = userPassword.value;
    // Sign in
    var promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    
    

});

///////////////////////////////////////////////////////////////
//   \\         SIGN UP FOR SPICEIT RECIPIES          \\     //                      //                                                //
      ////////////////////////////////////////////////

//Signup event
btnSignUp.addEventListener('click', e => {
     // Get email and password
     var email = userEmail.value;
     var password = userPassword.value;
     // Sign in
     var promise = firebase.auth().createUserWithEmailAndPassword(email, password);
     promise.catch(e => console.log(e.message));
        
});

btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});


    //realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            document.getElementById("btnLogout").style.display='block';
        } else {
            console.log('not logged in');
            document.getElementById("btnLogout").style.display='none';
        }
    });
}());


