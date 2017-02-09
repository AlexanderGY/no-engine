angular.module('dashboardApp')
.component('settingsComponent', {
  templateUrl: './public/settings/settings.component.html',
  controller: ['$http', '$state', '$scope', SettingsController]
});

function SettingsController($http, $state, $scope) {
  var self = this;
  self.removeSession = function() {
    console.log('Success');
    $http({
      method: 'POST',
      url: '/api/exit/'
    })
    .then(function(res) {
      $state.go('main');
      $scope.$emit('userLogOut');
    });
  };
}
