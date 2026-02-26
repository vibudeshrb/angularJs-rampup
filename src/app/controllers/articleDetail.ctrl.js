angular.module('articleManagement').controller('articleDetailController', [
    'articleService',
    '$state',
    '$scope',
    function (articleService, $state, $scope) {
        articleService.getArticle($state.params.id).then(function (res) {
            $scope.data = res.data;
        });
    }
]);
