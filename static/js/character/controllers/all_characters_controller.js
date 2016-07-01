(function() {
    "use strict";

    angular
        .module("spidey")
        .controller("AllCharactersController", ["CharactersFactory", HomeController])

    function HomeController(CharactersFactory) {
        var self = this;

        console.log("AllCharacters controller loaded");

        CharactersFactory.get_all_heroes_with_offset(0);
    }
})();
