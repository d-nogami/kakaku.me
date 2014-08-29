'use strict';

angular.module('kakakumeApp').factory('sessionService', ['$window', '$http', 'eventManager', 'Event', function ($window, $http, eventManager, Event) {
      var session = {
          init: function () {
              this.resetSession();
          },
          resetSession: function() {
              this.currentUser = null;
              this.isLoggedIn = false;
          },
          facebookLogin: function() {
              var url = '/auth/facebook',
              width = 1000,
              height = 650,
              top = (window.outerHeight - height) / 2,
              left = (window.outerWidth - width) / 2;
          $window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
          },
          logout: function() {
              var scope = this;
              $http.delete('/auth').success(function() {
                  scope.resetSession();
                  eventManager.broadcast(Event.SESSION_UPDATE);
              });
          },
          authSuccess: function(userData) {
              this.currentUser = userData;
              this.isLoggedIn = true;
              eventManager.broadcast(Event.SESSION_UPDATE);
          },
          authFailed: function() {
              this.resetSession();
              alert('Authentication failed');
          }
      };
      session.init();
      return session;
}]);