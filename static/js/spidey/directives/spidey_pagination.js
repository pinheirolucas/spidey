(function() {
    angular
        .module("spidey")
        .directive("spideyPagination", [spideyPagination]);

    function spideyPagination() {
        return {
            "restrict": "E",
            "scope": {
                "page": "=",
                "totalElements": "=",
                "hrefMoc": "=",
                "elementsPerPage": "="
            },
            "replace": true,
            "controller": "SpideyPaginationController",
            "controllerAs": "spidey_pagination",
            "templateUrl": "/partials/spidey_pagination.html"
        };
    }
})();
