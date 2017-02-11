angular.module('dashboardApp')
.component('mainComponent', {
  templateUrl: './public/main/main.component.html',
  controller: ['$http', 'searchService', MainController]
});

function MainController($http, searchService) {
  var self = this;
  self.filters = searchService.search;

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
