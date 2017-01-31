angular.module('dashboardApp')
.component('mainComponent', {
  templateUrl: './public/main/main.component.html',
  controller: ['$http', MainController]
});

function MainController($http) {
  var self = this;

  $http({
    method: 'POST',
    url: '/'
  })
  .then(function(res) {
    if (res.status === 200) {
      self.posts = res.data;
    }
  });
}
