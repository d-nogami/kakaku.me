'use strict';

angular.module('kakakumeApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.awesomeThings = [];
    $scope.messages = {};


    function loadMessages() {
      $http.get('/api/secured/message').success(function(data) {
        $scope.messages.secured = data.message || data.error;
      });

      $http.get('/api/message').success(function(data) {
        $scope.messages.unsecured = data.message || data.error;
      });
    }

    // Debug code for auth
    var deregistration = $rootScope.$on('session-changed', loadMessages);
      $scope.$on('$destroy', deregistration);

    loadMessages();


    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  }]);