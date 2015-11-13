/**
 * eva_web.js
 * @namespace eva_web.js
 */
angular
    .module('app.timeline', [
        //'ui.router',
        //'ngRoute',
        //'ngMaterial',
        //'angular-timeline',
        //'ngResource',
        //'angular-scroll-animate',
        //'ngAnimate'
    ])
    .service('ApiCallService', ApiCallService)
    .controller('TimelineController', TimelineController)

TimelineController.$inject = ['ApiCallService']

/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @constructor
 * @memberOf eva_web.js
 */
function TimelineController(ApiCallService) {
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
    function activate() {
        ApiCallService.getCompletedTasksForUser().then(function (response) {
            var tasks = response.data;
            tasks.forEach(function(task){
                task.challenge.shortDescription = giveTextBeforeDoubleWhitespace(task.challenge.description)
            });
            tasks.sort(sortTasksByDateDesc);
            vmChallenge.tasks = tasks;
        });
    }
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
        case 'dinner':
            return 'glyphicon-glass';
        case 'breakfast':
            return 'glyphicon-grain';
        case 'lunch':
            return 'glyphicon-leaf';
        case 'social':
            return 'glyphicon-heart';
        case 'restaurant':
            return 'glyphicon-cutlery';
        case 'snack':
            return 'glyphicon-apple';
        default:
            return 'glyphicon-heart';
    }
}