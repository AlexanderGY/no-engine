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
    })
    .state('publish', {
      url: '/publish',
      component: 'publishComponent'
    })
    .state('dashboard', {
      url: '/dashboard',
      component: 'dashboardComponent'
    })
    .state('balance', {
      url: '/balance',
      component: 'balanceComponent'
    })
    .state('settings', {
      url: '/settings',
      component: 'settingsComponent'
    })
    .state('messenger', {
      url: '/messenger',
      component: 'messengerComponent'
    });
    $urlRouterProvider.otherwise('/');
});
