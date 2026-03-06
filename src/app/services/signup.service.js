angular.module('articleManagement').service('registerService', [
    'userApi',
    'constant',
    function (userApi, constant) {
        this.registerUser = function (user) {
            return userApi.all(constant.BACKEND_URL.USERS.register).post(user);
        };
    },
]);
