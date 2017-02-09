angular.module('dashboardApp')
.component('dashboardComponent', {
  templateUrl: './public/dashboard/dashboard.component.html',
  controller: ['$http', DashboardController]
});

function DashboardController($http) {
  var self = this;
  
}
