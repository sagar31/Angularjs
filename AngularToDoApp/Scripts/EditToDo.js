var validUserList = [];
var userId, user, todo = "";
var Categoryvalues = "";
var temptodoid;

var EditToDoModule = angular.module("EditToDoModule", ['logout', 'sessionservice'])
    .controller("EditToDoController", function($scope, $log, sessionservice) {
        $log.info($scope);

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

        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("date")[0].setAttribute('min', today);
        document.getElementsByName("reminderDate")[0].setAttribute('min', today);

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


        $scope.Logout = function() {
            window.sessionStorage.clear();
            window.location.href = '../Views/Login.html';
        }


        $scope.getstatus = function() {
            if ($scope.isReminder == "Yes") {
                $scope.isVisible = true;
            } else {
                $scope.isVisible = false;
                $scope.reminderDate = "";
            }
        }



        $scope.UpdateToDoItem = function() {
            if (date.value < reminderDate.value) {
                alert('Reminder date should be less than To do date');
                return false;
            }

            var updatetodoItem = {
                todoId: todo[0].todoId,
                toDoItem: $scope.toDoItem,
                date: date.value,
                categories: $scope.categories,
                status: $scope.status,
                isReminder: $scope.isReminder,
                reminderDate: reminderDate.value,
                isPublic: $scope.isPublic

            }

            var foundIndex = validUserList.findIndex(x => x.userId == userId);
            var index = validUserList[foundIndex].toDoList.findIndex(x => x.todoId == todo[0].todoId);
            validUserList[foundIndex].toDoList[index] = updatetodoItem;
            localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
            alert('To Do item updated Successfully;');
            window.location.assign("../Views/ReadToDo.html");
            return true;
        }



        function getNextToDoId() {
            var tempuser = validUserList.filter(function(index) {
                if (index.userId == sessionStorage.UserId) {
                    return index;
                }
            });
            if (tempuser[0].toDoList.length == 0) {
                return 0;
            } else {
                return Math.max.apply(Math, arr.map(function(o) { return o.todoId }))
            }

        }

    })

function EditToDoItem() {
    var boolvalue = ValidateReminder();
    var catehoryval = ValidateCategory();
    if (!catehoryval) {
        return false;
    }

    if (!boolvalue) {
        return false;
    }
    alert('To Do item updated Successfully;');
    window.location.assign("../Views/ReadToDo.html");
    return true;

}


function ValidateReminder() {
    var val = document.getElementById("isReminderYes").checked;
    var dateval = document.getElementById("ReminderDate").value;
    if (val == true) {
        if (dateval == "") {
            alert('Reminder date is mandatory');
            return false;
        }
        return true;
    } else {
        return true;
    }
}


function ChangeIsReminder() {
    var yescheck = document.getElementById("isReminderYes").checked;
    if (yescheck == true) {
        document.getElementById("divReminderDate").style.display = "block";
    } else {
        document.getElementById("divReminderDate").style.display = "none";
    }
}

function ValidateCategory() {
    var techval = document.getElementById("Technical").checked;
    var pracval = document.getElementById("Practical").checked;
    if (techval == true || pracval == true) {
        return true;
    } else {
        alert('Category value is mandatory');
        return false;
    }
}