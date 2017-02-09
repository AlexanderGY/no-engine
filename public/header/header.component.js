angular.module('dashboardApp')
.component('headerComponent', {
  templateUrl: './public/header/header.component.html',
  controller: ['$http', '$scope', HeaderController]
});

function HeaderController($http, $scope) {
  var self = this;

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

  $scope.$on('userLogOut', function() {
    self.httpRequestHeader();
  });

  self.httpRequestHeader();

}
