function HomeController(instagramAPIService, visualElementsService,
                        $state, $cookies) {
  let vm = this;

  vm.username = '';
  vm.pwd = '';

  vm.login = function () {
    visualElementsService.showProgressBar();
    instagramAPIService.login(vm.username, vm.pwd, function (response) {
      vm.user = response.data;
      $state.go('profile', {instaUser: vm.user});
    });
  }

}

angular.module('app')
  .controller('HomeController', ['instagramAPIService', 'visualElementsService',
    '$state', '$cookies',
    HomeController]);
