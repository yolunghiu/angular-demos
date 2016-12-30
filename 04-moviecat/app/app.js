(function (angular) {
	'use strict';

	var movieCat = angular.module('movieCat', ['ngRoute', 'movieCat.movieListModule']);

	movieCat.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);

})(angular);
