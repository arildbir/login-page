myApp.controller('SuccessController', ['$scope','Authentication', function($scope, Authentication) {
  
    $scope.logout = function() {   //logout() is used in both login.html and register.html
    Authentication.logout();
    };
    
    $scope.message = "Success! Do tha robot controller dance!";
    
    
    
}]);