angular
    .module('App.Github.Repo.Controller', [
        'App.Github.Repo',
        'App.Github.Branch',
        'App.Github.User'
    ])
    .controller('GithubRepoController', [
        '$scope', 'Repo', 'Branch', 'User', '$routeParams', function ($scope, Repo, Branch, User, $routeParams) {
            $scope.staleBranches = [];
            $scope.devs = [];
            $scope.branches = [];
            $scope.repo = new Repo($routeParams.owner, $routeParams.repo);

            $scope.$watch('repo', function (newValue) {
                if (newValue.master && newValue.master.object && newValue.master.object.sha) {
                    $scope.staleBranches = _.filter(newValue.branches, {ahead: 0});
                    $scope.devs = _.groupBy($scope.staleBranches, function (branch) {
                        if (branch.status && branch.status.commit) {
                            return branch.status.commit.author.name;
                        }
                    });

                    $scope.devs = _.map($scope.devs, function (dev) {
                        var user = new User(dev[0].status.commit.author.name, dev[0].status.avatar_url);
                        _.forEach(dev, function (branch) {
                            user.addStaleBranch(branch);
                        });
                        return User;
                    });
                }
            }, true);
        }
    ]);
