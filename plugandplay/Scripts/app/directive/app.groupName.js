app.directive('unique-groupName', function () {

	var directive = {};
	directive.require = 'ngModel';
	directive.link = function (scope, elem, attr, ngModel) {

		ngModel.$asyncValidators.unique = function (username) {
			var def = $q.defer();
			apiService.getData(urlMapper.userUrl + '/isUserPresent?emailId=' + username).then(function (res) {
				if (res != true)
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
})