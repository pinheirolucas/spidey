(function() {
    "use strict";

    angular
        .module("spidey")
        .service("SpideyProxyService", [
            "$http",
            "$location",
            "ObservableFactory",
            ThorProxyService
        ]);

    function ThorProxyService($http, $location, ObservableFactory) {
        var self = this;

        var _config = {
            "apis": {
                "marvel": "http://gateway.marvel.com/v1/public",
                "blank": ""
            },
            "keys": {
                "public": "af3e71c5d09221073abf7644593af23a"
            }
        };

        function HttpGet(api, url, params) {
            params.apikey = _config.keys.public;

            this.method = "GET";
            this.url = _config.apis[api].concat(url);
            this.params = params;
        }

        self.http_request = function(api, method, url, success_callback, error_callback, params) {
            params = params ? params : {};

            var request_object = {};

            switch (method) {
                case "GET":
                    request_object = new HttpGet(api, url, params);
                    break;
            }

            $http(request_object)
                .then(
                    function(response) {
                        success_callback(response.data.data);
                    },
                    function(response) {
                        error_callback(response.data);
                    }
                );
        };
    }
})();
