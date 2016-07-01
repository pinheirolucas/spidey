(function() {
    "use strict";

    angular
        .module("spidey.character")
        .controller("SearchCharactersController", [SearchCharactersController]);

    function SearchCharactersController() {
        console.log("Search Characters controller loaded");
    }
})();
