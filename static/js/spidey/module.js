(function() {
    angular
        .module("spidey", [
            "ngRoute",
            "spidey.character"
        ])
        .config(["$routeProvider", SpideyConfig]);

    function SpideyConfig($routeProvider) {
        $routeProvider
            .when("/home", {
                "templateUrl": "/partials/home.html",
                "controller": "HomeController"
            })
            .otherwise({
                "redirectTo": "/home"
            });
    }
})();
