angular.module('articleManagement').controller('loginCtrl', [
    'userService',
    'constant',
    '$localStorage',
    '$state',
    'snackbarFactory',
    function (userService, constant, $localStorage, $state, snackbarFactory) {
        var login = this;
        login.user = {};

        login.valid = function () {
            var isValid = true;
            login.usernameError = '';
            login.passwordError = '';

            if (_.isEmpty(login.user.username)) {
                login.usernameError =
                    constant.FORM_ERROR_MESSAGES.USERNAME_REQUIRED;
                isValid = false;
            }
            if (_.isEmpty(login.user.password)) {
                login.passwordError =
                    constant.FORM_ERROR_MESSAGES.PASSWORD_REQUIRED;
                isValid = false;
            }

            return isValid;
        };

        login.loginUser = function () {
            if (login.valid()) {
                login.isLoading = true;
                userService
                    .login(login.user)
                    .then(function (res) {
                        $localStorage.token = res.data.token;
                        snackbarFactory.trigger(
                            constant.FORM_SUCCESS_MESSAGES.SUCCESS,
                            'success'
                        );
                        if ($state.params.next) {
                            $state.go($state.params.next);
                            return;
                        }
                        $state.go(constant.state.articleList, {
                            showWelcome: true
                        });
                    })
                    .catch(function (err) {
                        snackbarFactory.trigger(err.data.message, 'error');
                    })
                    .finally(function () {
                        login.isLoading = false;
                    });
            }
        };
    }
]);
