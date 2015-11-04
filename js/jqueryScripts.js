$(document).ready(function () {
    $('#fullpage').fullpage({
        autoScrolling: false,
        fitToSection: false,
        //normalScrollElements: '.elem1, .elem2'
        //controlArrows: true


        //afterLoad: function(index){
        //    if(index == 2){
        //        alert('laden nummer 3')
        //
        //    }
        //}

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

//var theToggle = document.getElementById('toggle');
//
//// based on Todd Motto functions
//// http://toddmotto.com/labs/reusable-js/
//
//// hasClass
//function hasClass(elem, className) {
//    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
//}
//// addClass
//function addClass(elem, className) {
//    if (!hasClass(elem, className)) {
//        elem.className += ' ' + className;
//    }
//}
//// removeClass
//function removeClass(elem, className) {
//    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
//    if (hasClass(elem, className)) {
//        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
//            newClass = newClass.replace(' ' + className + ' ', ' ');
//        }
//        elem.className = newClass.replace(/^\s+|\s+$/g, '');
//    }
//}
//// toggleClass
//function toggleClass(elem, className) {
//    var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
//    if (hasClass(elem, className)) {
//        while (newClass.indexOf(" " + className + " ") >= 0 ) {
//            newClass = newClass.replace( " " + className + " " , " " );
//        }
//        elem.className = newClass.replace(/^\s+|\s+$/g, '');
//    } else {
//        elem.className += ' ' + className;
//    }
//}
//
//theToggle.onclick = function() {
//    toggleClass(this, 'on');
//    return false;
//}