/// <reference path="angular-1.8.0/angular.min.js" />
var validUserList = [];
var user, profileImage;

var ProfileModule = angular.module("ProfileModule", ['logout', 'sessionservice'])
    .controller("ProfileController", function($scope, $log, sessionservice) {
        $log.info($scope);
        sessionservice.checksession();
        if (localStorage.getItem("ValidUserList") !== null) {
            validUserList = JSON.parse(localStorage.getItem("ValidUserList"));
            user = validUserList.filter(function(index) {
                if (index.userId == sessionStorage.UserId) {
                    return index;
                }
            });
        }

        document.getElementById('output').src = user[0].profileImage;
        $scope.profileImage = user[0].profileImage;
        // $scope.email = user[0].email;
        //$scope.password = user[0].password;
        $scope.firstName = user[0].firstName;
        $scope.lastName = user[0].lastName;
        $scope.gender = user[0].gender;
        $scope.address = user[0].address;
        $scope.toDoList = user[0].toDoList;



        $scope.update = function() {
            var updateUser = {
                userId: user[0].userId,
                email: user[0].email,
                password: user[0].password,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                gender: $scope.gender,
                address: $scope.address,
                toDoList: user[0].toDoList,
                profileImage: $scope.profileImage
            }
            var foundIndex = validUserList.findIndex(function(index) { return index.userId == user[0].userId });
            validUserList[foundIndex] = updateUser;
            alert('User updated Successfully !!');
            localStorage.setItem("ValidUserList", JSON.stringify(validUserList));
            window.location.reload();

        }

        $scope.reset = function() {
            window.location.reload();
        }

        $scope.getImageData = function() {
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

    })