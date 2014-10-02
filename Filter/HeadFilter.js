angular
    .module('App.Filter.Head', []).filter('head', function () {
        return function (input) {
            return [_.head(input)];
        };
    });
