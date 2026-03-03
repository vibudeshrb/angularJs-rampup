angular.module('articleManagement').controller('articleListCtrl', [
    'articleService',
    '$state',
    '$scope',
    '$timeout',
    'constant',
    '$rootScope',
    function (articleService, $state, $scope, $timeout, constant, $rootScope) {
        var currentPage = 1;
        var pageSize = 6;
        var totalItems = 0;
        var debounceTimer = null;

        $scope.articles = [];
        $scope.filter = '';
        $scope.isLoading = false;

        if ($state.params.showWelcome) {
            $scope.showWelcomeModal = true;
        }

        $scope.closeWelcomeModal = function () {
            $scope.showWelcomeModal = false;
        };

        $scope.loadArticles = function (add) {
            if ($scope.isLoading) return;

            if (add === 0 || $scope.articles.length < totalItems) {
                currentPage = currentPage + add;
                $scope.isLoading = true;
                articleService
                    .listArticle(currentPage, pageSize, $scope.filter)
                    .then(function (res) {
                        $scope.articles = $scope.articles.concat(res.data.data);
                        totalItems = res.data.totalItems;
                    })
                    .finally(function () {
                        $scope.isLoading = false;
                    });
            }
        };
        $scope.$watch('filter', function (newVal, oldVal) {
            if (newVal === oldVal) return;
            if (debounceTimer) {
                $timeout.cancel(debounceTimer);
            }
            debounceTimer = $timeout(function () {
                currentPage = 1;
                totalItems = 0;
                $scope.articles = [];
                $scope.loadArticles(0);
            }, 300);
        });

        $scope.loadArticles(0);

        $scope.goToArticle = function (id) {
            $state.go('articles.detail', { id: id });
        };
    }
]);
