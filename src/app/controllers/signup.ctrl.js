angular.module('articleManagement').controller('signupCtrl', [
    'userService',
    '$state',
    'constant',
    '$localStorage',
    'snackbarFactory',
    function (userService, $state, constant, $localStorage, snackbarFactory) {
        var signup = this;
        signup.user = {};

        signup.valid = function () {
            var isValid = true;
            var errors = constant.FORM_ERROR_MESSAGES;
            var regex = constant.REGEX;

            signup.usernameError = '';
            signup.passwordError = '';
            signup.emailError = '';

            if (_.isEmpty(signup.user.username)) {
                signup.usernameError = errors.USERNAME_REQUIRED;
                isValid = false;
            }
            if (_.isEmpty(signup.user.password)) {
                signup.passwordError = errors.PASSWORD_REQUIRED;
                isValid = false;
            } else if (
                !regex.PASSWORD.test(signup.user.password) ||
                signup.user.password.length < 8
            ) {
                signup.passwordError = errors.PASSWORD_INVALID;
                isValid = false;
            }
            if (_.isEmpty(signup.user.email)) {
                signup.emailError = errors.EMAIL_REQUIRED;
                isValid = false;
            } else if (!regex.EMAIL.test(signup.user.email)) {
                signup.emailError = errors.EMAIL_INVALID;
                isValid = false;
            }
            return isValid;
        };

        signup.registerUser = function () {
            if (signup.valid()) {
                userService
                    .registerUser(signup.user)
                    .then(function (res) {
                        if (res.success) {
                            $localStorage.token = res.data.token;
                            $state.go(constant.state.dashboard);
                        }
                    })
                    .catch(function (err) {
                        snackbarFactory.trigger(err.data.message, 'error');
                    });
            }
        };
    }
]);
