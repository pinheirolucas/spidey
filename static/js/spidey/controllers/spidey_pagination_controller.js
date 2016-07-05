(function() {
    angular
        .module("spidey")
        .controller("SpideyPaginationController", [
            "$location",
            "$scope",
            SpideyPaginationController
        ]);

    function SpideyPaginationController($location, $scope) {
        var self = this;

        self.pages = [];
        self.current_page = parseInt($scope.page);

        self.can_go_prev = function() {
            return (self.current_page > 1);
        };

        self.can_go_next = function() {
            return (self.current_page < Math.ceil($scope.totalElements/$scope.elementsPerPage));
        };

        self.go_prev = function() {
            if (self.can_go_prev())
                $location.url($scope.hrefMoc.replace("*", self.current_page-1));
        };

        self.go_next = function() {
            if (self.can_go_next())
                $location.url($scope.hrefMoc.replace("*", self.current_page+1));
        };

        self.go_to = function(page_href) {
            $location.url(page_href);
        };

        self.is_active = function(page_index) {
            return (page_index == self.current_page);
        };

        (function init() {
            var max_per_view = 5;
            var min = 3;
            var max = Math.ceil($scope.totalElements/$scope.elementsPerPage);
            var offset = 2;

            if (self.current_page <= min) {
                for (var i = 1; i <= max_per_view; i++) {
                    self.pages.push({
                        "index": i,
                        "href": $scope.hrefMoc.replace("*", i)
                    });
                }
            } else if (self.current_page >= (max-offset)) {
                for (var i = max; i > (max-max_per_view); i--) {
                    self.pages.unshift({
                        "index": i,
                        "href": $scope.hrefMoc.replace("*", i)
                    });
                }
            } else {
                var temp = [];

                for (var i = (self.current_page-offset); i <= (self.current_page+offset); i++) {
                    temp.push({
                        "index": i,
                        "href": $scope.hrefMoc.replace("*", i)
                    });
                }

                self.pages = _.sortBy(temp, function(page) {
                    return page.index;
                });

                temp = null;
            }
        })();
    }
})();
