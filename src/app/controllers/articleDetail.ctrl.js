angular.module('articleManagement').controller('articleDetailCtrl', [
    'articleService',
    '$stateParams',
    function (articleService, $stateParams) {
        var article = this;
        article.data = {};

        articleService.getArticle($stateParams.id).then(function (res) {
            article.data = res.data;
        });
    }
]);
