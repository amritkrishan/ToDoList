angular.module('todoList').
directive('todoList', function(){
	return {
		templateUrl: './todo-list.template.html',
		controller:"todoListsCtrl",
		scope:{
			"group": "=",
			"allgroup": "=",
		}
	}
})
.controller('todoListsCtrl', function($scope) {
		$scope.colorOptions = {
			color: '#FFFF00',
			width: '200px',
			height: '20px',
		};  
		$scope.$watch('group', function(newVal, oldVal) {
            if(newVal != oldVal){
            	$scope.selectedList = {};
            	$scope.pendingList = [];
            	$scope.completedList = [];
            }
        });
        $scope.$watch('newListName', function(newVal, oldVal) {
        if(newVal != oldVal){
        	$scope.selectedList = {};
        	$scope.activeClass = "";
        	}
    	});
        $scope.$watch('pendingList', function(newVal, oldVal) {
            if(newVal != oldVal){
            	populateLists();
            }
        }, true);
        $scope.$watch('completedList', function(newVal, oldVal) {
            if(newVal != oldVal){
            	populateLists();
            }
        }, true);
		$scope.selectedList = {};
		$scope.newListName = "";
		$scope.snackbar;
		$scope.snackbarTasks;
		$scope.addList = function(){
			if($scope.newListName){
			$scope.group.lists.push({
				name:angular.copy($scope.newListName),
				tasks:[]
				});
				$scope.snackbar="List added successfully";
			}
			else{
				$scope.snackbar="List cannot be empty";
			}
			var x = document.getElementById("snack");
    		x.className = "show";
    		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			$scope.newListName = "";
		}
		$scope.isNotEmpty = function(obj){
		   for (var x in obj) { return true; }
		   return false;
		}
		function populateLists() {
			$scope.pendingList = $scope.getpendingtasks($scope.selectedList.tasks)
			$scope.completedList = $scope.getcompletedtasks($scope.selectedList.tasks)
		}
		$scope.setSelected = function(listRef){
			$scope.selectedList = listRef;
			$scope.activeClass = listRef.name;
			populateLists();
		}
		$scope.isSelected = function(listRef){
			return $scope.selectedList == listRef;
		}
		$scope.addTask = function(){
			if($scope.selectedList.newTaskName){
				$scope.selectedList.tasks.push({name: angular.copy($scope.selectedList.newTaskName), done:false});
				$scope.snackbarTasks="Task added successfully";
			}
			else
			{
				$scope.snackbarTasks="Task cannot be empty";
			}
			var x = document.getElementById("snackTasks");
    		x.className = "show";
    		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			$scope.selectedList.newTaskName = "";
			$scope.showform=false;
			populateLists();
		}	
		$scope.getpendingtasks = function(tasksRef){
			var filtered = [];
			tasksRef.forEach(function(x) {
				if(!x.done)
					filtered.push(x);
			});
			return filtered;
		} 
		$scope.getcompletedtasks = function(tasksRef){
			var filtered = [];
			tasksRef.forEach(function(x) {
				if(x.done)
					filtered.push(x);
			});
			return filtered;
		} 
	});

