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
            .when("/characters/all/:offset?", {
                "templateUrl": "/partials/all_characters.html",
                "controller": "AllCharactersController"
            })
            .when("/characters/search/:term/:offset?", {
                "templateUrl": "/partials/search_characters.html",
                "controller": "SearchCharactersController"
            })
            .otherwise({
                "redirectTo": "/characters/all"
            });
    }
})();
