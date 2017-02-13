(function (angular) {
    'use strict';

    var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

    animateApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'page-home.html',
            controller: 'mainController'
        }).when('/about', {
            templateUrl: 'page-about.html',
            controller: 'aboutController'
        }).when('/contact', {
            templateUrl: 'page-contact.html',
            controller: 'contactController'
        }).otherwise({redirectTo: '/'});
    }]);

    // home page controller
    animateApp.controller('mainController', function ($scope) {
        $scope.pageClass = 'page-home';
    });

    // about page controller
    animateApp.controller('aboutController', function ($scope) {
        $scope.pageClass = 'page-about';
    });

    // contact page controller
    animateApp.controller('contactController', function ($scope) {
        $scope.pageClass = 'page-contact';
    });

})(angular);