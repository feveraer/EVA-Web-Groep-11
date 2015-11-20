// public/js/controllers/AuthController.js
angular
    .module('EvaWeb')
    .controller('authController',
    [
        '$scope',
        '$state',
        'auth',
        function ($scope, $location, auth) {
            $scope.user = {};

            $scope.register = function ($location) {
                auth.register($scope.user).error(function (error) {
                    $scope.error = error;
                }).then(function () {
                    $location.url('/ChooseChallenge');
                });
            };

            $scope.logIn = function ($location) {
                auth.logIn($scope.user).error(function (error) {
                    $scope.error = error;
                }).then(function () {
                    $location.url('/ChooseChallenge');
                });
            };
        }
    ]
);