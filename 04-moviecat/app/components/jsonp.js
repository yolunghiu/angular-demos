(function(angular) {
    'use strict';

	var jsonpModule = angular.module('movieCat.jsonpModule', []);
	jsonpModule.service('JSONPService', ['$window', '$document', function ($window, $document) {

		this.jsonp = function (url, params, callback) {
			// 1.将callback函数绑定到window对象上
			var callbackName = 'callback_' + Math.random().toString().replace('.', '');
			$window[callbackName] = callback;

			// 2.拼接url和params
			var queryString = '?';
			for(var item in params) {
				queryString += ('&' + item + '=' + params[item]);
			}

			queryString += ('&callback=' + callbackName); // 指定回调函数的名字
			url += queryString;

			// 3.动态创建script节点，将其添加到html上
			var myScript = document.createElement('script');
			myScript.setAttribute('src', url);
			$document[0].body.appendChild(myScript);
		};

	}]);

})(angular);
