(function() {
    "use strict";

    angular
        .module("spidey")
        .controller("MainController", [
            "$scope",
            MainController
        ])

    function MainController($scope) {
        var self = this;

        self.href_moc = "/characters/search/*";
    }
})();
