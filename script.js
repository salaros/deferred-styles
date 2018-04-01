var loadingProgress = document.querySelector('.loading.progress'),
    loadingDeley = 400;

loadingProgress.className = loadingProgress.className.replace('hidden', '');

function loadDeferredStyles() {
    var head = document.head || document.getElementsByTagName('head')[0],
        stylesDeferred = document.querySelector('.deferred.styles');

    head.innerHTML += stylesDeferred.textContent;
    stylesDeferred.parentElement.removeChild(stylesDeferred);

    // Use the last <img> if any otherwise <link> as a sentinel of page readiness
    var loadingSentinel = document.querySelector('img:last-child') ||
                          document.querySelector('link:last-child');
        loadingSentinel.onload = hideLoadingScreen;
        loadingSentinel.onerror = hideLoadingScreen;
    if (!loadingSentinel || loadingSentinel.complete) {
        hideLoadingScreen();
    }
};

function hideLoadingScreen() {
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
