angular.module('dashboardApp')
.component('headerComponent', {
  templateUrl: './public/header/header.component.html',
  controller: ['$http', HeaderController]
});

function HeaderController($http) {
  var self = this;
  $http({
    method: 'POST',
    url: '/api/config/get_settings/'
  })
  .then(function(res) {
    if(res.status === 200) {
      self.settings = res.data;
    }
  });
}
