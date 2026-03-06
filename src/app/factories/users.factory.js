angular
    .module('articleManagement')
    .factory('userApi', function (Restangular, constant) {
        return Restangular.all(constant.BACKEND_URL.USERS.user);
    });
