var app = angular.module('EvaWeb', ['ui.router', 'ngRoute', 'app.challenge', 'ngMaterial', 'angular-timeline']);


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './views/home.html',
                controller: 'ChallengeController',
                controllerAs: 'vmChallenge'
            });

        $urlRouterProvider.otherwise('/home');
    }
]);




