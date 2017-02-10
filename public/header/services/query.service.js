angular.module('dashboardApp')
.service('queryService', function() {
  this.search = {
    query: '',
    type: '',
    city: ''
  };
  
  this.getPrivate = function() {
    return thisIsPrivate;
  };
});
