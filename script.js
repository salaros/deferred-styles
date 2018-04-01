var loadingProgress = document.querySelector('.loading.progress'),
    loadingDeley = 250;

loadingProgress.className = loadingProgress.className.replace('hidden', '');

function loadDeferredStyles() {
    var head = document.head || document.getElementsByTagName('head')[0],
        stylesDeferred = document.querySelector('.deferred.styles');

    head.innerHTML += stylesDeferred.textContent;
    stylesDeferred.parentElement.removeChild(stylesDeferred);

    var lastStyleSentinel = document.querySelector('link:last-child');
    if (lastStyleSentinel) {
        lastStyleSentinel.onload = revealRealContent;
        lastStyleSentinel.onerror = revealRealContent;
        return;
    }

    revealRealContent();
};

function revealRealContent() {
    window.setTimeout(function() {
        loadingProgress.className += ' hidden';
    }, loadingDeley);
}

var reqAniFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (reqAniFrame)
    reqAniFrame(loadDeferredStyles);
else
    window.addEventListener('load', loadDeferredStyles);
