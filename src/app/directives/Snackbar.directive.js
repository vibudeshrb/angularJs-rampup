angular.module('articleManagement').directive('snackbar', [
    'SnackbarFactory',
    function (SnackbarFactory) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'src/app/views/snackbar.html',
            link: function (scope) {
                scope.snack = SnackbarFactory;
            },
        };
    },
]);
