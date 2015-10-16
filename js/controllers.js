
var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('challengeDetailCtrl', ['$scope', 'Challenge', function($scope, Challenge) {
    var challenges = Challenge.query();
    $scope.task = challenges;

    console.log(challenges);

}]);
