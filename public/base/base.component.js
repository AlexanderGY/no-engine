angular.module('dashboardApp')
.component('baseComponent', {
  templateUrl: './public/base/base.component.html',
  controller: ['$scope', BaseController]
});

function BaseController($scope) {
  var self = this;

  self.updateHeader = function() {
    $scope.$broadcast('header:update');
  };

  $scope.$on('user:login', self.updateHeader);
  $scope.$on('user:logout', self.updateHeader);
  $scope.$on('publish:ready', self.decreaseHeader);
}
