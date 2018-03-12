function visualElementsService($http) {
  const service = this;

  service.showProgressBar = () => angular.element('#progress-bar').addClass('progress');
  service.hideProgressBar = () => angular.element('#progress-bar').removeClass('progress');

  return service;
}

angular.module('app')
  .factory('visualElementsService', visualElementsService);
