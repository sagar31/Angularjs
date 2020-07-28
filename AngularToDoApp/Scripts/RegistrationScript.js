/// <reference path="angular-1.8.0/angular.min.js" />

var validUserList = [];

var RegistrationModule = angular.module("RegistrationModule", [])
    .controller("RegistrationController", function($scope, $log) {
        $log.info($scope);
        if (sessionStorage.IsLoggedIn == "true") {

            window.location.href = "../Views/ProfileDashboard.html";
        }
        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"))
        }


        $scope.update = function() {
            var createdUser = {
                userId: getNextUserId() + 1,
                email: $scope.email,
                password: $scope.password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                gender: $scope.gender,
                address: $scope.address,
                toDoList: [],
                profileImage: $scope.profileImage

            }
            validUserList.push(createdUser);
            localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
            alert('User created Successfully;');
            window.location.reload();
        }

        function getNextUserId() {
            if (validUserList == null || validUserList.length == 0) {
                return 0;
            } else {
                return Math.max.apply(Math, validUserList.map(function(o) { return o.userId; }))
            }

        }

        $scope.getImageData = function() {
            $log.info('asdbas');
            var input = document.getElementById("profileImage");
            var fReader = new FileReader();
            fReader.readAsDataURL(input.files[0]);
            fReader.onloadend = function(event) {
                var img = document.getElementById("profileImage");
                var output = document.getElementById("output");
                output.src = URL.createObjectURL(input.files[0]);
                img.src = event.target.result;
                $scope.profileImage = img.src;

            }

        }

        $scope.checkRegistration = function() {
            var boolvalue = $scope.CheckUserNameAvailable();
            if (boolvalue == false) {
                alert('Username is taken. Try with a different username');
                return false;
            }
            $scope.update();
        }

        $scope.CheckUserNameAvailable = function() {

            if (localStorage.getItem("ValidUserList") == null || localStorage.ValidUserList == undefined) {
                return true;
            }

            if (localStorage.getItem("ValidUserList") !== null) {
                validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
                var usernametemp = validUserList.filter(function(index) {
                    if (index.email == $scope.email) {
                        return index;
                    }
                });
            }
            if (usernametemp.length == 0) {
                return true;
            } else {
                return false;
            }
        }

    })