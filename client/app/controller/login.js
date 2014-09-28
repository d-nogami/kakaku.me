'use strict';

angular.module('kakakumeApp')
  .controller('LoginCtrl', ['$scope', '$location', '$rootScope', 'Event', 'sessionService', function ($scope, $location, $rootScope, Event, sessionService) {

    var deregistration

    $scope.isLoggedIn = sessionService.isLoggedIn;
    $scope.onLogin = onLogin;
    $scope.onLogout = onLogout;

    deregistration = $scope.$on(Event.SESSION_UPDATE, function () {
      $scope.isLoggedIn = sessionService.isLoggedIn;
      $location.path('/home');
    });
    $scope.$on('$destroy', deregistration);

    if ($scope.isLoggedIn) {
      $location.path('/home');
    }

    function onLogin () {
      sessionService.facebookLogin();
    }

    function onLogout () {
      sessionService.logout();
    }


  }]);