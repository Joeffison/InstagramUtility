angular
  .module('app')
  .component('mainHeader', {
    templateUrl: 'app/components/header/header.html'
  });

angular.element(document).ready(() => angular.element('.button-collapse').sideNav());
