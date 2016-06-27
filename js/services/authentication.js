//SERVICE
myApp.factory('Authentication', ['$rootScope', '$location', 
  function($rootScope, $location) {

  var myObject = {
    login: function(user) {     //user comes from the registration-controller using Authentication.login($scope.user)
        
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE-errors]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            console.error(error);
          }
          // [END_EXCLUDE-errors]
           
        });
        // [END authwithemail]
         var authUser = firebase.auth().currentUser;
            console.log(authUser);
            var name, email, photoUrl, uid;

            if (authUser != null) {
              name = authUser.displayName;
              email = authUser.email;
              photoUrl = authUser.photoURL;
                uid = authUser.uid; 
                alert(uid);
                $location.path(['/success']);
            }
            
       
        /*.then( function(user) {
            $location.path(['/success']);      //location is an Angular function that redirects you to another set view
        }) .catch( function(error) {
            $rootScope.message = error.message;
        });*/
    }, //end of login method 

    logout: function() {
        return firebase.auth().signOut();
    },  //end of logout method
      
    requireAuth: function () {  //method that uses Firebase authentication method. Returns error if authentication is not valid. If no email and password has been provided and you start up the factory. This error is cought by the myApp.run in app.js.
        return firebase.auth().currentUser;
    },  //end of requireAuthentication method
      
    register: function(user) {  //value of 'user' comes from the registration-controller using Authentication.register($scope.user);
        
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              console.error(error);
            }
            // [END_EXCLUDE]
        });
          // [END createwithemail]
      
        
        
        
        
        
        
        auth.$createUser({    //check Firebase for no duplicate email and register the user with a UID.
        email: user.email,
        password: user.password //KAN JEG HER FINNE UT HVA SOM RETURNERES FRA AUTH?? ER DET HER JEG FÅR regUser??
      }).then( function(regUser) {   //authentication was a success, we get regUser from Firebase. .then is started: a function that will create a new child of the Firebase + users-url, so we can add more data to the UID that was just created.      //ER FUNCTION(REGUSER) EN ANNONYM FUNKSJON?
          
          var regRef = new Firebase(FIREBASE_URL + 'users') //we want to add UIDs data to the Firebase/appname/users/UID-url. We can do this by using regUser.child().
        
          .child(regUser.uid).set({     //.child is a method given by Firebase through regRef.child()
              date: Firebase.ServerValue.TIMESTAMP,
              regUser: regUser.uid,
              firstname: user.firstname,
              lastname: user.lastname,
              email:  user.email
          }); //end of child-method

          //old code: $rootScope.message = "Hi " + user.firstname + ". Thank you for registering";  // end of .then method (subpart of register)
          
          myObject.login(user);
          }).catch(function(error) {    //returns an error-message from Firebase, for instance if duplicate email.
            $rootScope.message = error.message;
          }); //end of catch error-message
    } // end of register-method
  }; // end of myObject
      return myObject;
      
}]); //end of Authentication-factory