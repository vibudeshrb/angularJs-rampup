angular.module("articleManagement").controller("SignUpCtrl", [
  "registerService",
  "$state",
  "constant",
  "$localStorage",
  function (registerService, $state, constant, $localStorage) {
    var $signup = this;
    $signup.user = {};
    var passRegex = /([^a-zA-Z0-9].*[^a-zA-Z0-9])/;
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    $signup.valid = function () {
      var isValid = true;
      $signup.usernameError = "";
      $signup.passwordError = "";
      $signup.emailError = "";

      if (_.isEmpty($signup.user.username)) {
        $signup.usernameError = "Username required";
        isValid = false;
      }
      if (_.isEmpty($signup.user.password)) {
        $signup.passwordError = "password required";
        isValid = false;
      } else if (
        !passRegex.test($signup.user.password) ||
        $signup.user.password.length < 8
      ) {
        $signup.passwordError =
          "password must contain 8 character and two special character";
        isValid = false;
      }
      if (_.isEmpty($signup.user.email)) {
        $signup.emailError = "Email required";
        isValid = false;
      } else if (!emailRegex.test($signup.user.email)) {
        $signup.emailError = "Not valid email";
        isValid = false;
      }
      return isValid;
    };

    $signup.registerUser = function () {
      if ($signup.valid()) {
        registerService
          .registerUser($signup.user)
          .then(function (res) {
            if (res.success) {
              $localStorage.token = res.data.token;
              $state.go(constant.state.dashboard);
            }
          })
          .catch(function (err) {
            $signup.error = err.data.message;
          });
      }
    };
  },
]);
