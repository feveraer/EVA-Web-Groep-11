angular
    .module('EvaWeb', [
        'ui.router',
        'ngRoute',
        'app.challenge',
        'challengeServices',
        'ngMaterial',
        'angular-timeline'
    ])
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './views/home.html',
            controller: 'ChallengeController',
            controllerAs: 'vmChallenge'
        });
    $urlRouterProvider.otherwise('/home');
}

