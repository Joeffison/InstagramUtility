function HomeController(instagramAPIService, $state) {
  var vm = this;

  vm.username = '';
  vm.pwd = '';

  vm.login = function () {
    instagramAPIService.login(vm.username, vm.pwd, function (response) {
      vm.user = response.data;
      $state.go('profile', {instaUser: vm.user});
    });
  }

}

angular.module('app')
  .controller('HomeController', ['instagramAPIService', '$state',
    HomeController]);
