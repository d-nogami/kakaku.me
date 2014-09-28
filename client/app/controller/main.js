'use strict';

angular.module('kakakumeApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.onMoveToPage2 = function () {
      app.splitView.toggle();
      app.splitView.setMainPage('page2.html');
      // setTimeout(initializePage2Map, 200);
      getCurrentLocation();
    }

    function getCurrentLocation() {
      navigator.geolocation.watchPosition(function(position){
        if(position.coords) {
          initializePage2Map(position.coords.latitude, position.coords.longitude);
        }
      })
    }

    function initializePage2Map(latitude, longitude) {
      var position = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
        center: position,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      var map = new google.maps.Map(document.getElementById("page2Map"), mapOptions);
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable:true,
        animation: google.maps.Animation.DROP,
      });
    }



  }]);