var app = angular.module('sessionservice', []);

app.service('sessionservice', function() {
    this.checksession = function() {
        if (sessionStorage.IsLoggedIn == undefined || sessionStorage.IsLoggedIn == false) {
            window.location.href = "../Views/Login.html";
        }
    }
});