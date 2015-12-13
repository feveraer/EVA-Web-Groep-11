/**
 * @name ApiCallService
 * @desc Provides API calls.
 * @param $http
 * @memberOf evaweb.js.app
 */

function apiCallService($http, auth) {
    //var apiUrl = "http://95.85.59.29:1337/api/";
    var apiUrl = "http://127.0.0.1:1337/api/";
    var user = auth.getCurrentUserID();
    //var user = "5643262312e2b6b0278ce4a9";

    this.getCompletedTasksForUser = function () {
        var user = auth.getCurrentUserID();
        return $http.get(apiUrl + "users/" + user + "/completedTasks");
    }

    this.getCurrentTaskUser = function () {
        var user = auth.getCurrentUserID();
        return $http.get(apiUrl + "users/" + user + "/currentTask");
    }

    this.getRegisterDateUser = function () {
        var user = auth.getCurrentUserID();
        return $http.get(apiUrl + "users/" + user + "/registeredOn");
    }

    this.getTodaysTasks = function () {
        var user = auth.getCurrentUserID();
        return $http.get(apiUrl + "users/" + user + "/todaysTasks");
    }

    this.updateChoosenChallenge = function(taskId, statusData){
        var user = auth.getCurrentUserID();
        var config = {headers: {
            'Content-Type': 'application/json',
        }};
        statusData.token = auth.getToken();
        return $http.put(apiUrl + "users/" + user + "/tasks/" + taskId, statusData, config);
    }
}