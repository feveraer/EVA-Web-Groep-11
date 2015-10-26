var challengeServices = angular.module('challengeServices', ['ngResource']);
var apiUrl = "http://95.85.59.29:1337/api/"

challengeServices.factory('Challenge', ['$resource',
    function ($resource) {
        return $resource(apiUrl + "users/562e08591349e7816d10dbd4/tasks", {}, {
            query: {method: 'GET', isArray: true}
        });
    }
]);