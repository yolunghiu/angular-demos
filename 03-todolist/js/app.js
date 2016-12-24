(function (angular) {
    'use strict';

    var app = angular.module('myApp', ['ngRoute', 'myApp.controllerModule', 'myApp.serviceModule']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/:status?', {
                controller: 'MainController',
                templateUrl: 'main_tmpl'
            });
    }]);
})(angular);
