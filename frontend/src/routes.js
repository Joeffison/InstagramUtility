angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $transitionsProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/controllers/home/home.html',
      controller: 'HomeController',
      controllerAs: 'vm',
      params: {
        loginFailed: false
      }
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
        instaUser: (resource, $stateParams) => {
          if ($stateParams.cred) {
            return resource.login($stateParams.cred.username, $stateParams.cred.pwd);
          }
          return null;
        }
      }
    });

  $transitionsProvider.onBefore({}, transition => {
    if ((!transition.from() || !transition.from().name) && transition.to().name !== 'home') {
      return transition.router.stateService.target('home');
    }
  });
}
