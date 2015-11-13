angular
    .module('EvaWeb')
    .config(translationConfig)

/**
 * @name translationConfig
 * @desc Translates (Binds translations.js to app.js)
 * @param $translateProvider
 * @memberOf evaweb.js.app
 */
function translationConfig($translateProvider) {
    $translateProvider
        .useSanitizeValueStrategy('sanitize')
        .translations('nl', translationsNL)
        .translations('en', translationsEN)
        .translations('fr', translationsFr)
        .preferredLanguage('nl')
        .fallbackLanguage('nl');
}