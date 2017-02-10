angular.module('dashboardApp')
.component('loginComponent', {
  templateUrl: './public/login/login.component.html',
  controller: ['$http', '$state', '$scope', LoginController]
});

function LoginController($http, $state, $scope) {
  var self = this;
  self.error = {};
  self.signin = {};
  self.signup = {};

  self.signInRequest = function() {
    if(self.signin.login && self.signin.password) {
      $http({
        method: 'POST',
        url: '/api/login/',
        data: self.signin
      })
      .then(function(res) {
        if (res.status === 200) {
          if(res.data.error) {
            self.error.signin = res.data.description;
          } else {
            $state.go('main');
            $scope.$emit('user:login');
          }
        }
      });
    } else {
      self.error.signin = 'Enter valid data';
    }
  };

  self.signUpRequest = function() {
    $http({
      method: 'POST',
      url: '/api/registration/',
      data: self.signup
    })
    .then(function(res) {
      if (res.status === 200) {
        if(res.data.error) {
          self.error.signup = res.data.description;
        } else {
          $state.go('main');
          $scope.$emit('user:login');
        }
      }
    });
  };
}
