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