angular.module('dashboardApp')
.component('balanceComponent', {
  templateUrl: './public/balance/balance.component.html',
  controller: ['$http', BalanceController]
});

function BalanceController($http) {
  var self = this;

}
