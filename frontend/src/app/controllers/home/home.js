function HomeCtrl($timeout) {
  const vm = this;
  vm.value = '1000';
}

angular.module('app')
  .controller('HomeController', ['$timeout',
    HomeCtrl]);
