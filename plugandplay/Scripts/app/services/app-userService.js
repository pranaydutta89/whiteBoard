

app.service('userService', ['signalrService', '$q', '$modal', '$rootScope', function (signalrService, $q, $modal, $rootScope) {

    this.getUser = function () {

        var def = $q.defer();
        signalrService.invoke('appHub', 'checkUserOnlineStatus').then(function (userStatus) {
            if (!userStatus || $rootScope.user) {
                var modalInstance = $modal.open({
                    templateUrl: 'templates/user.html',
                    size: 'lg',
                    controller: 'loginController',
                    backdrop:'static'

                });
                modalInstance.result.then(function (userdata) {
                    $rootScope.user = userdata;
                    def.resolve(userdata);
                })
            }
            else {
                def.resolve($rootScope.user);
            }

        }, function () {

            def.reject();
        });
        return def.promise;
    }


}]);