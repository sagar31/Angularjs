var ProfiledashboardModule = angular.module("ProfiledashboardModule", ['logout', 'sessionservice'])
    .controller("ProfiledashboardController", function($scope, $log, sessionservice) {
        sessionservice.checksession();

        $scope.RedirectProfileView = function() {
            window.location.href = '../Views/Profile.html';
        }

        $scope.RedirectToDoView = function() {
            window.location.href = '../Views/ToDoItem.html';
        }

    })