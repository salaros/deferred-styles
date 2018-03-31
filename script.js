function loadDeferredStyles() {
    var head = document.head || document.getElementsByTagName('head')[0],
        stylesDeferred = document.querySelector('.deferred.styles');

    head.innerHTML += stylesDeferred.textContent;
    stylesDeferred.parentElement.removeChild(stylesDeferred);

    var lastStyleSentinel = document.querySelector('link:last-child');
    lastStyleSentinel.onload = revealRealContent;
    lastStyleSentinel.onerror = revealRealContent;
};

function revealRealContent() {
    var visibleDelay = 250,
        loadingProgress = document.querySelector('.loading.progress');
    window.setTimeout(function() {
        loadingProgress.style.display = 'none';
    }, visibleDelay);
}

var reqAniFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (reqAniFrame)
    reqAniFrame(loadDeferredStyles);
else
    window.addEventListener('load', loadDeferredStyles);
