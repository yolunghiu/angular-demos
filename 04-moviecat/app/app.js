(function (angular) {
	'use strict';

	var movieCat = angular.module('movieCat', ['ngRoute', 'movieCat.movieDetailModule', 'movieCat.movieListModule']);

	movieCat.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);

	movieCat.constant('APPConfig',{
		itemCount: 10, // 每页10条记录
		listApiAddress: 'http://api.douban.com/v2/movie/',
		detailApiAddress: 'http://api.douban.com/v2/movie/subject/'
	});

	movieCat.controller('MainController', ['$scope', '$route', function ($scope, $route) {
		$scope.viewNumber = 1;  // 默认显示第一个视图
		$scope.searchTxt = '';	// 搜索内容

		// 点击不同分类改变焦点状态
		$scope.changeView = function (number) {
			$scope.viewNumber = number;
		};

		// 搜索
		$scope.search = function () {
			console.log($scope.searchTxt);
			$route.updateParams({category: 'search', q: $scope.searchTxt});
		};
	}]);

})(angular);
