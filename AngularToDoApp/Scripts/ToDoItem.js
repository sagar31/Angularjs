var validUserList = [];
var userId, user, todo = "";
var arrHead = ['todoId', 'toDoItem', 'date', 'categories', 'status', 'reminderDate']; // table headers.
var editdelHead = ['Edit', 'Delete', 'Check'];
var multideletevalue = [];

var ToDoItemModule = angular.module("ToDoItemModule", ['logout', 'sessionservice'])
    .controller("ToDoController", function($scope, $log, sessionservice) {

        sessionservice.checksession();
        userId = window.sessionStorage.UserId;
        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
            var foundIndex = validUserList.findIndex(function(index) { return index.userId == userId });
            $scope.todolst = validUserList[foundIndex].toDoList;
        }

        $scope.search = function(item) {
            if ($scope.searchText == undefined) {
                return true;
            } else {
                if (item.toDoItem.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
                    $scope.searchText == ' '
                ) {
                    return true;
                }
            }
            return false;

        }
        $scope.getcategories = function(item) {
            if ($scope.categoriesText == undefined) {
                return true;
            } else {
                if (item.categories.toLowerCase().indexOf($scope.categoriesText.toLowerCase()) != -1 ||
                    $scope.categoriesText == ' '
                ) {
                    return true;
                }
            }
            return false;

        }
        $scope.setstatus = function(item) {
            if ($scope.statusText == undefined) {
                return true;
            } else {
                if (item.status.toLowerCase().indexOf($scope.statusText.toLowerCase()) != -1 ||
                    $scope.statusText == ' '
                ) {
                    return true;
                }
            }
            return false;

        }
        $scope.column = "todoId";
        $scope.reverseSort = false;

        $scope.sortData = function(column) {

            $scope.reverseSort = (($scope.sortColumn == column) ? !$scope.reverseSort : false);
            $scope.sortColumn = column;
        }
        $scope.getSortClass = function(column) {
            if ($scope.sortColumn == column) {
                return $scope.reverseSort ? 'arrow-design' : 'arrow-up';
            }
            return '';
        }


        $scope.Datefilter = function(item) {

            if ($scope.searchgreaterthandate == undefined && $scope.searchlessthandate == undefined) {
                return true;
            } else {
                if (searchgreaterthandate.value == '' &&
                    item.reminderDate <= searchlessthandate.value
                ) {
                    return true;
                }
                if (searchlessthandate.value == '' &&
                    item.reminderDate >= searchgreaterthandate.value
                ) {
                    return true;
                }
                if (item.reminderDate <= searchlessthandate.value &&
                    item.reminderDate >= searchgreaterthandate.value
                ) {
                    return true;
                }
            }
            return false;
        }

        $scope.Ispending = function(item) {

            if ($scope.isPending == undefined) {
                return true;
            }
            if ($scope.isPending) {
                if (item.date >= new Date().toISOString().split('T')[0] &&
                    item.status == "Pending"
                ) {
                    return true;
                }
            } else {
                return true;
            }
        }

        $scope.UpdateToDoItem = function() {

            var updatetodoItem = {
                todoId: todo[0].todoId,
                toDoItem: $scope.toDoItem,
                date: $scope.date,
                categories: $scope.categories,
                status: $scope.status,
                isReminder: $scope.isReminder,
                reminderDate: $scope.reminderDate,
                isPublic: $scope.isPublic

            }

            var foundIndex = validUserList.findIndex(x => x.userId == userId);
            var index = validUserList[foundIndex].toDoList.findIndex(x => x.todoId == todo[0].todoId);
            validUserList[foundIndex].toDoList[index] = updatetodoItem;
            localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
            alert('To Do item updated Successfully;');
            window.location.assign("../Views/ToDoItem.html");
            return true;
        }

        $scope.MultipleDelete = function() {
            if (multideletevalue.length == 0) {
                alert('One Item needs to be selected for deletion !!');
                return;
            }
            var foundIndex = validUserList.findIndex(x => x.userId == sessionStorage.UserId);
            var tempvalidUserList = validUserList[foundIndex].toDoList.filter(function(index) {
                if (!multideletevalue.includes(index.todoId.toString())) {
                    return index;
                }
            });
            //var index = validUserList[foundIndex].toDoList.findIndex(x => x.todoId == todo[0].todoId);
            validUserList[foundIndex].toDoList = tempvalidUserList;
            localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
            alert('Items deleted Successfully!!');
            window.location.reload();
        }

        $scope.Clearfilters = function() {
            window.location.reload();
        }

    })

function OneditRow(row) {
    var d = row.parentNode.parentNode.rowIndex;
    var editTodoval = row.parentNode.parentNode.children[0].innerText;
    localStorage.setItem("CurrentToDoItem", editTodoval);
    window.location.href = '../Views/EditToDo.html';

}





function MultideleteRow(row) {
    var deleteTodolist = row.parentNode.parentNode.children[0].innerText;
    if (row.checked)
        multideletevalue.push(deleteTodolist);
    else
        multideletevalue = multideletevalue.filter(function(e) { return e !== deleteTodolist.toString() })

}

function OnedeleteRow(row) {
    var deletedvalue = [];
    deletedvalue[0] = row.parentNode.parentNode.children[0].innerText;
    var foundIndex = validUserList.findIndex(x => x.userId == sessionStorage.UserId);
    validUserList[foundIndex].toDoList = validUserList[foundIndex].toDoList.filter(function(index) {
        if (!deletedvalue.includes(index.todoId.toString())) {
            return index;
        }
    });
    localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
    alert('Item deleted Successfully!!');
    window.location.reload();
}