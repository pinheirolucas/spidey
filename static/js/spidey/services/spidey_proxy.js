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
                "marvel": "http://gateway.marvel.com/v1",
                "blank": ""
            }
        };

        function HttpGet(api, url) {
            this.method = "GET";
            this.url = _config.apis[api].concat(url);
        }

        self.simple_request = function(method, url, success_callback, error_callback) {
            console.log("do something");
        };

        self.http_request = function(api, method, url, success_callback, error_callback) {
            var request_object = {};

            switch (method) {
                case "GET":
                    request_object = new HttpGet(api, url);
                    break;
            }

            $http(request_object)
                .then(
                    function(response) {
                        success_callback(response.data);
                    },
                    function(response) {
                        error_callback(response.data);
                    }
                );
        };
    }
})();
