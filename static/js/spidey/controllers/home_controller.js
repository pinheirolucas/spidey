(function() {
    angular
        .module("spidey")
        .controller("HomeController", [HomeController])

    function HomeController() {
        var self = this;

        console.log("Home controller loaded");
    }
})();
