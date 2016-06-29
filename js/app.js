//MODULE
var myApp = angular.module('myApp', ['ngRoute'])

//we need a setup to stop users to type in /success to get to url of the loged in successfully page. This is done with $rootScope.$on witch listens to events of errors. The error is triggered in authentication.js where the factory has an autheticaion variable that checks for authentication with Firebase.
myApp.run (['$rootScope', '$location',
    function ($rootScope, $location) {
        $rootScope.$on ('$routeChangeError',  //$on checks for events in myApp.
            function(event, next, previous, error){ 
                if(error=='AUTH_REQUIRED') {    //if the error is the one that comes from authentication.js authenticate(), then throw message to screen and send the user to the login-page.
                    $rootScope.message = 'Sorry, you must log in to access that page.';
                    $location.path('/login');
                }  
        } );
    }
]);