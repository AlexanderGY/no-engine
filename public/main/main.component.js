angular.module('dashboardApp')
.component('mainComponent', {
  templateUrl: './public/main/main.component.html',
  controller: ['$http', MainController]
});

function MainController($http) {
  var self = this;

  self.openItemDemand = function(url, event) {
    console.log(event);
    event.preventDefault();
  };

  $http({
    method: 'POST',
    url: '/api/items/get_items/'
  })
  .then(function(res) {
    if (res.status === 200) {
      self.posts = res.data;
    }
  });
}
