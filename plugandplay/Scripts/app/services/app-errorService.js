app.service('errorService', ['$rootScope', function ($rootScope) {


    this.stateChangeError = function (event, toState, toParams, fromState, fromParams, error) {
        
            event.preventDefault();
       }
}]);