angular.module('articleManagement').service('articleService', [
    'articleApi',
    'constant',
    function (articleApi, constant) {
        this.format = function (article) {
            return {
                title: article.title,
                description: article.description,
                shortDescription: article.shortDescription,
                image: 'https://image.com',
                tags: article.tags.split(',')
            };
        };

        this.createArticle = function (article) {
            return articleApi.post(this.format(article));
        };

        this.listArticle = function () {
            return articleApi.get();
        };

        this.getArticle = function (id) {
            return articleApi.one('', id).get();
        };
    }
]);
