angular
    .module('articleManagement')
    .controller('articleCtrl', function ($scope) {
        $scope.menu = [
            {
                state: 'articles.create',
                name: 'Create'
            },
            {
                state: 'articles.list',
                name: 'List'
            }
        ];
    });
