angular.module('articleManagement').directive('snackbar', [
    'snackbarFactory',
    function (snackbarFactory) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'src/app/views/snackbar.html',
            link: function (scope) {
                scope.snack = snackbarFactory;
            }
        };
    }
]);
