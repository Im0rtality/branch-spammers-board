'use strict';

angular.module('App', [
    'ngRoute',
    'restangular',
    'App.Github.Repo.Controller',
    'App.Github.Branch.Controller',
    'App.Filter.Magic'
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
                .when('/repo/:owner/:repo/:sha', {
                    templateUrl: 'Github/Branch/partial.html',
                    controller: 'GithubBranchController'
                })
                .otherwise({redirectTo: '/repo/???/???'});
        }
    ]);
