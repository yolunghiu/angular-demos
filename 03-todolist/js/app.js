(function (angular) {
    'use strict';

    var app = angular.module('myApp', []);
    app.controller('listController', ['$scope', function ($scope) {
        // the item's id in edit
        $scope.editingId = -1;

        $scope.todos = [];

        $scope.newContent = '';

        $scope.todos.push({id: 1, content: 'taste javascript', done: false});
        $scope.todos.push({id: 2, content: 'taste ng', done: true});

        // press Enter to create a new todo item
        $scope.addNewItem = function () {
            if ($scope.newContent == '') {
                return;
            }

            var item = {};
            var maxId = $scope.todos.length == 0 ? -1 : $scope.todos[$scope.todos.length - 1].id;
            item.id = maxId + 1;
            item.content = $scope.newContent;
            item.done = false;

            $scope.todos.push(item);

            $scope.newContent = '';
        };

        // delete an existing todo item
        $scope.deleteItem = function (id) {
            for (var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].id === id) {
                    $scope.todos.splice(i, 1);
                    break;
                }
            }
        };

        // clear completed items
        $scope.clearCompleted = function () {
            var result = [];
            for(var i = 0; i < $scope.todos.length; i++) {
                if ($scope.todos[i].done == false) {
                    result.push($scope.todos[i]);
                }
            }

            $scope.todos = result;
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
            for(var i = 0; i < $scope.todos.length; i++) {
                $scope.todos[i].done = flag;
            }

            flag = !flag;
        };
    }]);

})(angular);
