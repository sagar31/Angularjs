var formdirective = angular.module("formDirectiveModule", []);
formdirective
    .directive('formDirective', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            template: ``
        }
    })