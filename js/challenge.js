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
    .controller('ChallengeController', ChallengeController)
    .controller('DialogController', DialogController)
    .factory('Challenge', ChallengeFactory)
    .directive('leafDifficulty', leafDifficulty);

ChallengeController.$inject = ['$mdDialog', 'Challenge', "DialogService"]
DialogController.$inject = ['$mdDialog', "DialogService"]
ChallengeFactory.$inject = ['$resource']

/**
 *@name Controller: ChallengeController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param Challenge Factory gets the data from the api
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @constructor
 * @memberOf eva_web.js
 */
function ChallengeController($mdDialog, Challenge, DialogService) {
    var vmChallenge = this;
    vmChallenge.animateIcon = animateIcon;
    vmChallenge.animatePanelLeft = animatePanelLeft;
    vmChallenge.animatePanelRight = animatePanelRight;
    vmChallenge.clickButton = clickButton;
    vmChallenge.onClickVoltooi = onClickVoltooi;
    vmChallenge.loadGlyphicon = loadGlyphicon;


    /**@name Challenge.query();
     * @desc Challenge.query retrieves a collection of tasks from the server.
     * The then() method returns a promise.
     * @memberOf eva_web.js
     */
    Challenge.query().$promise.then(function (data) {
        var tasks = data;
        var currentTask = tasks[2];
        var completedTasks = [];

        vmChallenge.difficulties = [{
            current: currentTask.challenge.difficulty,
            max: 3
        }];

        tasks.forEach(function (task) {
            if (task.completed) {
                completedTasks.push(task)
            }
        });

        //TODO check if obsolete
        completedTasks.sort(sortTasksByDateDesc);

        vmChallenge.daysBusy = calculateDaysBusy(tasks[0].dueDate);
        vmChallenge.tasks = tasks;
        vmChallenge.dueDate = currentTask.dueDate;
        vmChallenge.completed = currentTask.completed;
        vmChallenge.challenge = currentTask.challenge;
        DialogService.setChallenge(currentTask.challenge);
    });

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
        return dayDiff;
    }
}

function clickButton() {
    console.log("Button Clicked");
    angular.element(this).addClass('animated hinge');

}

function onClickVoltooi() {
    console.log("Button voltooi Clicked");
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
 * @name Factory: ChallengeFactory
 * @desc Factory which creates a resource object that lets you interact with RESTful server-side data sources.
 * @param $resource Injection of the resource service. Requires the ngResource dependency.
 * @constructor
 */
function ChallengeFactory($resource) {
    var apiUrl = "http://95.85.59.29:1337/api/";
    return $resource(apiUrl + "users/562f3f87b0b8dc041bcc6ba7/tasks", {}, {
        query: {method: 'GET', isArray: true}
    });
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