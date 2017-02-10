angular.module('dashboardApp')
.component('footerComponent', {
  templateUrl: './public/footer/footer.component.html',
  controller: ['$http', FooterController]
});

function FooterController() {
  var self = this;

}
