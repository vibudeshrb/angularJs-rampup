angular
    .module('articleManagement')
    .controller(
        'navCtrl',
        function ($state, $rootScope, userService, constant) {
            var nav = this;
            var prev = null;

            nav.goBack = function () {
                $rootScope.isBack = true;
                prev = $rootScope.history.pop();
                if (prev) {
                    $state.go(prev.name, prev.params);
                } else {
                    $state.go(constant.state.articleList);
                }
            };

            nav.logout = function () {
                userService.logout();
            };
        }
    );
