'use strict';

angular.module('App', [
    'ngRoute',
    'restangular',
    'App.Github.Repo.Controller'
    ])
    .config([
        '$routeProvider', 'RestangularProvider', function ($routeProvider, RestangularProvider) {
            RestangularProvider.setBaseUrl('https://api.github.com/');
            RestangularProvider.setDefaultHeaders({Authorization: "token ???"});

            $routeProvider
                .when('/repo/:owner/:repo', {
                    templateUrl: 'Github/Repo/partial.html',
                    controller: 'GithubRepoController'
                })
                .otherwise({redirectTo: '/repo/???/???'});
        }
    ]);
