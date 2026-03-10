angular.module('articleManagement').component('articleCard', {
    bindings: {
        article: '<',
        onClick: '&'
    },
    controllerAs: 'detail',
    templateUrl: 'src/app/views/articleCard.html'
});
