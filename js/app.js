/**
 * evaweb
 * @namespace evaweb.js.app
 */
angular
    .module('EvaWeb', [
        'ui.router',
        'ngRoute',
        'app.challenge',
        'app.timeline',
        'app.choosechallenge',
        'ngMaterial',
        'angular-timeline',
        'ngSanitize',
        'angular-scroll-animate',
        'pascalprecht.translate'
    ])
    .config(config)
    .config(translationConfig);

/**
 * @name config
 * @desc Organizes the routing.
 * ChallengeController has been attached on vmChallenge via 'controller as'.
 * @example <div>{{vmChallenge.dueDate}}</div>
 * @param $stateProvider
 * @param $urlRouterProvider
 * @memberOf evaweb.js.app
 */
function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('/home', {
            url: '/home',
            views: {
                'currentChallenge': {
                    templateUrl: './views/home.html',
                    controller: 'ChallengeController',
                    controllerAs: 'vmChallenge'//,
                },
                'timeline': {
                    templateUrl: './views/timeline.html',
                    controller: 'TimelineController',
                    controllerAs: 'vmChallenge'
                }
            }
        })
        .state('/ChooseChallenge', {
            url: '/ChooseChallenge',
            views: {
                'currentChallenge': {
                    templateUrl: './views/chooseChallenge.html',
                    controller: 'ChooseChallengeController',
                    controllerAs: 'vmChallenge'
                },
                'timeline': {
                    templateUrl: './views/timeline.html',
                    controller: 'TimelineController',
                    controllerAs: 'vmChallenge'
                }
            }
        })
        .state('/challengeCompleted', {
            url: '/challengeCompleted',
            views: {
                'currentChallenge': {
                    templateUrl: './views/challengeCompleted.html'
                },
                'timeline': {
                    templateUrl: './views/timeline.html',
                    controller: 'TimelineController',
                    controllerAs: 'vmChallenge'
                }
            }
        })
    ;
    $urlRouterProvider.otherwise('/home');
}

/**
 * @name translationConfig
 * @desc Translates (Binds translations.js to app.js)
 * @param $translateProvider
 * @memberOf evaweb.js.app
 */
function translationConfig($translateProvider) {
    $translateProvider
        .translations('nl', translationsNL)
        .translations('en', translationsEN)
        .translations('fr', translationsFr)
        .preferredLanguage('nl')
        .fallbackLanguage('nl');
}
