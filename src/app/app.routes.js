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
            constant
        ) {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state({
                    name: constant.state.home,
                    url: constant.url.home,
                    template: '<h3>Home</h3>'
                })
                .state({
                    name: constant.state.dashboard,
                    url: constant.url.dashboard,
                    template: '<h3>Dashboard</h3>'
                })
                .state({
                    name: constant.state.signup,
                    url: constant.url.signup,
                    controller: 'signupCtrl',
                    templateUrl: constant.templateUrl.signup,
                    controllerAs: 'signup'
                })
                .state({
                    name: constant.state.login,
                    url: constant.url.login + '?next',
                    controller: 'loginCtrl',
                    templateUrl: constant.templateUrl.login,
                    controllerAs: 'login'
                })
                .state({
                    name: constant.state.article,
                    url: constant.url.article,
                    template: '<div ui-view></div>'
                })
                .state({
                    name: constant.state.articleCreate,
                    url: constant.url.articleCreate,
                    templateUrl: constant.templateUrl.articleCreate,
                    controller: 'articleCreateCtrl',
                    controllerAs: 'article'
                })
                .state({
                    name: constant.state.articleDetail,
                    url: constant.url.articleDetail,
                    templateUrl: constant.templateUrl.articleDetail,
                    controller: 'articleDetailCtrl',
                    controllerAs: 'article'
                });

            $urlRouterProvider.when('/', '/articles');
        }
    ])
    .run([
        '$rootScope',
        '$localStorage',
        '$state',
        'constant',
        'Restangular',
        function ($rootScope, $localStorage, $state, constant, Restangular) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var token = $localStorage.token;
                var isAuthPage =
                    toState.name === constant.state.login ||
                    toState.name === constant.state.signup;
                if (!token && !isAuthPage) {
                    event.preventDefault();
                    $state.go(constant.state.login, {
                        next: toState.name
                    });
                    return;
                }

                if (token && isAuthPage) {
                    event.preventDefault();
                    $state.go(constant.state.article);
                    return;
                }
            });

            Restangular.addFullRequestInterceptor(
                function (
                    element,
                    operation,
                    route,
                    url,
                    headers,
                    params,
                    httpConfig
                ) {
                    var token = $localStorage.token;
                    if (token) {
                        headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return {
                        headers: headers,
                        element: element,
                        params: params,
                        httpConfig: httpConfig
                    };
                }
            );
        }
    ]);
