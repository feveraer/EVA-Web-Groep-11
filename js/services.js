
var challengeServices = angular.module('challengeServices', ['ngResource']);

challengeServices.factory('Challenge', ['$resource',
    function($resource){
        return $resource("http://95.85.59.29:1337/api/users/5620a54429b03cf71b0607e9/tasks", {}, {
            query: {method:'GET', isArray:true}
        });
    }]);