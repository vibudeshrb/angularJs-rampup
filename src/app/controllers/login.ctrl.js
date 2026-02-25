angular.module('articleManagement').controller('loginCtrl', [
    'UserService',
    'constant',
    '$localStorage',
    '$state',
    'SnackbarFactory',
    function (UserService, constant, $localStorage, $state, SnackbarFactory) {
        var $login = this;
        $login.user = {};

        $login.valid = function () {
            var isValid = true;
            $login.usernameError = '';
            $login.passwordError = '';

            if (_.isEmpty($login.user.username)) {
                $login.usernameError = 'Username required';
                isValid = false;
            }
            if (_.isEmpty($login.user.password)) {
                $login.passwordError = 'password required';
                isValid = false;
            }

            return isValid;
        };

        $login.loginUser = function () {
            if ($login.valid()) {
                UserService.login($login.user)
                    .then(function (res) {
                        $localStorage.token = res.data.token;
                        SnackbarFactory.trigger('Login Success', 'success');
                        if ($state.params.next) {
                            $state.go($state.params.next);
                        }
                        $state.go(constant.state.articles);
                    })
                    .catch(function (err) {
                        SnackbarFactory.trigger(err.data.message, 'error');
                    });
            }
        };
    },
]);
