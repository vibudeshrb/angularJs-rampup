angular.module('articleManagement').component('loadingSpinner', {
    bindings: {
        show: '<',
        message: '@?'
    },
    controllerAs: '$ctrl',
    templateUrl: 'src/app/views/loading.html'
});
