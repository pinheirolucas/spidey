(function() {
    "use strict";

    angular
        .module("spidey.character")
        .directive("heroSearch", [heroSearch]);

    function heroSearch() {
        return {
            "restrict": "E",
            "scope": {
                "hrefMoc": "="
            },
            "replace": true,
            "controller": "HeroSearchController",
            "controllerAs": "hero_search",
            "templateUrl": "/partials/hero_search.html"
        };
    }
})();
