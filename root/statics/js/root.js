/**
 * Created by vqianduan on 15/5/14.
 */
//rem
(function (doc, window) {
    var docEl = doc.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = (20 * (clientWidth / 320)) > 40 ? 40 + "px" : (20 * (clientWidth / 320)) + 'px';
        },
        anime = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
            function(e){
                return setTimeout(e,16.67);
            };
    if (!doc.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// develop
var version = location.href.indexOf("?tdev") > 0 ? (1 + Math.round(Math.random() * 9999 - 1)) : '1.0';