angular.module('dashboardApp')
.component('headerComponent', {
  templateUrl: './public/header/header.component.html',
  controller: ['$http', '$scope', 'searchService', HeaderController]
});

function HeaderController($http, $scope, searchService) {
  var self = this;
  self.filters = {
    query: '',
    city: '',
    type: ''
  };

  self.clearForm = function() {
    self.filters.query = '';
    self.filters.city = '';
    self.filters.type = '';
  };

  searchService.search = self.filters;

  self.httpRequestHeader = function() {
    $http({
      method: 'POST',
      url: '/api/config/get_settings/'
    })
    .then(function(res) {
      if(res.status === 200) {
        self.settings = res.data;
      }
    });
  };

  $scope.$on('header:update', function() {
    self.httpRequestHeader();
  });

  self.httpRequestHeader();


  var element = document.getElementById('header_map'),
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
