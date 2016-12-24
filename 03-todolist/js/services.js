(function (angular) {
    var serviceModule = angular.module('myApp.serviceModule', []);
    serviceModule.service('MainService', ['$rootScope', '$window', function ($rootScope, $window) {
        var storage = $window.localStorage;

        var todos = storage.getItem('todos') ? JSON.parse(storage.getItem('todos')) : [];

        // get todos from localStorage
        this.getTodos = function () {
            return todos;
        };

        // save the current todos
        this.save = function () {
            storage.setItem('todos', JSON.stringify(todos));

            $rootScope.$broadcast('update');
        };

        // add new item
        this.addNewItem = function (content) {
            var item = {};
            var maxId = todos.length == 0 ? -1 : todos[todos.length - 1].id;
            item.id = maxId + 1;
            item.content = content;
            item.done = false;

            todos.push(item);

            this.save();
        };

        // delete one item
        this.deleteItem = function (id) {
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id === id) {
                    todos.splice(i, 1);
                    break;
                }
            }
            this.save();
        };

        this.clearCompletedItems = function () {
            var result = [];
            for (var i = 0; i < todos.length; i++) {
                if (todos[i].done == false) {
                    result.push(todos[i]);
                }
            }

            todos = result;
            this.save();
        };

        this.toggleAll = function (flag) {
            for (var i = 0; i < todos.length; i++) {
                todos[i].done = flag;
            }

            this.save();
        };

    }]);

})(angular);