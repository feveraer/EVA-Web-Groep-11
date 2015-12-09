angular
    .module('app.choosechallenge')
    .controller('ChooseChallengeController', chooseChallengeController)

//chooseChallengeController.$inject = ['$mdDialog', '$location', "DialogService", "ApiCallService"];

/**
 *@name Controller: ChooseChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @param ApiCallService gets the data from the api
 * @constructor
 * @memberOf eva_web.js
 */
function chooseChallengeController($mdDialog, $location, DialogService, ApiCallService, auth) {
    var vmChallenge = this;
    vmChallenge.isLoggedIn = auth.isLoggedIn;

    activate();

    /**
     * @name challenge.ChooseChallengeController.activate
     * @desc Resolve start-up logic for controller
     * @memberOf eva_web.js
     */
    function activate() {
        if (vmChallenge.isLoggedIn()) {
            ApiCallService.getTodaysTasks().then(function (response) {
                var todaysTasks = response.data;
                todaysTasks.forEach(function (task) {
                    task.challenge.shortDescription = giveTextBeforeDoubleWhitespace(task.challenge.description)
                    if (task.status === 2) {
                        $location.url('/challengeCompleted')
                    }
                    if (task.status === 1) {
                        $location.url('/home')
                    }
                });
                vmChallenge.todaysTasks = todaysTasks;
            });

            ApiCallService.getRegisterDateUser().then(function (response) {
                vmChallenge.daysBusy = calculateDaysBusy(response.data);
            });
        }
    }

    // TODO duplicate
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
