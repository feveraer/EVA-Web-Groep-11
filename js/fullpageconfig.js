/**
 * eva_web.js
 * @namespace eva_web.js.fullpageconfig
 */

/**
 * @name Config Fullpage
 * @desc Configures fullpage
 * @memberOf eva_web.js
 */
$(document).ready(function () {
    $('#fullpage').fullpage({
        autoScrolling: false,
        fitToSection: false,
        controlArrows: true,
        verticalCentered: true,
        resize: false,
        sectionsColor: ['#ccc', '#fff'],
        paddingTop: '3em',
        paddingBottom: '10px',
        responsiveWidth: 0,
        responsiveHeight: 0
    });
});