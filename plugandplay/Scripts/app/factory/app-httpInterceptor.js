


app.factory('httpInterceptor', ['$q', function ($q) {


    return {
        'request': function (config) {

            //config.headers.Authorization = tokenHandler.getSecretToken();
            return config;

        },
        'requestError': function () {

            return $q.reject();
        },
        'response': function (data) {
            return data;
        },
        'responseError': function (rejection) {
            return $q.reject(rejection);
        }


    }
}]);

