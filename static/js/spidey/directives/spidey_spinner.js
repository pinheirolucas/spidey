(function() {
    "use strict";

    angular
        .module("spidey")
        .directive("spideySpinner", [
            "SpinnerMediator",
            spideySpinner
        ]);

    function spideySpinner(SpinnerMediator) {
        return {
            "restrict": "EA",
            "controller": "SpideySpinnerController",
            "controllerAs": "spidey_spinner",
            "scope": {
                "name": "@",
                "tolerance": "@"
            },
            "replace": false,
            "templateUrl": "/partials/spidey_spinner.html",
            "link": function(scope, target_element, target_attrs) {
                if (!scope.name) {
                    target_element.remove();
                    throw new Error("spinner element name is required");
                }

                SpinnerMediator.register(scope.name, scope.tolerance);

                scope.$on("$locationChangeStart", function() {
                    SpinnerMediator.hide_all();
                });

                scope.$on("$destroy", function() {
                    SpinnerMediator.unregister(scope.name);
                });
            }
        };
    }
})();
