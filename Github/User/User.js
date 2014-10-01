angular
    .module('App.Github.User', [])
    .factory('User', [
        function () {
            User = function (name, avatar) {
                this.name = name;
                this.avatar = avatar;
                this.staleBranches = [];

                this.addStaleBranch = function (branch) {
                    this.staleBranches.push(branch);
                };
            };

            return User;
        }
    ]);
