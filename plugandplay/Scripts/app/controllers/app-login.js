app.controller('loginController', ['$scope', 'signalrService', '$modalInstance', function ($scope, signalrService, $modalInstance) {

    $scope.login = function () {
        signalrService.invoke('appHub', 'addUser', $scope.userData).then(function (res) {

            $modalInstance.close(res);

        });
    }

}])