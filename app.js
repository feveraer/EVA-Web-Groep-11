var app = angular.module('EvaWeb',['ui.router']);

app.controller('MainCtrl',[
    '$scope',
    function($scope){
        $scope.challenge = getChallenge()
        }
]);

getChallenge = function(){
    return {
        title: "Maak iets vegetarisch!",
        description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        difficulty: 1
    };
};

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './views/home.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('/home');
    }
]);
