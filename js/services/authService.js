// public/js/services/authService.js
angular
    .module('EvaWeb')
    .factory('auth', auth);

auth.$inject = ['$http', '$window', '$state'];

function auth($http, $window, $state) {
    var auth = {};
    //var apiUrl = "http://95.85.59.29:1337/api/";
    var apiUrl = "http://127.0.0.1:1337/api/";

    auth.saveToken = function (token) {
        $window.localStorage['eva-web-app-web-token'] = token;
    };

    auth.getToken = function () {
        return $window.localStorage['eva-web-app-web-token'];
    };

    auth.isLoggedIn = function () {
        var token = auth.getToken();

        if (token) {
            //var payload = JSON.parse($window.atob(token.split('.')[1]));
            //console.log(payload);
            //console.log(payload.exp > Date.now() / 1000);
            //return payload.expiresIn > Date.now() / 1000;
            return token !== undefined;
        } else {
            return false;
        }
    };

    auth.currentUser = function () {
        if (auth.isLoggedIn()) {
            var token = auth.getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload;
        }
    };

    auth.getCurrentUserID = function (){
        console.log('getUID');
        if (auth.isLoggedIn()) {
            console.log('logged in for uid');
            var token = auth.getToken();

            console.log(token);

            var payload = JSON.parse($window.atob(token.split('.')[1]));

            console.log(payload);

            console.log(payload._id);

            return payload._id;
        }
    };

    auth.register = function (user) {
        return $http.post(apiUrl + 'register', user).success(function (data) {
            auth.saveToken(data.token);
            $state.go('/ChooseChallenge');
        });
    };

    auth.logIn = function (user) {
        return $http.post(apiUrl + 'authenticate', user).success(function (data) {
            auth.saveToken(data.token);
        });
    };

    auth.logOut = function () {
        $window.localStorage.removeItem('eva-web-app-web-token');
    };

    return auth;
}