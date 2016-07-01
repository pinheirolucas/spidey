(function() {
    "use strict";

    angular
        .module("spidey")
        .factory("ObservableFactory", [ObservableFactory]);

    function ObservableFactory() {
        function Observable() {
            this._subscriptions = {};
        }

        Observable.prototype.subscribe = function(attr, callback) {
            if (!attr || !(callback instanceof Function))
                return;

            if (this._subscriptions[attr])
                this._subscriptions[attr].push(callback);
            else
                this._subscriptions[attr] = [callback];
        };

        Observable.prototype.unsubscribe = function(attr, callback) {
            if (!this._subscriptions[attr])
                return;

            for (var i = 0; i < this._subscriptions[attr].length; i++) {
                if (this._subscriptions[attr][i] == callback) {
                    this._subscriptions[attr].splice(i, 1);
                    break;
                }
            }

            if (!this._subscriptions[attr].length)
                this._subscriptions[attr] = null;
        };

        Observable.prototype.unsubscribe_all = function(attr) {
            if (!(attr in this._subscriptions))
                return;

            this._subscriptions[attr] = null;
        };

        Observable.prototype.publish = function(attr, value) {
            var old_value = this[attr];
            var new_value = value;
            var callback = {};
            this[attr] = new_value;

            if (this._subscriptions[attr]) {
                for (var i = 0; i < this._subscriptions[attr].length; i++) {
                    callback = this._subscriptions[attr][i];
                    if (callback instanceof Function)
                        callback(old_value, new_value);
                }
            }

            old_value = null;
            new_value = null;
            callback = null;
        };

        return {
            "turn_observable": function() {
                return Object.create(new Observable());
            },
        };
    }
})();
