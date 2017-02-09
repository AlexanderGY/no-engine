angular.module('dashboardApp')
.component('itemComponent', {
  templateUrl: './public/item/item.component.html',
  controller: ['$http', ItemController]
});

function ItemController($http) {
  var self = this;
  self.openItemDemand = function(url, event) {
    console.log(event);
    event.preventDefault();
  };
}
