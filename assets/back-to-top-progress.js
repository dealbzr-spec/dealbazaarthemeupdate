document.addEventListener('DOMContentLoaded', () => {
  var progressPath = document.querySelector('.button__back-to-top .progress-circle path');
  if (!progressPath) return;
  var pathLength = progressPath.getTotalLength();

  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';

  var lastProgress = null;
  var cachedHeight = null;

  function getScrollY() {
    return window.scrollY || window.pageYOffset;
  }

  function getDocumentHeight() {
    if (cachedHeight === null) {
      cachedHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (cachedHeight <= 0) cachedHeight = 1;
    }
    return cachedHeight;
  }

  function updateProgress() {
    var scroll = getScrollY();
    var height = getDocumentHeight();
    var progress = pathLength - (scroll * pathLength) / height;
    if (lastProgress !== progress) {
      progressPath.style.strokeDashoffset = progress;
      lastProgress = progress;
    }
  }

  function invalidateHeight() {
    cachedHeight = null;
    updateProgress();
  }

  window.addEventListener('resize', theme.utils.rafThrottle(invalidateHeight));

  var isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      isScrolling = true;
      window.requestAnimationFrame(() => {
        updateProgress();
        isScrolling = false;
      });
    }
  }, { passive: true });

  updateProgress();
});