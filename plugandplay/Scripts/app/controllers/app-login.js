app.controller('loginController', ['$scope', 'signalrService', '$modalInstance','apiService','config', function ($scope, signalrService, $modalInstance,apiService,config) {


    $scope.$watch('userData.inGroup.groupName', function (newValue, oldValue) {
        apiService.getData(config.apiBaseUrl + 'user?groupName=' + newValue).then(function (data) {
            $scope.groupDetails = data;
        });
    });

    $scope.login = function () {
        signalrService.invoke('appHub', 'addUser', $scope.userData).then(function (res) {

            $modalInstance.close(res);

        });
    }

}])