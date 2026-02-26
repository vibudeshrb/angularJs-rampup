angular.module('articleManagement').controller('articleCreateCtrl', [
    'articleService',
    'snackbarFactory',
    '$state',
    'constant',
    function (articleService, snackbarFactory, $state, constant) {
        var article = this;
        article.data = {};

        article.validate = function () {
            var data = article.data;

            if (!data.title || data.title.length < 4) {
                return constant.FORM_ERROR_MESSAGES.ARTICLE_TITLE;
            }
            if (
                !data.shortDescription ||
                data.shortDescription.length < 10 ||
                data.shortDescription.length > 50
            ) {
                return constant.FORM_ERROR_MESSAGES.ARTICLE_SHORT;
            }
            if (!data.description || data.description.length < 50) {
                return constant.FORM_ERROR_MESSAGES.ARTICLE_DESCRIPTION;
            }
            if (!data.tags || data.tags.trim() === '') {
                return constant.FORM_ERROR_MESSAGES.ARTICLE_TAGS;
            }

            return null;
        };

        article.createArticle = function () {
            var errorMessage = article.validate();

            if (errorMessage) {
                snackbarFactory.trigger(errorMessage, 'error');
                return;
            }

            articleService
                .createArticle(article.data)
                .then(function (res) {
                    snackbarFactory.trigger(res.message, 'success');
                    $state.go(constant.state.articleDetail, {
                        id: res.data.id
                    });
                })
                .catch(function (err) {
                    snackbarFactory.trigger(
                        err.data.message || 'Server Error',
                        'error'
                    );
                });
        };
    }
]);
