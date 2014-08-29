'use strict';

angular.module('kakakumeApp')
  .controller('LoginCtrl', ['$scope', '$rootScope', 'Event', 'sessionService', function ($scope, $rootScope, Event, sessionService) {

    var deregistration

    $scope.isLoggedin = sessionService.isLoggedIn;
    $scope.onLogin = onLogin;
    $scope.onLogout = onLogout;

    deregistration = $scope.$on(Event.SESSION_UPDATE, function () {
      $scope.isLoggedIn = sessionService.isLoggedIn;
    });
    $scope.$on('$destroy', deregistration);

    function onLogin () {
      sessionService.facebookLogin();
    }

    function onLogout () {
      sessionService.logout();
    }


  }]);