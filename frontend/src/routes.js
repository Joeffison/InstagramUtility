angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/controllers/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    });

  $stateProvider
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/controllers/profile/profile.html',
      controller: 'ProfileController',
      controllerAs: 'vm',
      params: {
        cred: null
      },
      resolve: {

        // A string value resolves to a service
        resource: 'instagramAPIService',

        // A function value resolves to the return value of the function
        instaUser: function(resource, $stateParams){
          return resource.login($stateParams.cred.username, $stateParams.cred.pwd);
        }
      }
    });
}
