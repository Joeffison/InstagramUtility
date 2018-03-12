function ProfileController(instaUser,
                           instagramAPIService, visualElementsService) {
  const vm = this;

  vm.instaUser = instaUser;
  vm.actionHandlers = new Map();

  vm.$onInit = function () {
    vm.actions = {
      PROFILE: 'PROFILE',
      FOLLOWERS: 'FOLLOWERS',
      FOLLOWING: 'FOLLOWING',
      NOT_FOLLOWERS: 'NOT_FOLLOWERS',
      NOT_FOLLOWING: 'NOT_FOLLOWINGS'
    };
    vm.currentAction = vm.actions.PROFILE;
  };

  vm.followersComponentRegistration = function (handler) {
    vm.actionHandlers.set(vm.actions.FOLLOWERS, handler);
  };

  vm.followingsComponentRegistration = function (handler) {
    vm.actionHandlers.set(vm.actions.FOLLOWING, handler);
  };

  vm.notFollowersComponentRegistration = function (handler) {
    vm.actionHandlers.set(vm.actions.NOT_FOLLOWERS, handler);
  };

  vm.notFollowingsComponentRegistration = function (handler) {
    vm.actionHandlers.set(vm.actions.NOT_FOLLOWING, handler);
  };

  vm.notifyChild = function (action) {
    if (vm.actionHandlers.size > 0) {
      if (vm.currentAction !== vm.actions.PROFILE) {
        vm.actionHandlers.get(vm.currentAction)({action: 'close'});
      }
      vm.currentAction = action;
      if (vm.currentAction !== vm.actions.PROFILE) {
        vm.actionHandlers.get(vm.currentAction)({action: 'open'});
        visualElementsService.showProgressBar();
      }
    }
  };
}

angular.module('app')
  .controller('ProfileController', ['instaUser',
    'instagramAPIService', 'visualElementsService',
    ProfileController]);
