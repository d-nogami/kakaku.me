angular.module('kakakumeApp')
  .constant(
	 'Event', {
	   'SESSION_UPDATE': 'session_update'
    }
  );


angular.module('kakakumeApp')
  .service('eventManager',['$rootScope', function ($rootscope) {
      'use strict';

      this.broadcast = function (eventName, dataObject) {
        $rootscope.$broadcast(eventName, dataObject);
      }
    }
  ]);