var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('challengeDetailCtrl', ['$scope', 'Challenge', function ($scope, Challenge) {
    var tasks = Challenge.query();
    $scope.task = tasks;


    $scope.firstTask = task[0];

    console.log(challenges);

    $scope.daysLeft = function (date) {

    }
}]);
