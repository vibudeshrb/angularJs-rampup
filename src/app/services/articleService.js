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

        this.listArticle = function (page, pageSize, filter) {
            var params = { page: page, pageSize: pageSize };
            if (filter) {
                params.search = filter;
            }
            return articleApi.one('').get(params);
        };

        this.getArticle = function (id) {
            return articleApi.one('', id).get();
        };
    }
]);
