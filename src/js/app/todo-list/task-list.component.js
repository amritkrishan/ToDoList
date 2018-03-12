angular.module('taskList').
directive('taskList', function() {
	return {
		restrict: 'E',
		templateUrl: './task-list.template.html',
		controller: "tasklistController",
		scope:{
			"tasks": "=tasks",
			"title": "=title"
		}
	}
})
.controller('tasklistController',function($scope){
	console.log($scope.tasks, $scope.title)
})
