/// <reference path="angular-1.8.0/angular.min.js" />

var validUserList = [];
var userName = "";
var password = "";

var LoginModule = angular.module("LoginModule", [])
    .controller("LoginController", function($scope, $log) {
        if (sessionStorage.IsLoggedIn == "true") {

            window.location.href = "../Views/ProfileDashboard.html";
        }

        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
        }

        $scope.checkLogin = function() {
            var validUser;

            validUserList.forEach(function(index) {
                if (index.email == $scope.email && index.password == $scope.password) {
                    validUser = true;
                }
            })
            if (validUser == true) {
                SetSessionStoorageLoggedIn();
                window.location.assign('../Views/ProfileDashboard.html');
                return false;
            } else {
                alert('Password / UserName is Incorrect !!');
            }
        }

        function SetSessionStoorageLoggedIn() {

            var user = validUserList.filter(function(index) {
                if (index.email == $scope.email && index.password == $scope.password) {
                    return index;
                }

            });
            sessionStorage.IsLoggedIn = true;
            sessionStorage.UserId = user[0].userId;
        }

    })