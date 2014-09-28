'use strict';

angular.module('kakakumeApp', [
  'onsen',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/view/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'app/view/main.html',
        controller: 'MainCtrl'
      })
      .when('/', {
        // templateUrl: 'app/main/main.html',
        // controller: 'MainCtrl'
        templateUrl: 'app/view/login.html',
        controller: 'LoginCtrl'
      })
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

      if ($window.user) {
        sessionService.authSuccess($window.user);
      }
    }
  ]);