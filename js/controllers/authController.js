// public/js/controllers/AuthController.js
angular
    .module('EvaWeb')
    .controller('authController', authController);

function authController($location, auth) {
    var vmAuth = this;
    vmAuth.user = {};
    vmAuth.isLoggedIn = auth.isLoggedIn;
    vmAuth.logOut = auth.logOut;

    vmAuth.register = function () {
        auth.register(vmAuth.user)
            .error(function (error) {
                vmAuth.error = error;
            }).success(function () {
                $location.url('/ChooseChallenge');
            });
    };

    vmAuth.logIn = function () {
        auth.logIn(vmAuth.user)
            .error(function (error) {
                vmAuth.error = error;
            }).success(function () {
                $location.url('/ChooseChallenge');
            });
    };
}