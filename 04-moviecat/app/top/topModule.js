(function (angular) {
	'use strict';

	var topModule = angular.module('movieCat.topModule', ['ngRoute']);

	topModule.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/top', {
			controller: 'TopController',
			templateUrl: 'top/top.html'
		});
	}]);

	topModule.controller('TopController', ['$scope', function () {

	}]);
})(angular);
