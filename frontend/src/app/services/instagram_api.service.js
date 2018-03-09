function instagramAPIService($http) {
  let service = this;

  service.login = function (username, password, onSuccess) {
    $http.post('http://localhost:8000/instagram-login/', {username: username, password: password}).then(onSuccess);
  };

  return service;
}

angular.module('app')
  .factory('instagramAPIService', ['$http',
    instagramAPIService]);
