(function () {
    var app = angular.module('app', []);

    app.factory('dataservice', ['$http', function ($http) {
        var factory = {};

        factory.getPeople = function () {
            return $http.get('people.json')
                .then(function (data, status, headers, config) {
                    return data.data;
                })
                .catch(function (msg) {
                    $log.error(msg);
                });
        }

        return factory;

    }]);

    app.controller('MainController', ['dataservice', function (dataservice) {
        var vm = this;

        vm.getArrayItem = getArrayItem;
        vm.getCount = getCount;
        vm.selectedIndex = 0;
        vm.selectedUser = {}
        vm.selectUser = selectUser;
        vm.ratingCount = new Array(5);
        vm.users = [];

        dataservice.getPeople()
            .then(function (data) {
                vm.users = data.People;
                vm.selectedUser = data.People[0];
            });

        function getArrayItem(arr, index) {
            if (typeof arr[index] === 'undefined') {
                return '';
            }
            else {
                return arr[index];
            }
        }

        function getCount(people) {
            return new Array((people.Likes.length > people.Dislikes.length) ? people.Likes.length : people.Dislikes.length);
        }

        function selectUser(user, index) {
            vm.selectedIndex = index;
            vm.selectedUser = user;
        }


    }])


})();