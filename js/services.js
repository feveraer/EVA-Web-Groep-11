var challengeServices = angular.module('challengeServices', ['ngResource']);
var apiUrl = "http://95.85.59.29:1337/api/"

challengeServices.factory('Challenge', ['$resource',
    function ($resource) {
        return $resource(apiUrl + "users/562f3f87b0b8dc041bcc6ba7/tasks", {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);