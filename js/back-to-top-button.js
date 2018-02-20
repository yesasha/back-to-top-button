(function () {
  var scroll;
  var scrollTime;
  var startTime;

  window.addEventListener('click', function (event) {
    if (startTime) {
      return;
    }
    // Scan for parent "button" element since it can contain other child elements, like svg in our case
    var target = event.target;
    do {
      scrollTime = target.getAttribute('data-back-to-top-button-time');
      if (isNumeric(scrollTime)) {
        scroll = window.pageYOffset;
        requestAnimationFrame(scroller);
        break;
      }
    } while (target !== this && (target = target.parentElement)) // Don't scan higher than element to which the listener is assigned and not higher than <html>
  }, false);

  function scroller (timestamp) {
    startTime || (startTime = timestamp);
    timestamp = (timestamp - startTime) / +scrollTime; // Convert to time fraction

    if (!window.pageYOffset || timestamp >= 1) {
      window.scrollTo(0, 0);
      startTime = 0;
      return;
    }

    window.scrollTo(0, scroll * (1 - ease(timestamp)));
    requestAnimationFrame(scroller);
  }
  function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  function ease (k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
  }
})();
