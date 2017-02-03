angular.module('dashboardApp', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('main', {
      url: '/',
      component: 'mainComponent'
    })
    .state('login', {
      url: '/login',
      component: 'loginComponent'
    });
})
.run(function($state) {
  // $state.go('main');
});
