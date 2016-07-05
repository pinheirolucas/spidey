(function() {
    "use strict";

    angular
        .module("spidey")
        .controller("AllCharactersController", [
            "$routeParams",
            "$scope",
            "CharactersFactory",
            HomeController
        ])

    function HomeController($routeParams, $scope, CharactersFactory) {
        var self = this;

        self.heroes_table = {};
        self.page = $routeParams.page ? $routeParams.page : 1;
        self.url_moc = "/characters/all/*";
        self.total_elements = 0;
        self.elements_per_page = 16;

        self.show_heroes_list = function() {
            return !_.isEmpty(self.heroes_table);
        };

        self.resolve_empty_description = function(description) {
            var empty_message = "No description provided to this character :(";

            return description ? description : empty_message;
        };

        CharactersFactory.get_all_heroes_with_offset(self.elements_per_page*(self.page-1));

        CharactersFactory.subscribe("all_heroes", function(old_value, new_value) {
            console.log(new_value);

            if (!new_value.results.length)
                return;

            self.heroes_table = _.groupBy(new_value.results, function(hero, index) {
                var max_cols = 4;

                return Math.floor(index/max_cols);
            });

            self.total_elements = new_value.total;

            console.log(self.heroes_table);
        });

        $scope.$on("$destroy", function() {
            CharactersFactory.unsubscribe_all("all_heroes");
            self.heroes_table = null;
            self.page = null;
            self.url_moc = null;
            self.total_elements = null;
        });
    }
})();
