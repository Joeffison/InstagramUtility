function instagramUserListController(instagramAPIService, visualElementsService) {
  let vm = this;

  this.$onInit = function() {
    this.parentToChildNotificationRegistration({
      handler: this.processParentNotification,
      actionName: this.actionName
    });

    angular.element('.modal').modal({
      complete: () => visualElementsService.hideProgressBar()
    });
  };

  this.processParentNotification = function(parentValue) {
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

  this.follow = (user) => instagramAPIService.follow([user], function (response) {
    user.isFollowing = true;
    visualElementsService.hideProgressBar();
  });

  this.unfollow = (user) => instagramAPIService.unfollow([user], function (response) {
    user.isFollowing = false;
    visualElementsService.hideProgressBar();
  });
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
