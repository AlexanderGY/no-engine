angular.module('dashboardApp')
.component('publishComponent', {
  templateUrl: './public/publish/publish.component.html',
  controller: ['$http', '$scope', PublishController]
});

function PublishController($http, $scope) {
  var self = this;
  

}
