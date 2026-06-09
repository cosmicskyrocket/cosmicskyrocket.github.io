/**
 * Classie Polyfill for circular navigation
 */

/*!
 * classie - class helper functions
 */
(function(window) {
  'use strict';

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  var hasClass, addClass, removeClass;

  if ('classList' in document.documentElement) {
    hasClass = function(elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function(elem, c) {
      elem.classList.add(c);
    };
    removeClass = function(elem, c) {
      elem.classList.remove(c);
    };
  } else {
    hasClass = function(elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function(elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function(elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  var classie = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  if (typeof define === 'function' && define.amd) {
    define(classie);
  } else {
    window.classie = classie;
  }
})(window);

/**
 * Circular Navigation for 3D Cards
 */
(function(){
  // Tiles Card (Left)
  var tilesCard = document.getElementById('tiles-card'),
      wrapperTiles = document.getElementById('cn-wrapper-tiles');

  if (tilesCard && wrapperTiles) {
    // Open menu on hover
    tilesCard.addEventListener('mouseenter', openMenuTiles, false);
    wrapperTiles.addEventListener('mouseenter', openMenuTiles, false);
    wrapperTiles.addEventListener('mouseleave', closeMenuTiles, false);
    tilesCard.addEventListener('mouseleave', function(e) {
      // Check if mouse is moving to the wrapper
      var toElement = e.relatedTarget || e.toElement;
      if (!wrapperTiles.contains(toElement)) {
        closeMenuTiles();
      }
    }, false);

    function openMenuTiles(){
      classie.add(wrapperTiles, 'opened-nav-tiles');
    }
    
    function closeMenuTiles(){
      classie.remove(wrapperTiles, 'opened-nav-tiles');
    }
  }

  // Stones Card (Right)
  var stonesCard = document.getElementById('stones-card'),
      wrapperStones = document.getElementById('cn-wrapper-stones');

  if (stonesCard && wrapperStones) {
    // Open menu on hover
    stonesCard.addEventListener('mouseenter', openMenuStones, false);
    wrapperStones.addEventListener('mouseenter', openMenuStones, false);
    wrapperStones.addEventListener('mouseleave', closeMenuStones, false);
    stonesCard.addEventListener('mouseleave', function(e) {
      // Check if mouse is moving to the wrapper
      var toElement = e.relatedTarget || e.toElement;
      if (!wrapperStones.contains(toElement)) {
        closeMenuStones();
      }
    }, false);

    function openMenuStones(){
      classie.add(wrapperStones, 'opened-nav-stones');
    }
    
    function closeMenuStones(){
      classie.remove(wrapperStones, 'opened-nav-stones');
    }
  }
})();
