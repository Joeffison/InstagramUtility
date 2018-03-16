function instagramAPIService(visualElementsService,
                             $http, $cookies, $state) {
  const service = this;
  const INSTA_API = 'https://instautil.herokuapp.com:8000/instagram/';

  service.login = function (username, password, onSuccess, onError) {
    visualElementsService.showProgressBar();
    $cookies.put('username', username);
    $cookies.put('pwd', password);

    return $http.post(INSTA_API + 'login/', {username, password}).then(response => {
      visualElementsService.hideProgressBar();
      setUserProperties(response.data);

      if (onSuccess) {
        onSuccess(response);
      }

      return response.data;
    }, response => {
      visualElementsService.hideProgressBar();

      if (onError) {
        onError(response);
      }

      $state.go('home', {loginFailed: true});
    });
  };

  service.follow = function (users, onSuccess) {
    $http.post(INSTA_API + 'follow/', getPatchJSON(users)).then(onSuccess);
  };

  service.unfollow = function (users, onSuccess) {
    $http.post(INSTA_API + 'unfollow/', getPatchJSON(users)).then(onSuccess);
  };

  return service;

  function setUserProperties(instaUser) {
    angular.forEach(instaUser.followers, follower => {
      follower.metaIsLoading = false;
      follower.isFollower = true;
      follower.isFollowing = userIsIn(follower, instaUser.followings);
    });

    angular.forEach(instaUser.followings, following => {
      following.metaIsLoading = false;
      following.isFollowing = true;
      following.isFollower = userIsIn(following, instaUser.followers);
    });

    instaUser.notFollowers = instaUser.followings.filter(user => !user.isFollower);
    instaUser.notFollowings = instaUser.followers.filter(user => !user.isFollowing);
  }

  function usersNotIn(users, array) {
    return users.filter(user1 => !array.some(user2 => user1.pk === user2.pk));
  }

  function userIsIn(user, array) {
    return array.some(user2 => user.pk === user2.pk);
  }

  function getPatchJSON(users) {
    const users_ids = users.map(user => user.pk);
    return {username: $cookies.get('username'), password: $cookies.get('pwd'), users: users_ids};
  }
}

angular.module('app')
  .factory('instagramAPIService', ['visualElementsService',
    '$http', '$cookies', '$state',
    instagramAPIService]);
