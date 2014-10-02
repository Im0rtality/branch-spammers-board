angular
    .module('App.Filter.Tail', []).filter('tail', function () {
        return function (input) {
            return _.tail(input);
        };
    });
