angular.module('articleManagement').factory('articleApi', [
    'Restangular',
    'constant',
    function (Restangular, constant) {
        return Restangular.all(constant.BACKEND_URL.ARTICLES.articles);
    }
]);
