app.controller('masterController', ['$scope', '$rootScope', 'signalrService', function ($scope, $rootScope, signalrService) {

    $rootScope.connectionState = signalrService.getCurrentState();
    $scope.logOut = function () {
        location.reload();
    }

}]);