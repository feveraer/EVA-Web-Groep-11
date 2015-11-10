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
        });
    $urlRouterProvider.otherwise('/home');
}

/**
 * @name ApiCallerService
 * @desc Provides API calls.
 * @param $http
 * @memberOf evaweb.js.app
 */
function ApiCallerService($http) {
    //var apiUrl = "http://95.85.59.29:1337/api/";
    var apiUrl = "http://127.0.0.1:1337/api/";
    var user = "562f3f87b0b8dc041bcc6ba7";

    this.getCompletedTasksForUser = function () {
        return $http.get(apiUrl + "users/" + user + "/completedTasks");
    }

    this.getCurrentTaskUser = function () {
        return $http.get(apiUrl + "users/" + user + "/currentTask");
    }

    this.getRegisterDateUser = function () {
        return $http.get(apiUrl + "users/" + user + "/registeredOn");
    }
}
