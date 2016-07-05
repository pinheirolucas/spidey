(function() {
    "use strict";

    angular
        .module("spidey.character")
        .factory("CharactersFactory", [
            "$timeout",
            "ObservableFactory",
            "SpideyProxyService",
            "SpinnerMediator",
            CharactersFactory
        ]);

    function CharactersFactory($timeout, ObservableFactory, SpideyProxyService, SpinnerMediator) {
        var _characters_factory = ObservableFactory.turn_observable();

        _characters_factory.all_heroes = {};
        _characters_factory.heroes_search_results = {};

        _characters_factory.get_all_heroes_with_offset = function(offset) {
            var url = "/characters";
            var params = {
                "limit": 16,
                "offset": offset,
                "orderBy": "name"
            };

            $timeout(function() {
                SpinnerMediator.show("all_heroes_spinner");
            }, 20);
            SpideyProxyService.http_request(
                "marvel",
                "GET",
                url,
                function(data) {
                    _characters_factory.publish("all_heroes", data);
                    SpinnerMediator.hide("all_heroes_spinner");
                },
                function(data) {
                    console.error(
                        "Error on request from: spidey.character.services.characters_factory.get_all_heroes_with_offset"
                    );
                    SpinnerMediator.hide("all_heroes_spinner");
                },
                params
            );
        };

        _characters_factory.search_heroes_by_name = function(name_starts_with, offset) {
            var url = "/characters";
            var params = {
                "nameStartsWith": name_starts_with,
                "limit": 16,
                "offset": offset,
                "orderBy": "name"
            };

            $timeout(function() {
                SpinnerMediator.show("search_spinner");
            }, 20);
            SpideyProxyService.http_request(
                "marvel",
                "GET",
                url,
                function(data) {
                    _characters_factory.publish("heroes_search_results", data);
                    SpinnerMediator.hide("search_spinner");
                },
                function(data) {
                    console.error(
                        "Error on request from: spidey.character.services.characters_factory._search_heroes_by_name"
                    );
                    SpinnerMediator.hide("search_spinner");
                },
                params
            );
        };

        return _characters_factory;
    }
})();
