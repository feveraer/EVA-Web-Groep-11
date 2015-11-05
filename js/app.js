/**
 * Eva Web App
 * @namespace EvaWebApp
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
                    controllerAs: 'vmChallenge'//,
                    //resolve: {
                    //    tasksForUser: tasksForUser
                    //}
                },
                'timeline': {
                    //url: '/home',
                    templateUrl: './views/timeline.html',
                    controller: 'TimelineController',
                    controllerAs: 'vmChallenge'
                }
            }
        });
    $urlRouterProvider.otherwise('/home');
}

//function tasksForUser(ApiCallerService){
//    var item = ApiCallerService.getChallengesUser()
//    console.log('tasksForUser')
//    console.log(item)
//    return ApiCallerService.getChallengesUser();
//}

//function ApiCallerService($http) {
//    var apiUrl = "http://95.85.59.29:1337/api/";
//    var user = "562f3f87b0b8dc041bcc6ba7";
//
//    //TODO user meegeven met deze functie
//    this.getChallengesUser = function () {
//        return $http.get(apiUrl + "users/" + user + "/tasks").then(function (response) {
//            console.log('service')
//            console.log(response.data)
//            return response.data;
//        });
//    };
//}

function ApiCallerService($http) {
    //var apiUrl = "http://95.85.59.29:1337/api/";
    var apiUrl = "http://127.0.0.1:1337/api/";
    var user = "562f3f87b0b8dc041bcc6ba7";

    //TODO user meegeven met deze functie
    this.getTasksUser = function () {
        return $http.get(apiUrl + "users/" + user + "/tasks");
    };
}
