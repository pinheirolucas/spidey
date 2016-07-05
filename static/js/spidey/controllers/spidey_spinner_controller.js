(function() {
    "use strict";

    angular
        .module("spidey")
        .controller("SpideySpinnerController", [
            "$scope",
            "SpinnerMediator",
            SpideySpinnerController
        ]);

    function SpideySpinnerController($scope, SpinnerMediator) {
        var self = this;

        self.is_visible = function() {
            return SpinnerMediator.is_visible($scope.name);
        };
    }
})();
