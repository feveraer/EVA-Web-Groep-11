angular
    .module('EvaWeb', [
        'ui.router',
        'ngRoute',
        'app.challenge',
        'ngMaterial',
        'angular-timeline',
        'ngSanitize',
        'angular-scroll-animate'
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

