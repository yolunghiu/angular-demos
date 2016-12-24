(function (angular) {
    'use strict';

    var controllerModule = angular.module('myApp.controllerModule', ['ngRoute', 'myApp.serviceModule']);

    controllerModule.controller('MainController', ['$scope', '$routeParams', 'MainService', function ($scope, $routeParams, MainService) {
        $scope.status = $routeParams['status'];

        $scope.$on('update', function () {
            $scope.todos = MainService.getTodos();
        });

        // the item's id in edit
        $scope.editingId = -1;

        $scope.todos = MainService.getTodos();

        $scope.newContent = '';

        // press Enter to create a new todo item
        $scope.addNewItem = function () {
            if ($scope.newContent == '') {
                return;
            }

            MainService.addNewItem($scope.newContent);
            $scope.newContent = '';
        };

        // delete an existing todo item
        $scope.deleteItem = function (id) {
            MainService.deleteItem(id);
        };

        // clear completed items
        $scope.clearCompleted = function () {
            MainService.clearCompletedItems();
        };

        // check if there exists completed item in todos
        $scope.existsCompletedItem = function () {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].done === true) {
                    return true;
                }
            }

            return false;
        };

        // double click the text to edit
        $scope.editing = function (id) {
            $scope.editingId = id;
        };

        // press Enter to save editing
        $scope.save = function () {
            $scope.editingId = -1;
        };

        // toggle the status of all items
        var flag = true;
        $scope.toggleAll = function () {
            MainService.toggleAll(flag);
            flag = !flag;
        };

        $scope.status = $routeParams['status'];

        // 用于过滤active和completed的item，默认情况下为undefined，什么都不过滤
        $scope.filterType = {};
        switch ($scope.status) {
            case 'active':
                $scope.filterType = {done: false};
                break;
            case 'completed':
                $scope.filterType = {done: true};
                break;
            default:
                $scope.filterType = {};
                break;
        }

        $scope.compare = function (source, target) {
            console.log(source);
            console.log(target);
            return angular.equals(source, target);
        };
    }]);
})(angular);