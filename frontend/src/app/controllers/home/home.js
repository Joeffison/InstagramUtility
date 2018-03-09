function HomeController(instagramAPIService, $timeout) {
  var vm = this;

  vm.username = '';
  vm.pwd = '';

  vm.login = function () {
    instagramAPIService.login(vm.username, vm.pwd, function (response) {
      console.log(response);
      vm.user = response.data
    });
  }

}

angular.module('app')
  .controller('HomeController', ['instagramAPIService', '$timeout',
    HomeController]);
