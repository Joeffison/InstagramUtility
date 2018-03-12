function HomeController(instagramAPIService, visualElementsService,
                        $state, $cookies) {
  const vm = this;

  vm.username = '';
  vm.pwd = '';

  vm.login = function () {
    $state.go('profile', {cred: {username: vm.username, pwd: vm.pwd}});
  };
}

angular.module('app')
  .controller('HomeController', ['instagramAPIService', 'visualElementsService',
    '$state', '$cookies',
    HomeController]);
