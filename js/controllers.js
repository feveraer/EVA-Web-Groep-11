var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('challengeDetailCtrl', ['$scope', 'Challenge', function ($scope, Challenge) {
    var tasks = Challenge.query();
    $scope.tasks = tasks;


    //$scope.firstTask = tasks[0];

    console.log(tasks);

    $scope.daysLeft = function (date) {

    }
}]);
