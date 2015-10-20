
var app = angular.module('EvaWeb',['ui.router', 'ngRoute', 'challengeControllers', 'challengeServices', 'ngMaterial']);


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './views/home.html',
                controller: 'challengeDetailCtrl'
            });

        $urlRouterProvider.otherwise('/home');
    }
]);



app.directive('leafRating', function () {
    return {
        restrict: 'A',
        template:
        '<div class="leaf" ng-repeat="leaf in leafs" ng-class="leaf"></div>' ,
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.leafs = [];
            for (var i = 0; i < scope.max; i++) {
                scope.leafs.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});





