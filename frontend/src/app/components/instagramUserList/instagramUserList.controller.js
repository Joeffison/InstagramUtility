function instagramUserList() {
  var vm = this;

  this.$onInit = function() {
    this.parentToChildNotificationRegistration({
      handler: this.processParentNotification,
      actionName: this.actionName
    });

    angular.element('.modal').modal();
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
}

angular.module('app').component('instagramUserList', {
  templateUrl: 'app/components/instagramUserList/instagramUserList.html',
  controller: instagramUserList,
  bindings: {
    users: '<',
    actionName: '<',
    title: '<',
    parentToChildNotificationRegistration: '&'
  }
});

// angular.element(document).ready(() => angular.element('.modal').modal());
