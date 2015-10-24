
var challengeServices = angular.module('challengeServices', ['ngResource']);

challengeServices.factory('Challenge', ['$resource',
    function($resource){
        return $resource("http://95.85.59.29:1337/api/users/56224ab96dcac34e5e596a35/tasks", {}, {
            query: {method:'GET', isArray:true}
        });
    }
]);