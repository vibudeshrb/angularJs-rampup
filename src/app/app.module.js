const myApp = angular.module('articleManagement', [
    'ui.router',
    'restangular',
    'ngStorage'
]);

myApp.constant('constant', constant);

myApp.config([
    'constant',
    'RestangularProvider',
    function (constant, RestangularProvider) {
        RestangularProvider.setBaseUrl(constant.apiBaseUrl);
    }
]);
