'use strict';

angular.module('kakakumeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }).run(['$rootScope', '$window', 'sessionService',
    //Initialize App
    function ($rootScope, $window, sessionService) {
      $rootScope.session = sessionService;

      //for recieve redirect from auth window.
      $window.app = {
        authState: function(state, user) {
          $rootScope.$apply(function() {
            switch (state) {
              case 'success':
                sessionService.authSuccess(user);
              break;
              case 'failure':
                sessionService.authFailed();
              break;
            }
          });
        }
      };

      if ($window.user !== null) {
        sessionService.authSuccess($window.user);
      }
    }
  ]);