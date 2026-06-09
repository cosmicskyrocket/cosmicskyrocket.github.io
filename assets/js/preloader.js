/**
 * Preloader Functionality
 */

window.addEventListener('load', function() {
  setTimeout(function() {
    // Fade out and hide preloader
    var preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.3s ease';
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 300);
    }
  }, 800);
});
