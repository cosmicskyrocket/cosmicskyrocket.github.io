/**
 * Search Overlay – Live Page Suggestions
 * Searches across all site pages defined in window.SEARCH_DATA (search-data.js).
 */

(function () {
  'use strict';

  // Compute root URL so search-data paths (always root-relative) resolve correctly
  // regardless of how deep the current page is in the directory tree.
  var _rootUrl = (function () {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src');
      if (src && src.indexOf('search.js') !== -1) {
        return src.replace('assets/js/search.js', '');
      }
    }
    return '';
  })();

  function buildUrl(rootRelativePath) {
    return _rootUrl + rootRelativePath;
  }

  function normalise(str) {
    return (str || '').toLowerCase().replace(/[\s_-]+/g, ' ').trim();
  }

  function score(entry, query) {
    var q = normalise(query);
    if (!q) return 0;
    var terms = q.split(' ').filter(Boolean);
    var haystack = normalise(entry.title + ' ' + entry.subtitle + ' ' + entry.section + ' ' + entry.keywords);
    var s = 0;
    for (var i = 0; i < terms.length; i++) {
      if (haystack.indexOf(terms[i]) === -1) return 0;
      if (normalise(entry.title).indexOf(terms[i]) === 0) s += 3;
      else if (normalise(entry.title).indexOf(terms[i]) !== -1) s += 2;
      else s += 1;
    }
    return s;
  }

  function search(query) {
    if (!window.SEARCH_DATA || !query.trim()) return [];
    var results = [];
    for (var i = 0; i < window.SEARCH_DATA.length; i++) {
      var s = score(window.SEARCH_DATA[i], query);
      if (s > 0) results.push({ entry: window.SEARCH_DATA[i], score: s });
    }
    results.sort(function (a, b) { return b.score - a.score; });
    return results.slice(0, 8).map(function (r) { return r.entry; });
  }

  function highlight(text, query) {
    if (!query) return escapeHtml(text);
    var terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    var result = escapeHtml(text);
    terms.forEach(function (term) {
      var re = new RegExp('(' + escapeReg(term) + ')', 'gi');
      result = result.replace(re, '<mark>$1</mark>');
    });
    return result;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeReg(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function sectionIcon(entry) {
    var base = _rootUrl + 'assets/img/svg/';
    var icon;
    if (entry.section === 'Natural Stones') {
      icon = 'stone.svg';
    } else if (entry.section === 'Tiles') {
      icon = 'tiles.svg';
    } else {
      var u = (entry.url || '').toLowerCase();
      var t = (entry.title || '').toLowerCase();
      if (u.indexOf('contact') !== -1 || t.indexOf('contact') !== -1) icon = 'contact.svg';
      else if (u.indexOf('about') !== -1 || t.indexOf('about') !== -1) icon = 'about.svg';
      else if (u.indexOf('packag') !== -1 || t.indexOf('packag') !== -1) icon = 'package.svg';
      else icon = 'stone.svg';
    }
    return '<img src="' + base + icon + '" alt="" class="search-result-svg">';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var searchBtn       = document.getElementById('searchBtn');
    var searchOverlay   = document.getElementById('searchOverlay');
    var searchInput     = document.getElementById('searchInput');
    var searchForm      = document.getElementById('searchForm');
    var searchContainer = searchOverlay ? searchOverlay.querySelector('.search-container') : null;
    var suggestionsEl   = searchOverlay ? searchOverlay.querySelector('.search-suggestions') : null;

    if (!searchOverlay || !searchInput || !searchContainer) return;

    // Inject results list right before the popular-searches block
    var resultsEl = document.createElement('div');
    resultsEl.id = 'searchResults';
    resultsEl.className = 'search-results';
    resultsEl.setAttribute('aria-live', 'polite');
    searchContainer.insertBefore(resultsEl, suggestionsEl);

    // ── Open ──────────────────────────────────────────────────────────────
    if (searchBtn) {
      searchBtn.addEventListener('click', function () {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { searchInput.focus(); }, 400);
      });
    }

    // ── Close ─────────────────────────────────────────────────────────────
    function closeOverlay() {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
      searchInput.value = '';
      showResults([], '');
    }

    searchOverlay.addEventListener('click', function (e) {
      if (!searchContainer.contains(e.target)) closeOverlay();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) closeOverlay();
    });

    // ── Render ────────────────────────────────────────────────────────────
    function showResults(matches, query) {
      var hasQuery = query.trim().length > 0;
      if (suggestionsEl) suggestionsEl.style.display = hasQuery ? 'none' : '';

      if (!hasQuery) {
        resultsEl.innerHTML = '';
        resultsEl.classList.remove('has-results');
        return;
      }

      if (matches.length === 0) {
        resultsEl.innerHTML =
          '<p class="search-no-results">No results for \u201c<strong>' + escapeHtml(query) + '</strong>\u201d</p>';
        resultsEl.classList.add('has-results');
        return;
      }

      var html = '<ul class="search-result-list">';
      matches.forEach(function (entry) {
        var url = buildUrl(entry.url);
        html += '<li class="search-result-item">' +
          '<a href="' + escapeHtml(url) + '" class="search-result-link">' +
            '<span class="search-result-icon">' + sectionIcon(entry) + '</span>' +
            '<span class="search-result-text">' +
              '<span class="search-result-title">' + highlight(entry.title, query) + '</span>' +
              '<span class="search-result-sub">' + escapeHtml(entry.subtitle) +
                (entry.subtitle ? ' \u00B7 ' : '') + escapeHtml(entry.section) +
              '</span>' +
            '</span>' +
            '<span class="search-result-arrow"><i class="bi bi-arrow-right"></i></span>' +
          '</a>' +
          '</li>';
      });
      html += '</ul>';

      resultsEl.innerHTML = html;
      resultsEl.classList.add('has-results');
    }

    // ── Live input ────────────────────────────────────────────────────────
    var debounceTimer;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var val = searchInput.value;
      debounceTimer = setTimeout(function () {
        showResults(search(val), val);
      }, 120);
    });

    // ── Submit → navigate to first result ─────────────────────────────────
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = searchInput.value.trim();
        if (!val) return;
        var matches = search(val);
        if (matches.length > 0) window.location.href = buildUrl(matches[0].url);
      });
    }

    // ── Popular tag clicks → fill input and search ─────────────────────────
    var tags = searchOverlay.querySelectorAll('.search-tag');
    tags.forEach(function (tag) {
      tag.addEventListener('click', function (e) {
        e.preventDefault();
        searchInput.value = tag.textContent.trim();
        showResults(search(searchInput.value), searchInput.value);
        searchInput.focus();
      });
    });
  });
})();
