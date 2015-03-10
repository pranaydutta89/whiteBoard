

app.config(['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {

    $urlMatcherFactoryProvider.caseInsensitive(false);
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider.state('portal', {
        url: '/app',
        templateUrl: 'templates/master.html',
        abstract: true,
        controller:'masterController',
        resolve: {
            user: ['userService', function (userService) {
                return userService.getUser();
            }]
        }

    }).state('portal.home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'homeController'
        

    })



    $urlRouterProvider.otherwise('/app/home');




}])