var challengeServices = angular.module('challengeServices', ['ngResource']);
var apiUrl = "http://95.85.59.29:1337/api/"

challengeServices.factory('Challenge', ['$resource',
    function ($resource) {
        return $resource(apiUrl + "users/56224ab96dcac34e5e596a35/tasks", {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);