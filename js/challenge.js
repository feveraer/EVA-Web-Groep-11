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
    .directive('leafRatingDirective', leafRatingDirective);

/*Injection into controllers*/
ChallengeController.$inject = ['$mdDialog', 'Challenge', "DialogService"]
DialogController.$inject = ['$mdDialog', "DialogService"]
ChallengeFactory.$inject = ['$resource']

/*Controllers*/
function ChallengeController($mdDialog, Challenge, DialogService) {
    var vmChallenge = this;
    vmChallenge.animateIconIn = animateIconIn;
    vmChallenge.animateIconOut = animateIconOut;
    vmChallenge.animatePanelsTimeLineLeftIn = animatePanelsTimeLineLeftIn;
    vmChallenge.animatePanelsTimeLineLeftOut = animatePanelsTimeLineLeftOut;
    vmChallenge.animatePanelsTimeLineRightIn = animatePanelsTimeLineRightIn;
    vmChallenge.animatePanelsTimeLineRightOut = animatePanelsTimeLineRightOut;
    vmChallenge.daysLeft = dDiff;
    vmChallenge.clickButton = clickButton;
    vmChallenge.onClickVoltooi = onClickVoltooi;
    vmChallenge.loadGlyphicon = loadGlyphicon;

    Challenge.query().$promise.then(function (data) {

        var tasks = data;
        var currentTask = tasks[3];
        var completedTasks = [];

        vmChallenge.ratings = [{
            current: currentTask.challenge.difficulty,
            max: 3
        }];

        tasks.forEach(function (task) {
            if (task.completed) {
                completedTasks.push(task)
            }
        });

        completedTasks.sort(sortTasksByDateDesc);

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

    /*===========Animation==========*/
    function animateIconIn($el) {
        $el.removeClass('hidden');
        $el.addClass('animated bounceIn');
    };

    function animateIconOut($el) {
        $el.addClass('hidden');
        $el.removeClass('animated bounceInRight');
    };

    //animation Left
    function animatePanelsTimeLineLeftIn($el) {
        $el.removeClass('hidden2');
        $el.addClass('animated bounceInLeft');
    };

    function animatePanelsTimeLineLeftOut($el) {
        $el.addClass('hidden2');
        $el.removeClass('animated bounceInLeft');
    };

    //animations right
    function animatePanelsTimeLineRightIn($el) {
        $el.removeClass('hidden2');
        $el.addClass('animated bounceInRight');
    };

    function animatePanelsTimeLineRightOut($el) {
        $el.addClass('hidden2');
        $el.removeClass('animated bounceInRight');
    };

    /*Calculate date*/
    function dDiff() {
        var magicNumber = (1000 * 60 * 60 * 24);
        var dayDiff = Math.floor((vmChallenge.dueDate - Date.now()) / magicNumber);
        if (angular.isNumber(dayDiff)) {
            return dayDiff + 1;
        }
    }

    function clickButton() {
        console.log("Button Clicked");
        //angular.element(".cardDiv").addClass();
        angular.element(this).addClass('animated hinge');

    }

    function onClickVoltooi() {
        console.log("Button Clicked");
    }


    function loadGlyphicon(name){

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
}

function DialogController($mdDialog, DialogService) {
    var vmDialog = this;

    vmDialog.mdDialogData = DialogService.getChallenge();

    console.log(vmDialog.mdDialogData);

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

//Factories
function ChallengeFactory($resource) {
    var apiUrl = "http://95.85.59.29:1337/api/";
    return $resource(apiUrl + "users/562f3f87b0b8dc041bcc6ba7/tasks", {}, {
        query: {method: 'GET', isArray: true}
    });
}

//Services
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

//Directives
function leafRatingDirective() {
    return {
        restrict: 'A',
        template: '<div class="leaf" ng-repeat="leaf in leafs" ng-class="leaf"></div>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.leafs = [];
            for (var i = 0; i < scope.max; i++) {
                scope.leafs.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
}

/*Functions*/
var sortTasksByDateDesc = function (task1, task2) {
    return new Date(task2.dueDate) - new Date(task1.dueDate);
};
