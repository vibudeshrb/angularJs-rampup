angular.module('articleManagement').controller('articleCreateCtrl', [
    'articleService',
    'SnackbarFactory',
    '$state',
    function (articleService, SnackbarFactory, $state) {
        var $article = this;
        $article.data = {};

        $article.createArticle = function () {
            articleService
                .createArticle($article.data)
                .then(function (res) {
                    SnackbarFactory.trigger(res.message, 'success');
                    $state.go('articles.detail', { id: res.data.id });
                })
                .catch(function (err) {
                    SnackbarFactory.trigger(err.data.message, 'error');
                });
        };
    }
]);
