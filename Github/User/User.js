angular
    .module('App.Github.User', [])
    .factory('User', [
        function () {
            User = function (name, avatar) {
                this.name = name;
                this.avatar = avatar;
                this.count = 0;
            };

            return User;
        }
    ]);
