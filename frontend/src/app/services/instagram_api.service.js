function instagramAPIService($http, $cookies) {
  const service = this;
  const INSTA_API = 'http://localhost:8000/instagram/';

  service.login = function (username, password, onSuccess) {
    $cookies.put('username', username);
    $cookies.put('pwd', password);
    $http.post(INSTA_API + 'login/', {username, password}).then(onSuccess);
  };

  service.follow = function (users, onSuccess) {
    $http.post(INSTA_API + 'follow/', getPatchJSON(users)).then(onSuccess);
  };

  service.unfollow = function (users, onSuccess) {
    $http.post(INSTA_API + 'unfollow/', getPatchJSON(users)).then(onSuccess);
  };

  return service;

  function getPatchJSON(users) {
    const users_ids = users.map(user => user.pk);
    return {username: $cookies.get('username'), password: $cookies.get('pwd'), users: users_ids};
  }
}

angular.module('app')
  .factory('instagramAPIService', ['$http', '$cookies',
    instagramAPIService]);
