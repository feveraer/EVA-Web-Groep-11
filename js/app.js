/**
 * Eva Web App
 * @namespace EvaWebApp
 */
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

/**
 * @name config
 * @desc Organizes the routing.
 * ChallengeController has been attached on vmChallenge via 'controller as'.
 * @example <div>{{vmChallenge.dueDate}}</div>
 * @param $stateProvider
 * @param $urlRouterProvider
 * @memberOf EvaWebApp
 */
function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/home', {
            url: '/home',
            views: {
                'currentChallenge': {
                    //url: '/home',
                    templateUrl: './views/home.html',
                    controller: 'ChallengeController',
                    controllerAs: 'vmChallenge'
                },
                'timeline': {
                    //url: '/home',
                    templateUrl: './views/timeline.html',
                    controller: 'ChallengeController',
                    controllerAs: 'vmChallenge'
                }
            }
        });
    $urlRouterProvider.otherwise('/home');
}

