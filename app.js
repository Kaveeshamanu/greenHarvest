// ==========================================
// GREENHARVEST - Application JavaScript
// ==========================================

const PAGE_IDS = ['home', 'about', 'services', 'marketplace', 'contact'];
let currentPage = 'home';

// ==========================================
// PAGE ROUTING
// ==========================================

function showPage(pageName) {
  if (!PAGE_IDS.includes(pageName)) return;

  // Hide all pages
  PAGE_IDS.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.remove('active');
    const nav = document.getElementById('nav-' + p);
    if (nav) nav.classList.remove('active');
  });

  // Show target
  const target = document.getElementById('page-' + pageName);
  if (target) target.classList.add('active');

  const activeNav = document.getElementById('nav-' + pageName);
  if (activeNav) activeNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'instant' });
  currentPage = pageName;

  // Page-specific init
  if (pageName === 'about') initStatsAnimation();
  if (pageName === 'marketplace') renderProducts();

  // Trigger scroll reveal for new page
  setTimeout(initReveal, 50);
}