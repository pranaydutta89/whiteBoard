


app.factory('httpInterceptor', function () {


    return {
        'request': function (config) {

            //config.headers.Authorization = tokenHandler.getSecretToken();
            return config;

        },
        'requestError': function () {
            this.$log.error('interceptor response error', _rejection);
            return this.errorService.httpErrorHandler(_rejection)
        },
        'response': function () {

        },
        'responseError': function () {

        }
       

    }
})

