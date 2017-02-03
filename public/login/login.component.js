angular.module('dashboardApp')
.component('loginComponent', {
  templateUrl: './public/login/login.component.html',
  controller: ['$http', LoginController]
});

function LoginController() {

}
