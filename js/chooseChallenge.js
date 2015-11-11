/**
 * eva_web.js
 * @namespace eva_web.js.challenge
 */
angular
    .module('app.choosechallenge', [
        'ui.router',
        'ngRoute',
        'ngMaterial',
        'angular-timeline',
        'ngResource',
        'angular-scroll-animate',
        'ngAnimate'])
    .service('DialogService', DialogService)
    .service('ApiCallService', ApiCallerService)
    .controller('ChooseChallengeController', ChooseChallengeController)
    .controller('DialogController', DialogController)

ChooseChallengeController.$inject = ['$mdDialog', '$location', "DialogService", "ApiCallService"];


/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @param ApiCallService gets the data from the api
 * @constructor
 * @memberOf eva_web.js
 */
function ChooseChallengeController($mdDialog, $location, DialogService, ApiCallService) {
    var vmChallenge = this;

    activate();

    /**
     * @name challenge.ChallengeController.activate
     * @desc Resolve start-up logic for controller
     * @memberOf eva_web.js
     */
    function activate() {
        ApiCallService.getTodaysTasks().then(function (response) {
            var todaysTasks = response.data;
            console.log(todaysTasks);
            todaysTasks.forEach(function(task){
                task.challenge.shortDescription = giveTextBeforeDoubleWhitespace(task.challenge.description)
            });
            vmChallenge.todaysTasks = todaysTasks;
        });

        ApiCallService.getRegisterDateUser().then(function (response) {
            vmChallenge.daysBusy = calculateDaysBusy(response.data);
        });
    }

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

/**
 * @name calculateDaysBusy
 * @desc Calculate the days between the actual date and the date of the challenge
 * @param date The date of the current challenge
 * @returns {number} Number of days
 * @memberOf eva_web.js
 */
function calculateDaysBusy(date) {
    var milisecondsInADay = (1000 * 60 * 60 * 24);
    var dayDiff = Math.floor((Date.now() - new Date(date)) / milisecondsInADay);
    if (angular.isNumber(dayDiff)) {
        return dayDiff + 2;
    }
}

/**
 *
 * @name Controller: DialogController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @constructor
 */
function DialogController($mdDialog, DialogService) {
    var vmDialog = this;

    vmDialog.mdDialogData = DialogService.getChallenge();


    vmDialog.hide = function () {
        $mdDialog.hide();
    };

    vmDialog.cancel = function () {
        $mdDialog.cancel();
    };

    vmDialog.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

/**
 * @name Service: DialogService
 * @desc Service used to trigger the dialogbox. Part of Angular Material.
 * @returns {{getChallenge: Function, setChallenge: Function}}
 * @constructor
 * @memberOf eva_web.js
 */
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

