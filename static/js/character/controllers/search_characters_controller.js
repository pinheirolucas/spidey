(function() {
    "use strict";

    angular
        .module("spidey.character")
        .controller("SearchCharactersController", [
            "$routeParams",
            "$scope",
            "CharactersFactory",
            SearchCharactersController
        ]);

    function SearchCharactersController($routeParams, $scope, CharactersFactory) {
        var self = this;

        self.heroes_table = {};
        self.page = $routeParams.page ? $routeParams.page : 1;
        self.term = $routeParams.term;
        self.url_moc = "/characters/search/".concat(self.term, "/*");
        self.total_elements = 0;
        self.has_results = true;
        self.elements_per_page = 16;

        self.show_heroes_list = function() {
            return !_.isEmpty(self.heroes_table);
        };

        self.show_pagination = function () {
            if (!CharactersFactory.heroes_search_results.total)
                return false;

            return (CharactersFactory.heroes_search_results.total > self.elements_per_page);
        };

        CharactersFactory.search_heroes_by_name(self.term, self.elements_per_page*(self.page-1));

        CharactersFactory.subscribe("heroes_search_results", function(old_value, new_value) {
            if (!new_value.results.length) {
                self.has_results = false;
                return;
            }

            self.heroes_table = _.groupBy(new_value.results, function(hero, index) {
                var max_cols = 4;

                return Math.floor(index/max_cols);
            });

            self.total_elements = new_value.total;
        });

        $scope.$on("$destroy", function() {
            CharactersFactory.unsubscribe_all("heroes_search_results");
            CharactersFactory.publish("heroes_search_results", {});
            self.heroes_table = null;
            self.page = null;
            self.url_moc = null;
            self.total_elements = null;
            self.term = null;
        });
    }
})();
