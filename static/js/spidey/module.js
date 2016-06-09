(function() {
    angular
        .module("spidey", ["ngRoute"])
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
