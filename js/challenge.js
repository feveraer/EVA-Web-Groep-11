angular
    .module('app.challenge', ['ui.router', 'ngRoute', 'ngMaterial', 'angular-timeline','ngResource'])
    .service('DialogService', DialogService)
    .controller('ChallengeController', ChallengeController)
    .controller('DialogController', DialogController)
    .factory('Challenge', ChallengeFactory)
    .directive('leafRating', leafRating);

ChallengeController.$inject = ['$mdDialog', 'Challenge', "DialogService"]
DialogController.$inject = ['$mdDialog', "DialogService"]
ChallengeFactory.$inject = ['$resource']

var apiUrl = "http://95.85.59.29:1337/api/"

function ChallengeController($mdDialog, Challenge, DialogService) {
    var vmChallenge = this;

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

        vmChallenge.tasks = completedTasks;

        vmChallenge.dueDate = currentTask.dueDate;
        vmChallenge.completed = currentTask.completed;
        vmChallenge.challenge = currentTask.challenge;
        DialogService.setChallenge(currentTask.challenge)
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

    vmChallenge.daysLeft = dDiff(Date.now());

}

function dDiff(dueDate) {
    var magicNumber = (1000 * 60 * 60 * 24);
    var dayDiff = Math.floor((dueDate - Date.now()) / magicNumber);
    if (angular.isNumber(dayDiff)) {
        return dayDiff + 1;
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

var sortTasksByDateDesc = function (task1, task2) {
    return new Date(task2.dueDate) - new Date(task1.dueDate);
};

//Factory
function ChallengeFactory($resource){
    return $resource(apiUrl + "users/562f3f87b0b8dc041bcc6ba7/tasks", {}, {
        query: {method: 'GET', isArray: true}
    });
}

//Service
function DialogService () {
    var challenge;

    return {
        getChallenge: function () {
            return challenge;
        },
        setChallenge: function(value) {
            challenge = value;
        }
    };
}

//Directive
function leafRating() {
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
