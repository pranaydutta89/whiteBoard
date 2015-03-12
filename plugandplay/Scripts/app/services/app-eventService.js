app.service('eventService', ['$rootScope', 'errorService', function ($rootScope, errorService) {


    angular.element(window).bind('blur', function () {
        $rootScope.isWindowFocused = false;
        $rootScope.$emit('windowBlur');
    });

    angular.element(window).bind('focus', function () {
        $rootScope.isWindowFocused = true;
        $rootScope.$emit('windowFocus');
    });

    $rootScope.$on('$stateChangeError', errorService.stateChangeError);

    $rootScope.$on('signalrStateChange', function (evnt, state) {
        $rootScope.connectionState = state;
    });

    $rootScope.$on('signalrTransportState', function (evnt, state) {
        $rootScope.ajaxCall = state == 'sending' ? true : false;
      
    });

}]);