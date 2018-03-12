angular.module('groupList').
directive('groupList', function() {
	return {
		restrict: 'E',
		templateUrl: './group-list.template.html',
		controller: "groupsCtrl",
		scope:{}
	}
})
.controller('groupsCtrl', function($scope) {
$scope.allGroups = [];
$scope.newGroupName = "";
$scope.selectedGroup = {};
$scope.snackbarDisplay;
$scope.addGroup = function(){
	if($scope.newGroupName && notAlreadyPresent($scope.newGroupName)){
		$scope.allGroups.push({
		group:angular.copy($scope.newGroupName),
		lists:[]
	});
		$scope.snackbarDisplay="Group added successfully"
	}
	else{
		$scope.snackbarDisplay="Group cannot be empty or with duplicate name";
	}
	var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	$scope.newGroupName = "";
}
function notAlreadyPresent(toAdd){
	var flag=0;
	if($scope.allGroups.length>0){
		for (i = 0; i < $scope.allGroups.length; i++) { 
			var current=$scope.allGroups[i];
			if(current.group==toAdd){
				flag=-1;
			}
		if(flag<0)	
			return false;
		else
			return true;
		}
	}
	else
		return true;
}
$scope.setSelectedGroup = function(grpRef){
		$scope.selectedGroup = grpRef;
		$scope.activeClass = grpRef.group;
		console.log($scope.selectedGroup);
	}
$scope.$watch('newGroupName', function(newVal, oldVal) {
        if(newVal != oldVal){
        	$scope.selectedGroup = {};
        	$scope.activeClass = "";
        	$scope.groupName = "";
        }
    });
})