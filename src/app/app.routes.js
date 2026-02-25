angular
    .module('articleManagement')
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        'constant',
        function (
            $stateProvider,
            $locationProvider,
            $urlRouterProvider,
            constant,
        ) {
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
                })
                .state({
                    name: constant.state.login,
                    url: constant.url.login + '?next',
                    controller: 'loginCtrl',
                    templateUrl: 'src/app/views/login.html',
                    controllerAs: '$login',
                })
                .state({
                    name: constant.state.article,
                    url: constant.url.article,
                    template: '<h1>Articles</h1>',
                });

            $urlRouterProvider.when('/', '/articles');
        },
    ])
    .run([
        '$rootScope',
        '$localStorage',
        '$state',
        'constant',
        function ($rootScope, $localStorage, $state, constant) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var token = $localStorage.token;
                var isAuthPage =
                    toState.name === constant.state.login ||
                    toState.name === constant.state.signup;
                if (!token && !isAuthPage) {
                    event.preventDefault();
                    $state.go(constant.state.login, {
                        next: toState.name,
                    });
                    return;
                }

                if (token && isAuthPage) {
                    event.preventDefault();
                    $state.go(constant.state.article);
                    return;
                }
            });
        },
    ]);
