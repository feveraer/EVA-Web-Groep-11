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
    ;
    $urlRouterProvider.otherwise('/home');
}

/**
 * @name ApiCallerService
 * @desc Provides API calls.
 * @param $http
 * @memberOf evaweb.js.app
 */
function ApiCallerService($http) {
    var apiUrl = "http://95.85.59.29:1337/api/";
    //var apiUrl = "http://127.0.0.1:1337/api/";
    var user = "5643262312e2b6b0278ce4a9";

    this.getCompletedTasksForUser = function () {
        return $http.get(apiUrl + "users/" + user + "/completedTasks");
    }

    this.getCurrentTaskUser = function () {
        return $http.get(apiUrl + "users/" + user + "/currentTask");
    }

    this.getRegisterDateUser = function () {
        return $http.get(apiUrl + "users/" + user + "/registeredOn");
    }

    this.getTodaysTasks = function () {
        return $http.get(apiUrl + "users/" + user + "/todaysTasks");
    }

    this.updateChoosenChallenge = function(taskId, data){
        var config = {headers: {
            'Content-Type': 'application/json'
        }};
        return $http.put(apiUrl + "users/" + user + "/tasks/" + taskId, data, config);
    }
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
