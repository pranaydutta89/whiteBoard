app.directive('uniqueGroupname', ['config', '$q', 'apiService', function (config, $q, apiService) {

	var directive = {};
	directive.require = 'ngModel';
	directive.link = function (scope, elem, attr, ngModel) {

		ngModel.$asyncValidators.unique = function (groupName) {
			var def = $q.defer();
			apiService.getData(config.apiBaseUrl + 'user?groupName=' + groupName).then(function (res) {
			
				if (res)
					def.resolve();
				else
					def.reject();
			}, function () {
				def.reject();
			});

			return def.promise;
		};
	};

	return directive;
}]);