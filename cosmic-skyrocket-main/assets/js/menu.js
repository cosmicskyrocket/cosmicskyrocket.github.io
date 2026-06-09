/**
 * Hamburger Menu & Navigation Scripts
 */

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // HAMBURGER MENU FUNCTIONALITY
  // ============================================
  const hamburgerBtn = document.getElementById('hamburgerMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuOverlay = document.getElementById('hamburgerMenuOverlay');
  
  // Open menu
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function() {
      menuOverlay.style.display = 'block';
      setTimeout(function() {
        menuOverlay.classList.add('active');
      }, 10);
    });
  }
  
  // Close menu
  function closeMenu() {
    menuOverlay.classList.remove('active');
    setTimeout(function() {
      menuOverlay.style.display = 'none';
    }, 300);
  }
  
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }
  
  // Close menu when clicking overlay
  if (menuOverlay) {
    menuOverlay.addEventListener('click', function(e) {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });
  }
  
  // Dropdown Toggle
  const dropdownToggles = document.querySelectorAll('.menu-dropdown-toggle, .submenu-dropdown-toggle');
  
  dropdownToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const parentItem = this.parentElement;
      const wasActive = parentItem.classList.contains('active');
      
      // Close all sibling dropdowns
      const siblings = Array.from(parentItem.parentElement.children);
      siblings.forEach(function(sibling) {
        if (sibling !== parentItem) {
          sibling.classList.remove('active');
        }
      });
      
      // Toggle current dropdown
      if (wasActive) {
        parentItem.classList.remove('active');
      } else {
        parentItem.classList.add('active');
      }
    });
  });
  
  // Close menu on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menuOverlay && menuOverlay.classList.contains('active')) {
      closeMenu();
    }
  });
});
