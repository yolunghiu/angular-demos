(function (angular) {
	'use strict';

	var movieListModule = angular.module('movieCat.movieListModule', ['ngRoute', 'movieCat.jsonpModule']);

	movieListModule.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/:category/:pageNumber', {
				controller: 'MovieListController',
				templateUrl: 'movie_list/movieList.html'
			});
	}]);

	movieListModule.controller('MovieListController', ['$scope', '$route', '$routeParams', 'JSONPService', function ($scope, $route, $routeParams, JSONPService) {
		$scope.loading = true;	// 是否是正在加载数据的状态

		$scope.infos = [];	// 所有电影数据
		$scope.title = '';	// 该模块的标题
		$scope.message = '';	// 提示信息
		$scope.totalItems = 0;	// 电影记录总数
		$scope.totalPages = 0;	// 总页数
		$scope.pageNumber = $routeParams.pageNumber; // 当前页码
		$scope.category = $routeParams.category;
		var count = 10; // 每页的记录数：10条
		var start = ($scope.pageNumber - 1) * count; // 从这条记录开始


		JSONPService.jsonp('http://api.douban.com/v2/movie/' + $scope.category, {
			count: count,
			start: start
		}, function (response) {
			$scope.infos = response.subjects;
			$scope.title = response.title;
			$scope.totalItems = response.total;
			$scope.totalPages = Math.ceil($scope.totalItems / count);
			$scope.loading = false;
			$scope.$apply();
		});

		$scope.go = function (nextPage) {
			if (nextPage >= 1 && nextPage <= $scope.totalPages) {
				$route.updateParams({pageNumber: nextPage});
			}
		};

		$scope.previous = function () {
			var nextPage = parseInt($scope.pageNumber) - 1;
			$scope.go(nextPage);
		};

		$scope.next = function () {
			var nextPage = parseInt($scope.pageNumber) + 1;
			$scope.go(nextPage);
		};


		/*ng的get方法，此方法不支持跨域
		 $http({
		 method: 'GET',
		 // 路径最前面加一条斜线，代表绝对路径
		 url: '/AngularJS/04-moviecat/app/data/hot.json'
		 }).then(function successCallback(response) {
		 console.log(response);

		 if (response.status == 200) {
		 $scope.infos = response.data.subjects;
		 } else {
		 $scope.message = '获取信息失败，错误信息：' + response.statusText;
		 }

		 }, function errorCallback(response) {
		 $scope.message = '获取信息失败，错误信息：' + response.statusText;
		 });*/

		/*以下代码是ng的jsonp使用方式，但是豆瓣api不支持这种方式
		 var doubanApiAddress = 'http://api.douban.com/v2/movie/in_theaters';
		 // 测试$http服务
		 // 在Angular中使用JSONP的方式做跨域请求，
		 // 就必须给当前地址加上一个参数 callback=JSON_CALLBACK
		 $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(res) {
		 // 此处代码是在异步请求完成过后才执行（需要等一段时间）
		 if (res.status == 200) {
		 $scope.subjects = res.data.subjects;
		 } else {
		 $scope.message = '获取数据错误，错误信息：' + res.statusText;
		 }
		 }, function(err) {
		 console.log(err);
		 $scope.message = '获取数据错误，错误信息：' + err.statusText;
		 });*/
	}]);
})(angular);
