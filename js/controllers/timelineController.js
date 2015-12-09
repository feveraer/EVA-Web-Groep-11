angular
    .module('app.timeline')
    .controller('TimelineController', TimelineController)

TimelineController.$inject = ['ApiCallService', 'auth'];

/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @constructor
 * @memberOf eva_web.js
 */
function TimelineController(ApiCallService, auth) {
    var vmChallenge = this;
    vmChallenge.animateIcon = animateIcon;
    vmChallenge.animatePanelLeft = animatePanelLeft;
    vmChallenge.animatePanelRight = animatePanelRight;
    vmChallenge.loadGlyphicon = loadGlyphicon;
    vmChallenge.isLoggedIn = auth.isLoggedIn;

    activate();

    /**
     * @name timeline.TimelineController.activate
     * @desc Resolve start-up logic for controller
     * @memberOf eva_web.js
     */
    function activate() {
        if (vmChallenge.isLoggedIn()) {
            ApiCallService.getCompletedTasksForUser().then(function (response) {
                var tasks = response.data;
                tasks.forEach(function (task) {
                    task.challenge.shortDescription = giveTextBeforeDoubleWhitespace(task.challenge.description)
                });
                tasks.sort(sortTasksByDateDesc);
                vmChallenge.tasks = tasks;
            });
        }
    }
}