//ROUTES
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    })
    .when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      resolve: {
          currentAuth: function(Authentication) {
              return Authentication.requireAuth();
          } //current Auth
      } //resolve
    })
    .otherwise({
      redirectTo: '/login'
    });
    //$locationProvider.html5Mode(true);    //brukes for å fjerne # i URL: se oversiktsbilde:https://youtu.be/XsRugDQaGOo?t=69 
}]);
