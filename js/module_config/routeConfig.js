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
                'landing':{
                    templateUrl: './views/landingPage.html',
                    controller: 'authController',
                    controllerAs: 'vmAuth'
                },
                'currentChallenge': {
                    templateUrl: './views/home.html',
                    controller: 'ChallengeController',
                    controllerAs: 'vmChallenge'
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
                'landing':{
                    templateUrl: './views/landingPage.html',
                    controller: 'authController',
                    controllerAs: 'vmAuth'
                },
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
                'landing':{
                    templateUrl: './views/landingPage.html',
                    controller: 'authController',
                    controllerAs: 'vmAuth'
                },
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
                'landing':{
                    templateUrl: './views/register.html',
                    controller: 'authController',
                    controllerAs: 'vmAuth'
                },
            }
        })
        .state('/login', {
            url: '/login',
            views: {
                'landing':{
                    templateUrl: './views/login.html',
                    controller: 'authController',
                    controllerAs: 'vmAuth'
                }
            }
        })
    ;
    $urlRouterProvider.otherwise('/home');
}