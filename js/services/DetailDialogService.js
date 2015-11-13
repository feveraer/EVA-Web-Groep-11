/**
 * @name Service: DialogService
 * @desc Service used to trigger the dialogbox. Part of Angular Material.
 * @returns {{getChallenge: Function, setChallenge: Function}}
 * @constructor
 * @memberOf eva_web.js
 */
function detailDialogService() {
    var challenge;

    return {
        getChallenge: function () {
            return challenge;
        },
        setChallenge: function (value) {
            challenge = value;
        }
    };
}