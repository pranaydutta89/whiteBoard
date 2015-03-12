app.directive('ngEnter', ['$timeout',function ($timeout) {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                $timeout(function () {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                }, 400);
                event.preventDefault();
            }
        });
    };
}]);