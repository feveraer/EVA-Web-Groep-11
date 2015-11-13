/**
 *
 * @name Controller: DialogController
 * @param $mdDialog Service opens a dialog over the app to inform users about critical information or require them to make decisions. Part of Angular Material.
 * @param DialogService Service used to trigger the dialogbox. Part of Angular Material.
 * @constructor
 */
function DialogController($mdDialog, DialogService) {
    var vmDialog = this;

    vmDialog.mdDialogData = DialogService.getChallenge();


    vmDialog.hide = function () {
        $mdDialog.hide();
    };

    vmDialog.cancel = function () {
        $mdDialog.cancel();
    };

    vmDialog.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}
