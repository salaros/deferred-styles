function loadDeferredStyles() {
    var head = document.head || document.getElementsByTagName('head')[0],
        stylesDeferred = document.querySelector('.deferred.styles');
    head.innerHTML += stylesDeferred.textContent;
    stylesDeferred.parentElement.removeChild(stylesDeferred);
};

function revealRealContent() {
    var loadingProgress = document.querySelector('.loading.progress');
    loadingProgress.style.display = 'none';
}

var reqAniFrame =
    window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (reqAniFrame)
    reqAniFrame(loadDeferredStyles);
else
    window.addEventListener('load', loadDeferredStyles);

window.setTimeout(revealRealContent, 1000);
