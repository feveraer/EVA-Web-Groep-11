// public/js/controllers/AuthController.js
angular
    .module('EvaWeb')
    .controller('authController', authController);

function authController($scope, $location, auth) {
    $scope.user = {};
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.logOut = auth.logOut;

    $scope.register = function () {
        auth.register($scope.user).error(function (error) {
            $scope.error = error;
        }).then(function () {
            $location.url('/ChooseChallenge');
        });
    };

    $scope.logIn = function () {
        auth.logIn($scope.user).error(function (error) {
            $scope.error = error;
        }).then(function () {
            $location.url('/ChooseChallenge');
        });
    };
}