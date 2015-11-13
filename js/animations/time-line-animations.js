/**
 * @name animateIconIn
 * @desc Animates the icon on the timeline. When visible, the icon bounces in animated. The animation binds on the 'when-visible' attribute. Use the animate.css and angular-scroll-animate framework.
 * @param $el Element in the DOM.
 * @example <timeline-badge class="hidden {{task.challenge.category.name}}" when-visible="vmChallenge.animateIcon">
 <i class="glyphicon {{vmChallenge.loadGlyphicon(task.challenge.category.name)}}"></i>
 </timeline-badge>
 * @memberOf eva_web.js
 */
function animateIcon($el) {
    $el.removeClass('hidden');
    $el.addClass('animated bounceIn');
};

/**
 *@name nimatePanelLeft
 * @desc Animates the panel on the left side of the timeline. When visible, the icon bounces in animated. The animation binds on the 'when-visible' attribute. Use the animate.css and angular-scroll-animate framework.
 * @param $el Element in the DOM.
 * @example<timeline-panel ng-if="$index % 2 === 0" class="warning hidden2" when-visible="vmChallenge.animatePanelLeft">
 <timeline-heading style="width: 100%">
 <img ng-src="img/veggi{{task.challenge.category.name}}.jpg" class="timeLineImage">
 <h4>{{task.challenge.title}}</h4>
 </timeline-heading>
 <p>{{task.challenge.description}}</p>
 <md-button ng-click="vmChallenge.clickButton()">meer</md-button>
 </timeline-panel>
 * @memberOf eva_web.js
 */
function animatePanelLeft($el) {
    $el.removeClass('hidden2');
    $el.addClass('animated bounceInLeft');
};

/**
 *@name animatePanelRight
 * @desc Animates the panel on the right side of the timeline. When visible, the icon bounces in animated. The animation binds on 'when-visible' attribute. Use the animate.css and angular-scroll-animate framework.
 * @param $el Element in the DOM.
 * @example <timeline-panel ng-if="$index % 2 != 0" class="warning hidden2" when-visible="vmChallenge.animatePanelRight">
 <timeline-heading>
 <img ng-src="img/veggi{{task.challenge.category.name}}.jpg" class="timeLineImage">
 <h4>{{task.challenge.title}}</h4>
 </timeline-heading>
 <p>{{task.challenge.description}}</p>
 <md-button class="knopke">meer</md-button>
 </timeline-panel>
 * @memberOf eva_web.js
 */
function animatePanelRight($el) {
    $el.removeClass('hidden2');
    $el.addClass('animated bounceInRight');
};