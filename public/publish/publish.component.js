angular.module('dashboardApp')
.component('publishComponent', {
  templateUrl: './public/publish/publish.component.html',
  controller: ['$http', PublishController]
});

function PublishController($http) {
  var self = this;

  var element = document.getElementById('map'),
      config = {},
      map;

  function isNavigateAccess(callback) {
    if('geolocation' in navigator) {
      return callback;
    } else {
      return callback(false);
    }
  }

  function requsetCoordinatesFromNavigator(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
      if (position.coords) {
        return callback(position);
      } else {
        return callback(false);
      }
    });
  }

  function createMap(position) {
    let settings =  new GmapSettings(position);
    map = new google.maps.Map(element, settings);
  }

  isNavigateAccess(requsetCoordinatesFromNavigator(createMap));

}
