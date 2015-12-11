/**
 * eva_web.js
 * @namespace eva_web.js.outils
 */

/**
 * @name giveTextBeforeDoubleWhitespace
 * @desc Returns first substring before double spaces
 * @param s: string to split on double spaces
 * @memberOf eva_web.js.outils
 */
function giveTextBeforeDoubleWhitespace(s) {
    var array = s.split("  ");
    return array[0];
}

/**
 * @name calculateDaysBusy
 * @desc Calculate the days between the actual date and the date of the challenge
 * @param date The date of the current challenge
 * @returns {number} Number of days
 * @memberOf eva_web.js
 */
function calculateDaysBusy(date) {
    var milisecondsInADay = (1000 * 60 * 60 * 24);
    var dayDiff = Math.floor((Date.now() - new Date(date)) / milisecondsInADay);
    console.log(new Date(date));
    console.log(new Date(Date.now()));
    if (angular.isNumber(dayDiff)) {
        return dayDiff + 1;
    }
}

/**
 * @name Function sortTasksByDateDesc
 * @desc Sorts the challenges by date in descending order.
 * @param task1
 * @param task2
 * @returns {number}
 * @memberOf eva_web.js
 */
var sortTasksByDateDesc = function (task1, task2) {
    return new Date(task2.dueDate) - new Date(task1.dueDate);
};

/**
 * @name loadGlyphicon
 * @desc Sets The glyphicon per category
 * @param name The name of category
 * @example <img ng-src="img/veggi{{task.challenge.category.name}}.jpg" class="timeLineImage">
 * @returns {String}
 * @memberOf eva_web.js
 */
function loadGlyphicon(name) {
    switch (name) {
        case 'dinner':
            return 'glyphicon-glass';
        case 'breakfast':
            return 'glyphicon-grain';
        case 'lunch':
            return 'glyphicon-leaf';
        case 'social':
            return 'glyphicon-heart';
        case 'restaurant':
            return 'glyphicon-cutlery';
        case 'snack':
            return 'glyphicon-apple';
        default:
            return 'glyphicon-heart';
    }
}