/**
 * eva_web.js
 * @namespace eva_web.js
 */
angular
    .module('app.challenge', [
        'ui.router',
        'ngRoute',
        'ngMaterial',
        'angular-timeline',
        'ngResource',
        'angular-scroll-animate',
        'ngAnimate'])
    .service('DialogService', DialogService)
    .service('ApiCallService', ApiCallerService)
    .controller('ChallengeController', ChallengeController)
    .controller('DialogController', DialogController)
    .directive('leafDifficulty', leafDifficulty);

ChallengeController.$inject = ['$mdDialog', "DialogService", "ApiCallService"];
DialogController.$inject = ['$mdDialog', "DialogService"];

/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @param ApiCallService gets the data from the api
 * @constructor
 * @memberOf eva_web.js
 */
function ChallengeController($mdDialog, DialogService, ApiCallService) {
    var vmChallenge = this;

    activate();

    /**
     * @name challenge.ChallengeController.activate
     * @desc Resolve start-up logic for controller
     * @memberOf eva_web.js
     */
    function activate() {
        ApiCallService.getCurrentTaskUser().then(function (response) {
            var currentTask = response.data;

            //TODO zorg ervoor dat er in de databank telkens 1 challenge is met status 1, anders switchen naar andere view: challenge kiezen
            console.log(currentTask);

            vmChallenge.difficulties = [{
                current: currentTask.challenge.difficulty,
                max: 3
            }];

            vmChallenge.shortDescription = giveTextBeforeDoubleWhitespace(currentTask.challenge.description)
            //vmChallenge.daysBusy = calculateDaysBusy(tasks[0].dueDate);
            vmChallenge.dueDate = currentTask.dueDate;
            vmChallenge.completed = currentTask.completed;
            vmChallenge.challenge = currentTask.challenge;
            DialogService.setChallenge(currentTask.challenge);
        });

        ApiCallService.getRegisterDateUser().then(function(response){
            console.log(response.data);
            vmChallenge.daysBusy = calculateDaysBusy(response.data);
        });
    }

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

/**
 * @name Directive: leafDifficulty
 * @desc This directive displays a quantity of leafs based on the difficulty of the challenge. The maximum amount of leafs is set on 3.
 * The directive binds a template '<div class="leaf" ng-repeat="leaf in leafs" ng-class="leaf"></div>' on the div which contains 'leaf-rating'.
 * Based on http://stackoverflow.com/questions/23646395/rendering-a-star-rating-system-using-angularjs
 * @returns {{restrict: string, template: string, scope: {ratingValue: string, max: string}, link: Function}}
 * @example <span ng-repeat="rating in vmChallenge.ratings">
 *     <div leaf-rating difficulty-value="diff.current" max="diff.max"></div>
 </span>
 * @@memberOf eva_web.js
 */
function leafDifficulty() {
    var maxLeafs = 3;
    return {
        restrict: 'A',
        template: '<div class="leaf" ng-repeat="leaf in leafs" ng-class="leaf"></div>',
        scope: {
            difficultyValue: '=',
        },
        link: function (scope) {
            scope.leafs = [];
            for (var i = 0; i < maxLeafs; i++) {
                scope.leafs.push({
                    filled: i < scope.difficultyValue
                });
            }
        }
    }
}