angular
    .module('App.Github.Repo.Controller', [
        'App.Github.Repo',
        'App.Github.Branch',
        'App.Github.User'
    ])
    .controller('GithubRepoController', [
        '$scope',
        'Repo',
        'Branch',
        'User',
        '$routeParams',
        '$timeout',
        function ($scope, Repo, Branch, User, $routeParams, $timeout) {
            $scope.staleBranches = [];
            $scope.loading = true;
            $scope.devs = null;
            $scope.branches = [];
            $scope.repo = new Repo($routeParams.owner, $routeParams.repo);

            $scope.$watch('repo', function (newValue) {
                if (newValue.master && newValue.master.object && newValue.master.object.sha) {
                    if ($scope.timer) {
                        $timeout.cancel($scope.timer);
                        $scope.timer = null;
                    }
                    $scope.timer = $timeout(function () {
                        $scope.timer = null;
                        $scope.loading = false;
                    }, 200);
                    $scope.staleBranches = _.filter(newValue.branches, {ahead: 0});
//                    if ($scope.staleBranches.length) {
//                        $scope.loading = false;
//                    }

                    $scope.devs = _($scope.staleBranches)
                        .filter(function (branch) {
                            return branch.status && branch.status.commit;
                        })
                        .groupBy(function (branch) {
                            return branch.status.commit.author.name;
                        })
                        .map(function (dev) {
                            if (dev[0].status && dev[0].status.commit && dev[0].status.committer) {
                                var user = new User(dev[0].status.commit.author.name,
                                    dev[0].status.committer.avatar_url);
                                user.count = dev.length;
                                return user;
                            }
                        })
                        .filter(function (dev) {
                            return dev.count >= 5;
                        })
                        .sortBy('count')
                        .reverse()
                        .valueOf();

                }
            }, true);
        }
    ]);
