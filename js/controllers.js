var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('challengeDetailCtrl', ['$scope', 'Challenge', function ($scope, Challenge) {


    Challenge.query().$promise.then(function(data){

        var tasks = data;
        $scope.ratings = [{
            current: 2,
            max:3
        }];

        $scope.tasks = tasks;
        $scope.dueDate = tasks[1].dueDate;
        $scope.completed = tasks[1].completed;
        $scope.challenge = tasks[1].challenge;

        //init challange variables
        var challenge = tasks[1].challenge;
        $scope.title = challenge.title;
        $scope.description = challenge.description;
        $scope.difficulty = challenge.difficulty;

        //$scope.ratings[0].max = challenge.difficulty;
    });

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
