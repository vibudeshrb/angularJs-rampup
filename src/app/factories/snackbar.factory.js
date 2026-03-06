angular.module('articleManagement').factory('snackbarFactory', [
    '$timeout',
    function ($timeout) {
        var sData = {
            message: '',
            type: '',
            show: false
        };

        return {
            data: sData,
            trigger: function (msg, type) {
                sData.message = msg;
                sData.type = type;
                sData.show = true;

                $timeout(
                    function () {
                        sData.show = false;
                    },
                    3000,
                    true
                );
            }
        };
    }
]);
