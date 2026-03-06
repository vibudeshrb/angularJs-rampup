angular.module('articleManagement').service('userService', [
    'userApi',
    'constant',
    '$localStorage',
    '$state',
    function (userApi, constant, $localStorage, $state) {
        this.login = function (user) {
            return userApi.all(constant.BACKEND_URL.USERS.login).post(user);
        };

        this.registerUser = function (user) {
            return userApi.all(constant.BACKEND_URL.USERS.register).post(user);
        };

        this.logout = function () {
            delete $localStorage.token;
            $state.go(constant.state.articles);
        };
    }
]);
