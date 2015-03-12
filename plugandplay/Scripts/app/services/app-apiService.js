app.service('apiService', ['$http', function ($http) {

    this.getData = function (url) {

        return $http.get(url).then(function (res) {
            return res.data;
        });
    }

    this.postData = function (url, formData) {

        return $http.post(url, formData).then(function (res) {
            return res.data;
        });

    }

}]);