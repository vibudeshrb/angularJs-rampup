angular.module('articleManagement').factory('articleApi', [
    'Restangular',
    'constant',
    function (Restangular, constant) {
        return Restangular.all('articles');
    }
]);
