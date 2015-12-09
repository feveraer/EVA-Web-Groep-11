angular
    .module('app.showchallenge')
    .controller('ChallengeController', challengeController)

//challengeController.$inject = ['$mdDialog', '$location', "DialogService", "ApiCallService"];

/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param $location Needed to load new pages
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @param ApiCallService gets the data from the api
 * @constructor
 * @memberOf eva_web.js
 */
function challengeController($mdDialog, $location, DialogService, ApiCallService) {
    var vmChallenge = this;
    vmChallenge.isLoggedIn = auth.isLoggedIn;

    activate();

    /**
     * @name challenge.ChallengeController.activate
     * @desc Resolve start-up logic for controller
     * @memberOf eva_web.js
     */
    function activate() {
        if (vmChallenge.isLoggedIn()) {
            ApiCallService.getCurrentTaskUser().then(function (response) {
                if (response.data === "") {
                    $location.url('/ChooseChallenge')
                } else {

                    var currentTask = response.data;
                    //TODO zorg ervoor dat er in de databank telkens 1 challenge is met status 1, anders switchen naar andere view: challenge kiezen
                    vmChallenge.difficulties = [{
                        current: currentTask.challenge.difficulty,
                        max: 3
                    }];

                    vmChallenge.taskId = currentTask._id;
                    vmChallenge.status = currentTask.status;
                    vmChallenge.shortDescription = giveTextBeforeDoubleWhitespace(currentTask.challenge.description)
                    vmChallenge.dueDate = currentTask.dueDate;
                    vmChallenge.completed = currentTask.completed;
                    vmChallenge.challenge = currentTask.challenge;
                    DialogService.setChallenge(currentTask.challenge);
                }
            });

            ApiCallService.getRegisterDateUser().then(function (response) {
                vmChallenge.daysBusy = calculateDaysBusy(response.data);
            });
        }
    }

    //TODO duplicate
    // Shows Dialog
    vmChallenge.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './views/challengeDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vmDialog'
        });
    };
}