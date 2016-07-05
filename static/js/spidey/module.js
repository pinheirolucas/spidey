(function() {
    "use strict";

    angular
        .module("spidey", [
            "ngRoute",
            "spidey.character"
        ])
        .config(["$routeProvider", SpideyConfig]);

    function SpideyConfig($routeProvider) {
        $routeProvider
            .when("/characters/all/:page?", {
                "templateUrl": "/partials/all_characters.html",
                "controller": "AllCharactersController",
                "controllerAs": "all_characters"
            })
            .when("/characters/search/:term/:page?", {
                "templateUrl": "/partials/search_characters.html",
                "controller": "SearchCharactersController",
                "controllerAs": "search_characters"
            })
            .otherwise({
                "redirectTo": "/characters/all"
            });
    }
})();
