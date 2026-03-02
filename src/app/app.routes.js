angular.module('articleManagement').config([
    '$stateProvider',
    '$locationProvider',
    'constant',
    function ($stateProvider, $locationProvider, constant) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state({
                name: constant.state.home,
                url: constant.url.home,
                template: '<h3>Home</h3>',
            })
            .state({
                name: constant.state.dashboard,
                url: constant.url.dashboard,
                template: '<h3>Dashboard</h3>',
            })
            .state({
                name: constant.state.signup,
                url: constant.url.signup,
                controller: 'SignUpCtrl',
                templateUrl: 'src/app/views/signup.html',
                controllerAs: '$signup',
            });
    },
]);
