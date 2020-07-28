var validUserList = [];
var userId, todo = "";

var ReadToDoModule = angular.module("ReadToDoModule", ['logout', 'sessionservice'])
    .controller("ReadToDoController", function($scope, $log, sessionservice) {

        sessionservice.checksession();
        userId = window.sessionStorage.UserId;
        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
            var foundIndex = validUserList.findIndex(function(index) { return index.userId == userId });
            todo = validUserList[foundIndex].toDoList.filter(function(index) {
                if (index.todoId == localStorage.CurrentToDoItem) {
                    return index;
                }
            });
        }

        $scope.toDoItem = todo[0].toDoItem;
        $scope.date = new Date(todo[0].date);
        $scope.categories = todo[0].categories;
        $scope.status = todo[0].status;
        $scope.isReminder = todo[0].isReminder;
        $scope.reminderDate = new Date(todo[0].reminderDate);
        $scope.isPublic = todo[0].isPublic;
        if ($scope.isReminder == "Yes") {
            $scope.isVisible = true;
        } else {
            $scope.isVisible = false;
        }

    })