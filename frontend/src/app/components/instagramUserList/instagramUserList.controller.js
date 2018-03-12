function instagramUserListController(instagramAPIService, visualElementsService) {
  const vm = this;

  vm.$onInit = function () {
    this.parentToChildNotificationRegistration({
      handler: this.processParentNotification,
      actionName: this.actionName
    });

    angular.element('.modal').modal({
      complete: () => visualElementsService.hideProgressBar()
    });
  };

  vm.processParentNotification = function (parentValue) {
    switch (parentValue.action) {
      case 'open':
        vm.isOpen = true;
        angular.element('#modal_' + vm.actionName).modal('open');
        break;
      case 'close':
        vm.isOpen = false;
        angular.element('#modal_' + vm.actionName).modal('close');
        break;

      default:
        break;
    }
  };

  vm.follow = function (user) {
    user.metaIsLoading = true;

    instagramAPIService.follow([user], response => {
      user.metaIsLoading = false;
      user.isFollowing = true;
      visualElementsService.hideProgressBar();
    });
  };

  vm.unfollow = function (user) {
    user.metaIsLoading = true;

    instagramAPIService.unfollow([user], response => {
      user.metaIsLoading = false;
      user.isFollowing = false;
      visualElementsService.hideProgressBar();
    });
  };
}

angular.module('app').component('instagramUserList', {
  templateUrl: 'app/components/instagramUserList/instagramUserList.html',
  controller: ['instagramAPIService', 'visualElementsService',
    instagramUserListController],
  bindings: {
    users: '<',
    actionName: '<',
    actionTitle: '<',
    parentToChildNotificationRegistration: '&'
  }
});

// angular.element(document).ready(() => angular.element('.modal').modal());
