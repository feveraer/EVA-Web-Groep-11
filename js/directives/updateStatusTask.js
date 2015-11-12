/**
 * evaweb
 * @namespace evaweb.js.directives.updateStatusTask
 * */

/**
 * @name Directive: increaseStatusTask
 * @desc This directive increases the status of a given task
 * it also pushes this updated task to the REST API
 * @@memberOf eva_web.js
 */
function increaseStatusTask(ApiCallService, $location) {
    return {
        restrict: 'A',
        scope: {
            taskId: '@',
            taskStatus: '@'
        },
        link: function (scope, elem, attr) {
            attr.$observe('taskId', function (taskId) {
                scope.taskId = taskId;
            });
            attr.$observe('taskStatus', function (taskStatus) {
                scope.taskStatus = taskStatus;
            });

            elem.bind('click', function () {
                var data = {"status": scope.taskStatus + 1};
                if (scope.taskStatus === "0") {
                    ApiCallService.updateChoosenChallenge(scope.taskId, data).then(function () {
                        $location.url('/home')
                    });
                }
                if (scope.taskStatus === "1") {
                    ApiCallService.updateChoosenChallenge(scope.taskId, data).then(function () {
                        $location.url('/challengeCompleted')
                    });
                }
            })

        }
    }
}