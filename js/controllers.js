var challengeControllers = angular.module('challengeControllers', []);

challengeControllers.controller('challengeDetailCtrl', ['$scope', 'Challenge', '$mdDialog', function ($scope, Challenge, $mdDialog) {


    Challenge.query().$promise.then(function (data) {

        var tasks = data;
        var currentTask = tasks[3];
        var completedTasks = [];

        $scope.ratings = [{
            current: currentTask.challenge.difficulty,
            max: 3
        }];

        //If testing use dummyTasks instead of tasks
        tasks.forEach(function (task) {
            if (task.completed) {
                completedTasks.push(task)
            }
        });

        completedTasks.sort(sortTasksByDateDesc);

        $scope.tasks = completedTasks;

        $scope.dueDate = currentTask.dueDate;
        $scope.completed = currentTask.completed;
        $scope.challenge = currentTask.challenge;
    });


    $scope.showAdvanced = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: './views/challengeDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                data: $scope.challenge
            }
        });
    };

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

function DialogController($scope, $mdDialog, data) {
    $scope.mdDialogData = data;

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

var sortTasksByDateDesc = function(object1, object2){
    return new Date(object2.dueDate)-new Date(object1.dueDate);
};

// Test data remove after testing

var dummyTasks = [
    {
        "dueDate": "2015-10-13T13:18:49.002Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a32",
            "title": "Uitdaging #28",
            "description": "Uitleg voor uitdaging #28",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a4a",
        "completed": true
    },
    {
        "dueDate": "2015-10-14T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1c",
            "title": "Uitdaging #6",
            "description": "Uitleg voor uitdaging #6",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a49",
        "completed": true
    },
    {
        "dueDate": "2015-10-15T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a2f",
            "title": "Uitdaging #25",
            "description": "Uitleg voor uitdaging #25",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a48",
        "completed": false
    },
    {
        "dueDate": "2015-10-16T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a27",
            "title": "Uitdaging #17",
            "description": "Uitleg voor uitdaging #17",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a47",
        "completed": false
    },
    {
        "dueDate": "2015-10-17T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1c",
            "title": "Uitdaging #6",
            "description": "Uitleg voor uitdaging #6",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a46",
        "completed": false
    },
    {
        "dueDate": "2015-10-18T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1d",
            "title": "Uitdaging #7",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor nisi eu eros posuere mattis. Donec cursus risus nec sollicitudin luctus. Etiam eget ligula et eros tincidunt maximus. Quisque tincidunt nisi id quam rutrum feugiat. Nulla sagittis tempor est et venenatis. Cras vitae augue vel felis mollis aliquam. Duis vulputate, tellus malesuada maximus malesuada, nisl velit pellentesque ante, eu fermentum enim augue id turpis. Aliquam odio libero, mollis a risus sed, porta rutrum arcu.\n\n Suspendisse elementum, tortor sit amet condimentum tincidunt, libero justo pellentesque erat, nec scelerisque mi metus vitae lectus. Donec ac elit tincidunt, congue leo ut, commodo orci. Sed efficitur dui vitae nibh sodales tristique. Sed lectus ipsum, rhoncus quis tristique ut, pulvinar eget ipsum. Donec id magna sed ex efficitur ornare. Duis ac sagittis velit. Sed quis pretium quam. Sed a nibh sem. Duis in ultricies sapien. Proin sagittis convallis metus eget bibendum. In at molestie odio.\n\n Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pulvinar, nibh at facilisis posuere, felis neque sodales dolor, sit amet consequat nibh enim vel odio. Nullam at quam dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac massa quis diam ultricies aliquam. Suspendisse ligula orci, iaculis nec metus vitae, faucibus mattis arcu. Fusce at erat lacinia, consectetur ligula eu, faucibus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at consequat ante. Aliquam eleifend a leo ac volutpat. Donec quis ex vel ex tincidunt rutrum scelerisque a ante. Phasellus scelerisque luctus orci, at cursus purus pulvinar at. Donec quam nunc, aliquet vitae facilisis sed, lacinia vitae risus. In vitae tellus vitae lectus lacinia luctus quis sed lacus. Etiam sit amet arcu at velit dictum venenatis.",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a45",
        "completed": false
    },
    {
        "dueDate": "2015-10-19T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a18",
            "title": "Uitdaging #2",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor nisi eu eros posuere mattis. Donec cursus risus nec sollicitudin luctus. Etiam eget ligula et eros tincidunt maximus. Quisque tincidunt nisi id quam rutrum feugiat. Nulla sagittis tempor est et venenatis. Cras vitae augue vel felis mollis aliquam. Duis vulputate, tellus malesuada maximus malesuada, nisl velit pellentesque ante, eu fermentum enim augue id turpis. Aliquam odio libero, mollis a risus sed, porta rutrum arcu.\n\n Suspendisse elementum, tortor sit amet condimentum tincidunt, libero justo pellentesque erat, nec scelerisque mi metus vitae lectus. Donec ac elit tincidunt, congue leo ut, commodo orci. Sed efficitur dui vitae nibh sodales tristique. Sed lectus ipsum, rhoncus quis tristique ut, pulvinar eget ipsum. Donec id magna sed ex efficitur ornare. Duis ac sagittis velit. Sed quis pretium quam. Sed a nibh sem. Duis in ultricies sapien. Proin sagittis convallis metus eget bibendum. In at molestie odio.\n\n Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pulvinar, nibh at facilisis posuere, felis neque sodales dolor, sit amet consequat nibh enim vel odio. Nullam at quam dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac massa quis diam ultricies aliquam. Suspendisse ligula orci, iaculis nec metus vitae, faucibus mattis arcu. Fusce at erat lacinia, consectetur ligula eu, faucibus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at consequat ante. Aliquam eleifend a leo ac volutpat. Donec quis ex vel ex tincidunt rutrum scelerisque a ante. Phasellus scelerisque luctus orci, at cursus purus pulvinar at. Donec quam nunc, aliquet vitae facilisis sed, lacinia vitae risus. In vitae tellus vitae lectus lacinia luctus quis sed lacus. Etiam sit amet arcu at velit dictum venenatis.",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a44",
        "completed": false
    },
    {
        "dueDate": "2015-10-20T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1d",
            "title": "Uitdaging #7",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor nisi eu eros posuere mattis. Donec cursus risus nec sollicitudin luctus. Etiam eget ligula et eros tincidunt maximus. Quisque tincidunt nisi id quam rutrum feugiat. Nulla sagittis tempor est et venenatis. Cras vitae augue vel felis mollis aliquam. Duis vulputate, tellus malesuada maximus malesuada, nisl velit pellentesque ante, eu fermentum enim augue id turpis. Aliquam odio libero, mollis a risus sed, porta rutrum arcu.\n\n Suspendisse elementum, tortor sit amet condimentum tincidunt, libero justo pellentesque erat, nec scelerisque mi metus vitae lectus. Donec ac elit tincidunt, congue leo ut, commodo orci. Sed efficitur dui vitae nibh sodales tristique. Sed lectus ipsum, rhoncus quis tristique ut, pulvinar eget ipsum. Donec id magna sed ex efficitur ornare. Duis ac sagittis velit. Sed quis pretium quam. Sed a nibh sem. Duis in ultricies sapien. Proin sagittis convallis metus eget bibendum. In at molestie odio.\n\n Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pulvinar, nibh at facilisis posuere, felis neque sodales dolor, sit amet consequat nibh enim vel odio. Nullam at quam dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac massa quis diam ultricies aliquam. Suspendisse ligula orci, iaculis nec metus vitae, faucibus mattis arcu. Fusce at erat lacinia, consectetur ligula eu, faucibus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at consequat ante. Aliquam eleifend a leo ac volutpat. Donec quis ex vel ex tincidunt rutrum scelerisque a ante. Phasellus scelerisque luctus orci, at cursus purus pulvinar at. Donec quam nunc, aliquet vitae facilisis sed, lacinia vitae risus. In vitae tellus vitae lectus lacinia luctus quis sed lacus. Etiam sit amet arcu at velit dictum venenatis.",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a43",
        "completed": false
    },
    {
        "dueDate": "2015-10-21T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1f",
            "title": "Uitdaging #9",
            "description": "Uitleg voor uitdaging #9",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a42",
        "completed": false
    },
    {
        "dueDate": "2015-10-22T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a22",
            "title": "Club sandwich",
            "description": "Kook de linzen gaar zoals de verpakking aangeeft.\n\nGiet na het koken de linzen in een fijne zeef en pers het overtollige water eruit. Meng dan de linzen met de knoflook, tomaten, paprika’s, cashewnoten en cayennepeper in een blender of keukenmachine. Breng op smaak met zout en peper.\n\nNeem een snee brood, beleg rijkelijk met de spread en een klein handje rucola. Leg hier een snee brood en beleg nogmaals. Voeg een eetlepel geroosterde pijnboompitten toe. Leg het laatste sneetje brood hierop en snijd diagonaal.",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a41",
        "completed": false
    },
    {
        "dueDate": "2015-10-23T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a30",
            "title": "Uitdaging #26",
            "description": "Uitleg voor uitdaging #26",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a40",
        "completed": false
    },
    {
        "dueDate": "2015-10-24T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a19",
            "title": "Uitdaging #3",
            "description": "Uitleg voor uitdaging #3",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a3f",
        "completed": false
    },
    {
        "dueDate": "2015-10-25T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a17",
            "title": "Uitdaging #1",
            "description": "Uitleg voor uitdaging #1",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a3e",
        "completed": false
    },
    {
        "dueDate": "2015-10-26T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a18",
            "title": "Uitdaging #2",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor nisi eu eros posuere mattis. Donec cursus risus nec sollicitudin luctus. Etiam eget ligula et eros tincidunt maximus. Quisque tincidunt nisi id quam rutrum feugiat. Nulla sagittis tempor est et venenatis. Cras vitae augue vel felis mollis aliquam. Duis vulputate, tellus malesuada maximus malesuada, nisl velit pellentesque ante, eu fermentum enim augue id turpis. Aliquam odio libero, mollis a risus sed, porta rutrum arcu.\n\n Suspendisse elementum, tortor sit amet condimentum tincidunt, libero justo pellentesque erat, nec scelerisque mi metus vitae lectus. Donec ac elit tincidunt, congue leo ut, commodo orci. Sed efficitur dui vitae nibh sodales tristique. Sed lectus ipsum, rhoncus quis tristique ut, pulvinar eget ipsum. Donec id magna sed ex efficitur ornare. Duis ac sagittis velit. Sed quis pretium quam. Sed a nibh sem. Duis in ultricies sapien. Proin sagittis convallis metus eget bibendum. In at molestie odio.\n\n Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pulvinar, nibh at facilisis posuere, felis neque sodales dolor, sit amet consequat nibh enim vel odio. Nullam at quam dui. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ac massa quis diam ultricies aliquam. Suspendisse ligula orci, iaculis nec metus vitae, faucibus mattis arcu. Fusce at erat lacinia, consectetur ligula eu, faucibus nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec at consequat ante. Aliquam eleifend a leo ac volutpat. Donec quis ex vel ex tincidunt rutrum scelerisque a ante. Phasellus scelerisque luctus orci, at cursus purus pulvinar at. Donec quam nunc, aliquet vitae facilisis sed, lacinia vitae risus. In vitae tellus vitae lectus lacinia luctus quis sed lacus. Etiam sit amet arcu at velit dictum venenatis.",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a3d",
        "completed": false
    },
    {
        "dueDate": "2015-10-27T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1a",
            "title": "Uitdaging #4",
            "description": "Uitleg voor uitdaging #4",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a3c",
        "completed": false
    },
    {
        "dueDate": "2015-10-28T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a17",
            "title": "Uitdaging #1",
            "description": "Uitleg voor uitdaging #1",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a3b",
        "completed": false
    },
    {
        "dueDate": "2015-10-29T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a32",
            "title": "Uitdaging #28",
            "description": "Uitleg voor uitdaging #28",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a3a",
        "completed": false
    },
    {
        "dueDate": "2015-10-30T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a19",
            "title": "Uitdaging #3",
            "description": "Uitleg voor uitdaging #3",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a39",
        "completed": false
    },
    {
        "dueDate": "2015-10-31T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a32",
            "title": "Uitdaging #28",
            "description": "Uitleg voor uitdaging #28",
            "difficulty": 2,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a38",
        "completed": false
    },
    {
        "dueDate": "2015-11-01T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a21",
            "title": "Uitdaging #11",
            "description": "Uitleg voor uitdaging #11",
            "difficulty": 1,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a37",
        "completed": false
    },
    {
        "dueDate": "2015-11-02T13:18:49.003Z",
        "challenge": {
            "_id": "56224ab86dcac34e5e596a1c",
            "title": "Uitdaging #6",
            "description": "Uitleg voor uitdaging #6",
            "difficulty": 3,
            "__v": 0
        },
        "_id": "56224ab96dcac34e5e596a36",
        "completed": false
    }
]