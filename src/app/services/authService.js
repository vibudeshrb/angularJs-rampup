angular.module('articleManagement').service('UserService', [
    'UserApi',
    'constant',
    '$localStorage',
    '$state',
    function (UserApi, constant, $localStorage, $state) {
        this.login = function (user) {
            return UserApi.all(constant.BACKEND_URL.USERS.login).post(user);
        };

        this.register = function (user) {
            return UserApi.all(constant.BACKEND_URL.USERS.register).post(user);
        };

        this.logout = function () {
            delete $localStorage.token;
            $state.go(constant.state.articles);
        };
    }
]);
