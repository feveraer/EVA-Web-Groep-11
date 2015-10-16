
var app = angular.module('EvaWebApp',['ui.router', 'ngRoute', 'challengeControllers', 'challengeServices']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: './views/home.html',
                controller: 'challengeDetailCtrl'
            });

        $urlRouterProvider.otherwise('/home');
    }
]);

//app.filter('dateDiff', function () {
//    var magicNumber = (1000 * 60 * 60 * 24);
//
//    return function (toDate, fromDate) {
//        if(toDate && fromDate){
//            var dayDiff = Math.floor((toDate - fromDate) / magicNumber);
//            if (angular.isNumber(dayDiff)){
//                return dayDiff + 1;
//            }
//        }
//    };
//});



