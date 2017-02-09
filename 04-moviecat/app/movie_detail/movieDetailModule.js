(function (angular) {
	'use strict';

	var movieDetailModule = angular.module('movieCat.movieDetailModule', ['ngRoute', 'movieCat.jsonpModule']);

	movieDetailModule.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/detail/:id', {
				controller: 'MovieDetailController',
				templateUrl: 'movie_detail/movieDetail.html'
			});
	}]);

	movieDetailModule.controller('MovieDetailController', ['$scope', '$route', '$routeParams', 'JSONPService', 'APPConfig', function ($scope, $route, $routeParams, JSONPService, APPConfig) {
		$scope.loading = true;	// 是否是正在加载数据的状态
		$scope.movie = {};

		JSONPService.jsonp(APPConfig.detailApiAddress + $routeParams.id, {}, function (response) {
			$scope.movie = response;
			$scope.loading = false;
			$scope.$apply();
		});
	}]);
})(angular);
