//SERVICE
myApp.factory('Authentication', ['$rootScope', '$location','$timeout', function($rootScope, $location, $timeout) {
    
  var myObject = {  
    login: function(user) {     //user comes from the registration-controller using Authentication.login($scope.user)

        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function (result) {
            console.log("AUTH OK " + result.provider + " " + result.uid);
            
            $timeout(function () {
                $location.path(['/success']);
            }, 0);
            
        }, function (error) {
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
        });
    }, //end of login
        
    logout: function() {
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
            $timeout(function () {
                $location.path(['/login']);
            }, 0);
            $rootScope.message = "You are now loged out."
        }, function(error) {
        // An error happened.
            $rootScope.message = errorMessage;
            $rootScope.$apply();
        });
    },
        
    register: function(user) { 
        
    }
  }; // end of myObject
      return myObject;
    
}]);    //closes the factory