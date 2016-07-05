(function() {
    "use strict";

    angular
        .module("spidey")
        .factory("SpinnerMediator", [
            "$timeout",
            "ObservableFactory",
            SpinnerMediator
        ]);

    function SpinnerMediator($timeout, ObservableFactory) {
        var _spinner_mediator = ObservableFactory.turn_observable();

        function Spinner(tolerance) {
            var self = this;

            self.is_visible = false;
            self._tolerance = tolerance || 0;
            self._timeout_instance = {};
            self.register_timeout = function(callback) {
                self.cancel_timeout();
                self._timeout_instance = $timeout(callback, self._tolerance);
            };
            self.cancel_timeout = function() {
                $timeout.cancel(self._timeout_instance);
                self._timeout_instance = {};
            };
        }

        var _spinners = {};

        var _validate_before_change = function(name) {
            return (name && (name in _spinners));
        };

        _spinner_mediator.register = function(name, tolerance) {
            _spinners[name] = new Spinner(tolerance);
        };

        _spinner_mediator.unregister = function(name) {
            _spinners[name] = null;
        };

        _spinner_mediator.show = function(name) {
            if (!_validate_before_change(name))
                return;

            _spinners[name].register_timeout(function() {
                _spinners[name].is_visible = true;
            });
        };

        _spinner_mediator.hide = function(name) {
            if (!_validate_before_change(name))
                return;

            _spinners[name].cancel_timeout();
            _spinners[name].is_visible = false;
        };

        _spinner_mediator.hide_all = function() {
            for (var spinner_name in _spinners) {
                if (_spinners[spinner_name]) {
                    _spinners[spinner_name].cancel_timeout();
                    _spinners[spinner_name].is_visible = false;
                }
            }
        };

        _spinner_mediator.toggle = function(name) {
            if (!_validate_before_change(name))
                return;

            _spinners[name].is_visible = !_spinners[name].is_visible;
        };

        _spinner_mediator.is_visible = function(name) {
            if (!_validate_before_change(name))
                return false;

            return _spinners[name].is_visible;
        };

        return _spinner_mediator;
    }
})();
