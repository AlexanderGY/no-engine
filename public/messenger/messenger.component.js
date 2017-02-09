angular.module('dashboardApp')
.component('messengerComponent', {
  templateUrl: './public/messenger/messenger.component.html',
  controller: ['$http', MessengerController]
});

function MessengerController($http) {
  var self = this;

}
