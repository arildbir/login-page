myApp.controller('RegistrationController', ['$scope','Authentication', function($scope, Authentication) {
    
  $scope.login = function() {   //login() is used in login.html
    Authentication.login($scope.user);
  };

    $scope.logout = function() {   //logout() is used in both login.html and register.html
    Authentication.logout();
  };
    
  $scope.register = function() {    //register() is used in register.html
    Authentication.register($scope.user);
  };
  
}]);