angular
    .module('EvaWeb')
    .config(routeConfig)

/**
 * @name config
 * @desc Organizes the routing.
 * ChallengeController has been attached on vmChallenge via 'controller as'.
 * @example <div>{{vmChallenge.dueDate}}</div>
 * @param $stateProvider
 * @param $urlRouterProvider
 * @memberOf evaweb.js.app
 */
function routeConfig($stateProvider, $urlRouterProvider) {
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
        .state('/register', {
            url: '/register',
            views: {
                'currentChallenge': {
                    templateUrl: './views/register.html',
                    controller: 'authController',
                },
                'timeline': {
                    templateUrl: './views/timeline.html',
                    controller: 'TimelineController',
                    controllerAs: 'vmChallenge'
                }
            }
        })
        .state('/login', {
            url: '/login',
            views: {
                'currentChallenge': {
                    templateUrl: './views/login.html',
                    controller: 'authController',
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