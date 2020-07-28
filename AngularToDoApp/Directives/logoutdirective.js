var logoutdirective = angular.module("logout", []);
logoutdirective
    .directive('appLogout', function() {
        return {
            restrict: 'E',
            require: 'ngModel',
            template: `<div style="z-index: 10;position: absolute;right: 0;top: 0;">
           <input type="button" ng-click="Logout()" value="Logout" />
         </div>`,
            controller: function($scope) {
                $scope.Logout = function() {
                    window.sessionStorage.clear();
                    window.location.href = '../Views/Login.html';
                }
            },
        }
    })