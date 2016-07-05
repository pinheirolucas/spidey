(function() {
    "use strict";

    angular
        .module("spidey.character")
        .factory("CharactersFactory", ["ObservableFactory", "SpideyProxyService", CharactersFactory]);

    function CharactersFactory(ObservableFactory, SpideyProxyService) {
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

            SpideyProxyService.http_request(
                "marvel",
                "GET",
                url,
                function(data) {
                    _characters_factory.publish("all_heroes", data);
                },
                function(data) {
                    console.error(
                        "Error on request from: spidey.character.services.characters_factory.get_all_heroes_with_offset"
                    );
                },
                params
            );
        };

        _characters_factory.search_heroes_by_name = function(name_starts_with, offset) {
            var url = "/characters";
            var params = {
                "nameStartsWith": name_starts_with,
                "limit": 30,
                "offset": offset,
                "orderBy": "name"
            };

            SpideyProxyService.http_request(
                "marvel",
                "GET",
                url,
                function(data) {
                    console.log(data);

                    _characters_factory.publish("heroes_search_results", data);
                },
                function(data) {
                    console.error(
                        "Error on request from: spidey.character.services.characters_factory._search_heroes_by_name"
                    );
                },
                params
            );
        };

        return _characters_factory;
    }
})();
