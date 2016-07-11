//SERVICE
myApp.factory('Authentication', ['$rootScope', '$location','$timeout', function($rootScope, $location, $timeout) {
    
  var myObject = {  
      
      login: function(user) {     //user comes from the registration-controller using Authentication.login($scope.user)
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(function (result) {
                console.log("AUTH OK " + result.provider + " " + result.uid);

                $timeout(function () {
                    $location.path(['/success']);
                }, 0);

                }, //end of function (result)
                function (error) {
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
                }//end of function (error)
            );//end of .then
    }, //end of login
        
    logout: function() {
            firebase.auth().signOut()
            .then(function() {
            // Sign-out successful.
                $timeout(function () {
                    $location.path(['/login']);
                }, 0);
                $rootScope.message = "You are now loged out."
            }, //end of then
            function(error) {
            // An error happened.
                $rootScope.message = errorMessage;
                $rootScope.$apply();
            }//end of error
            );//end of then
    }, //end of logout
 
      writeUserData: function (userId, displayName, displayEmail) {
          var user = {  email: displayEmail,
                        name: displayName};
          
         console.log(user); database.ref('users/'+userId).set(user);
          
      },  //end of writeUserData
      
      register: function(user) {     
        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then (function (result) {
                result.name=user.firstname;  
                console.log('success, user added in createUser'); 
                
                myObject.writeUserData(result.uid, result.name, user.email);
                return 'this is freakin awsome!'; 
            })
            .then (function (res){
            console.log("yeeeeeeHaaaaaa");
            console.log (res);
            }
           
        ,function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $rootScope.message = error.message;
            // ..
        });
    
      } //end of register
      
      
  }; // end of myObject
      return myObject;
    
}]);    //closes the factory