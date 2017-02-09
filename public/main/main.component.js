angular.module('dashboardApp')
.component('mainComponent', {
  templateUrl: './public/main/main.component.html',
  controller: ['$http', MainController]
});

function MainController($http) {
  var self = this;

  /**
   * [openItemDemand description]
   * @param  {String} url   url from ng repeat render
   * @param  {Event} event event of click
   * @return {[type]}       [description]
   */
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
