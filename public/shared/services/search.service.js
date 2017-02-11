angular.module('dashboardApp')
.service('searchService', function() {
  this.search = {
    query: '',
    type: '',
    city: ''
  };
});
