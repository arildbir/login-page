//SERVICE
myApp.factory('Authentication', ['$rootScope', '$location',
//  function($rootScope, $location) {

  var myObject = {
      
 /*     returningUser (ret) {
          //myObject.logout();
       //  var returningUser = firebase.auth().currentUser;   
          console.log (ret.email);
          alert (ret.email);
          $location.path(['/success']);
           
        },*/
      
      login: function(user) {     //user comes from the registration-controller using Authentication.login($scope.user)

          firebase.auth().signInWithEmailAndPassword(user.email, user.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            // [START_EXCLUDE-errors]
            if (errorCode === 'auth/wrong-password') {
                $rootScope.message = 'Wrong password, sorry about that, dude!';
              } 
            if (errorCode === 'auth/user-not-found') {
                $rootScope.message = "User not found, sorry about that, dude!";
            }
            else {
                $rootScope.message = errorMessage;
              }
                $rootScope.$apply();
          // [END error-handle]
        })
          
    /*      
          //.then(myObject.returningUser())
            .then(function (result) {
            console.log("AUTH OK " + result.providerId + " " + result.uid);
            //  myObject.returningUser(result);
        }, function (error) {
            UtilityService.showToast("The app can't authenticate you, please re-login.", 'long', 'center');
        })
          
          */
          
        
        // [END authentication-with-email]
         

        
          
          /*  currentUser = firebase.auth().currentUser; 
            console.log(currentUser);
            var name, email, photoUrl, uid;

            if (currentUser) {
                $rootScope.currentUser = currentUser;
              name = currentUser.displayName;
              email = currentUser.email;
              photoUrl = currentUser.photoURL;
                uid = currentUser.uid; 
                alert(uid);
                $location.path(['/success']);
            }
          currentUser.$apply();*/
          
    }, //end of login method 
      
      
      
      
    logout: function() {
    /*    firebase.auth().signOut().then(function() {
            // Sign-out successful.
            $rootScope.messsage = '';
            $rootScope.$apply();
            $location.path(['/login']);
        }, function(error) {
            // An error happened.
            var errorMessage = error.message;
            $rootScope.message = errorMessage;
        });
        
        */
        
       /* return firebase.auth().signOut();
        $rootScope.messsage = '';
        $rootScope.$apply();*/
    },  //end of logout method
      
/*    requireAuth: function () {  //method that uses Firebase authentication method. Returns error if authentication is not valid. If no email and password has been provided and you start up the factory. The error is cought by the myApp.run in app.js.
       // alert('RequireAuth saids nooooo!');
        var returnedUser = firebase.auth().currentUser;
        alert(returnedUser);
        
    },  //end of requireAuthentication method
 */     
    register: function(user) {  //value of 'user' comes from the registration-controller using Authentication.register($scope.user);
 /*       
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
            
            //set name
            
            
            //set password
            
            
        });
          // [END createwithemail]
      
        //set password
        
        
        
        
        
        auth.$createUser({    //check Firebase for no duplicate email and register the user with a UID.
        email: user.email,
        password: user.password //KAN JEG HER FINNE UT HVA SOM RETURNERES FRA AUTH?? ER DET HER JEG FÅR regUser??
      }).then( function(regUser) {   //authentication was a success, we get regUser from Firebase. .then is started: a function that will create a new child of the Firebase + users-url, so we can add more data to the UID that was just created.      //ER FUNCTION(REGUSER) EN ANNONYM FUNKSJON?
          
          //var regRef = new Firebase(FIREBASE_URL + 'users') //we want to add UIDs data to the Firebase/appname/users/UID-url. We can do this by using regUser.child().
            
            
            
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
          
          */
    } // end of register-method
    
    
  }; // end of myObject
      return myObject;
      
      
   
}]); //end of Authentication-factory