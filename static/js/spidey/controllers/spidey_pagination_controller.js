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
        self.current_page = $scope.page;

        self.can_go_prev = function() {
            return true;
        };

        self.can_go_next = function() {
            return true;
        };

        self.go_prev = function() {
            console.log("going prev");
        };

        self.go_next = function() {
            console.log("going next");
        };

        self.go_to = function(page_href) {
            $location.url(page_href);
        };

        self.is_active = function(page_index) {
            return (page_index == self.current_page);
        };

        (function init() {
            self.pages[Math.ceil($scope.totalElements/$scope.elementsPerPage)] = {};

            self.pages = _.map(self.pages, function(__, key) {
                return {
                    "index": key+1,
                    "href": $scope.hrefMoc.replace("*", key+1)
                };
            });
        })();

        console.log($scope);
    }
})();
