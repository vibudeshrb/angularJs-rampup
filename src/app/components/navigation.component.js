angular.module('articleManagement').component('navigationMenu', {
    bindings: {
        data: '<'
    },
    templateUrl: 'src/app/views/navMenu.html',
    controller: 'navCtrl',
    controllerAs: 'nav'
});
