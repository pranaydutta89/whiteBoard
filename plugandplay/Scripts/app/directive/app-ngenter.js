app.directive('ngEnter', [function () {
    return {
        restrict: 'A',
        require: '^form',
        compile: function (element, attrs) {
            return function (scope, element, attrs, formCtrl) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                       
                        //scope.$apply(function () {
                        //    scope.$eval(attrs.ngEnter);
                        //});
                      //  formCtrl.commit();

                    //    event.preventDefault();
                    }
                });
            }
        }
      
    }

}]);