/**
 * @name Directive: leafDifficulty
 * @desc This directive displays a quantity of leafs based on the difficulty of the challenge. The maximum amount of leafs is set on 3.
 * The directive binds a template '<div class="leaf" ng-repeat="leaf in leafs" ng-class="leaf"></div>' on the div which contains 'leaf-rating'.
 * Based on http://stackoverflow.com/questions/23646395/rendering-a-star-rating-system-using-angularjs
 * @returns {{restrict: string, template: string, scope: {ratingValue: string, max: string}, link: Function}}
 * @example <span ng-repeat="rating in vmChallenge.ratings">
 *     <div leaf-rating difficulty-value="diff.current" max="diff.max"></div>
 </span>
 * @@memberOf eva_web.js
 */
function leafDifficulty() {
    var maxLeafs = 3;
    return {
        restrict: 'A',
        template: '<div class="leaf" ng-repeat="leaf in leafs" ng-class="leaf"></div>',
        scope: {
            difficultyValue: '=',
        },
        link: function (scope) {
            scope.leafs = [];
            for (var i = 0; i < maxLeafs; i++) {
                scope.leafs.push({
                    filled: i < scope.difficultyValue
                });
            }
        }
    }
}