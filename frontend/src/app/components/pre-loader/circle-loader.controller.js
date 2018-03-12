function circleLoaderController() {
  let vm = this;

  this.$onInit = function() {
    this.parentToChildNotificationRegistration({
      handler: this.processParentNotification,
      actionName: this.actionName
    });
  };

  this.processParentNotification = function(parentValue) {
    switch (parentValue.action) {
      case 'open':
        vm.isOpen = true;
        break;
      case 'close':
        vm.isOpen = false;
        break;

      default:
        break;
    }
  };
}

angular.module('app').component('circleLoader', {
  templateUrl: 'app/components/pre-loader/circle-loader.html',
  controller: circleLoaderController,
  bindings: {
    parentToChildNotificationRegistration: '&'
  }
});

