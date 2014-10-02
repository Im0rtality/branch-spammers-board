angular
    .module('App.Github.Repo', [
        'restangular',
        'App.Github.Branch'
    ])
    .factory('Repo', [
        'Branch', 'Restangular', function (Branch, Restangular) {

            Repo = function (owner, repo, success) {
                var self = this;

                this.branches = [];
                this.lastPage = null;
                this.owner = owner;
                this.name = repo;
                this.master = Restangular.all('repos').all(owner).all(repo).all('git')
                    .one('refs', 'heads/master').get().$object;

                this.read = function (page) {
                    var promise;
                    promise = Restangular
                        .withConfig(function (RestangularProvider) {
                            RestangularProvider.setFullResponse(true);
                        })
                        .all('repos').all(owner).all(repo).all('branches').getList({page: page});

                    promise.then(function (data) {

                        if (self.lastPage === null) {
                            self.lastPage = data.headers('Link').match(/page=(\d+)>; rel="last"/)[1];
                            for (var i = 2; i <= self.lastPage; i++) {
                                self.read(i);
                            }
                        }

                        _.forEach(data.data, function (branch) {
                            if (branch.commit) {
                                self.branches.push(
                                    new Branch(owner, repo, branch.commit.sha, branch.name, self.master.object.sha));
                            }
                        });

                        if (success) {
                            success(data.data);
                        }
                    });
                };

                this.read(1);

            };

            return Repo;
        }
    ]);
