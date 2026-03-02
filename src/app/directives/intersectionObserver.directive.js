angular
    .module('articleManagement')
    .directive('intersectionObserver', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                const options = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 1.0
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            scope.$apply(() => {
                                scope.$eval(attrs.intersectionObserver);
                            });
                        }
                    });
                }, options);
                observer.observe(element[0]);

                scope.$on('$destroy', () => {
                    observer.disconnect();
                });
            }
        };
    });
