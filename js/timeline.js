/**
 * eva_web.js
 * @namespace eva_web.js
 */
angular
    .module('app.timeline', [
        'ui.router',
        'ngRoute',
        'ngMaterial',
        'angular-timeline',
        'ngResource',
        'angular-scroll-animate',
        'ngAnimate'])
    .service('ApiCallService', ApiCallerService)
    .controller('TimelineController', TimelineController)
//    .factory('Challenge', ChallengeFactory)

TimelineController.$inject = ['ApiCallService']
//TimelineController.$inject = ['Challenge']
//ChallengeFactory.$inject = ['$resource']

/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @constructor
 * @memberOf eva_web.js
 */
function TimelineController(/*Challenge,*/ ApiCallService) {
    var vmChallenge = this;
    vmChallenge.animateIcon = animateIcon;
    vmChallenge.animatePanelLeft = animatePanelLeft;
    vmChallenge.animatePanelRight = animatePanelRight;
    vmChallenge.loadGlyphicon = loadGlyphicon;

    activate();

    /**
     * @name timeline.TimelineController.activate
     * @desc Resolve start-up logic for controller
     * @memberOf eva_web.js
     */
    function activate(){
        ApiCallService.getTasksUser().then(function (response) {
            var tasks = response.data;
            var completedTasks = [];

            tasks.forEach(function (task) {
                if (task.completed) {
                    completedTasks.push(task)
                }
            });

            //TODO check if obsolete
            completedTasks.sort(sortTasksByDateDesc);

            vmChallenge.tasks = completedTasks;
        });
    }

    ///**@name Challenge.query();
    // * @desc Challenge.query retrieves a collection of tasks from the server.
    // * The then() method returns a promise.
    // * @memberOf eva_web.js
    // */
    //Challenge.query().$promise.then(function (data) {
    //    var tasks = data;
    //    var completedTasks = [];
    //
    //    vmChallenge.difficulties = [{
    //        current: currentTask.challenge.difficulty,
    //        max: 3
    //    }];
    //
    //    tasks.forEach(function (task) {
    //        if (task.completed) {
    //            completedTasks.push(task)
    //        }
    //    });
    //
    //    //TODO check if obsolete
    //    completedTasks.sort(sortTasksByDateDesc);
    //
    //    vmChallenge.tasks = tasks;
    //});
}


/**
 * @name loadGlyphicon
 * @desc Sets The glyphicon per category
 * @param name The name of category
 * @example <img ng-src="img/veggi{{task.challenge.category.name}}.jpg" class="timeLineImage">
 * @returns {String}
 * @memberOf eva_web.js
 */
function loadGlyphicon(name) {
    switch (name) {
        case 'Dinner':
            return 'glyphicon-glass';
        case 'Breakfast':
            return 'glyphicon-grain';

        case 'Lunch':
            return 'glyphicon-leaf';
        case 'Social':
            return 'glyphicon-heart';

        default:
            return 'glyphicon-heart';
    }
}

///**
// * @name Factory: ChallengeFactory
// * @desc Factory which creates a resource object that lets you interact with RESTful server-side data sources.
// * @param $resource Injection of the resource service. Requires the ngResource dependency.
// * @constructor
// */
//function ChallengeFactory($resource) {
//    var apiUrl = "http://95.85.59.29:1337/api/";
//    return $resource(apiUrl + "users/562f3f87b0b8dc041bcc6ba7/tasks", {}, {
//        query: {method: 'GET', isArray: true}
//    });
//}
///**
// * @name Service: DialogService
// * @desc Service used to trigger the dialogbox. Part of Angular Material.
// * @returns {{getChallenge: Function, setChallenge: Function}}
// * @constructor
// * @memberOf eva_web.js
// */

function DialogService() {
    var challenge;

    return {
        getChallenge: function () {
            return challenge;
        },
        setChallenge: function (value) {
            challenge = value;
        }
    };
}

/**
 * @name Function sortTasksByDateDesc
 * @desc Sorts the challenges by date in descending order.
 * @param task1
 * @param task2
 * @returns {number}
 * @memberOf eva_web.js
 */
var sortTasksByDateDesc = function (task1, task2) {
    return new Date(task2.dueDate) - new Date(task1.dueDate);
};