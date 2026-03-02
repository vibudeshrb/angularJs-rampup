angular.module('articleManagement').service('registerService', [
    'UserApi',
    'constant',
    function (UserApi, constant) {
        this.registerUser = function (user) {
            return UserApi.all(constant.BACKEND_URL.USERS.register).post(user);
        };
    },
]);
