(function() {
    "use strict";

    angular
        .module("spidey.character")
        .controller("HeroSearchController", [
            "$location",
            "$scope",
            HeroSearchController
        ]);

    function HeroSearchController($location, $scope) {
        var self = this;

        self.term = "";

        self.go = function() {
            if (!self.can_go())
                $location.url($scope.hrefMoc.replace("*", self.term));
        };

        self.can_go = function() {
            return !Boolean(self.term);
        };
    }
})();
