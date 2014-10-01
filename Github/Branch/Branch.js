angular
    .module('App.Github.Branch', [
        'restangular'
    ])
    .factory('Branch', [
        'Restangular', function (Restangular) {
            Branch = function (owner, repo, sha, name, base) {
                this.owner = owner;
                this.repo = repo;
                this.name = name;
                this.sha = sha;

                this.load = function () {
                    this.status = Restangular.all('repos').all(owner).all(repo).one('commits', sha).get().$object;
                };

                var promise, self = this;

                promise = Restangular.all('repos').all(owner).all(repo).one('compare',
                    base + '...' + sha).get();

                promise.then(function (data) {
                    self.ahead = data.ahead_by;
                    self.behind = data.behind_by;
                    if (self.ahead === 0) {
                        self.stale = true;
                        self.load();
                    }
                });
            };
            return Branch;
        }
    ]);
