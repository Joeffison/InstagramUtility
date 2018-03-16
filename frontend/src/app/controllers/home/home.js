function HomeController(instagramAPIService, visualElementsService,
                        $state, $stateParams) {
  const vm = this;

  vm.username = '';
  vm.pwd = '';
  vm.loginFailed = $stateParams.loginFailed;

  vm.login = function () {
    $state.go('profile', {cred: {username: vm.username, pwd: vm.pwd}});
  };
}

angular.module('app')
  .controller('HomeController', ['instagramAPIService', 'visualElementsService',
    '$state', '$stateParams',
    HomeController]);
