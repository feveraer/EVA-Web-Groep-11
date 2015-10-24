var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('challengeDetailCtrl', ['$scope', 'Challenge', '$mdDialog', function ($scope, Challenge, $mdDialog) {


    Challenge.query().$promise.then(function(data){

        var tasks = data;
        $scope.ratings = [{
            current: tasks[1].challenge.difficulty,
            max: 3
        }];

        $scope.tasks = tasks;
        $scope.dueDate = tasks[1].dueDate;
        $scope.completed = tasks[1].completed;
        $scope.challenge = tasks[1].challenge;
        console.log(tasks);
    });



    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './views/challengeDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals:{
                data: $scope.challenge
            }
        });

    };

    //$scope.daysLeft = dDiff($scope.dueDate);
    //
    $scope.daysLeft = dDiff(Date.now());

}]);

function dDiff(dueDate) {
    var magicNumber = (1000 * 60 * 60 * 24);
    var dayDiff = Math.floor((dueDate - Date.now()) / magicNumber);
    if (angular.isNumber(dayDiff)) {
        return dayDiff + 1;
    }
}

function DialogController($scope, $mdDialog, data) {
    $scope.mdDialogData = data;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}