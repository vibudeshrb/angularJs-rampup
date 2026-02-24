angular
  .module("articleManagement")
  .factory("UserApi", function (Restangular, constant) {
    return Restangular.all(constant.BACKEND_URL.USERS.user);
  });
