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
// ==========================================
// MOBILE MENU
// ==========================================

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ==========================================
// SCROLL REVEAL
// ==========================================

function initReveal() {
  const targets = document.querySelectorAll('#page-' + currentPage + ' .feature-card, #page-' + currentPage + ' .service-card, #page-' + currentPage + ' .mv-card, #page-' + currentPage + ' .sustain-card, #page-' + currentPage + ' .product-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i * 60) + 'ms';
    observer.observe(el);
  });
}
// ==========================================
// NAVBAR SHADOW ON SCROLL
// ==========================================

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 8
    ? '0 4px 24px rgba(0,0,0,0.12)'
    : '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)';
});

// ==========================================
// STATS COUNTER ANIMATION (About page)
// ==========================================

let statsAnimated = false;

function initStatsAnimation() {
  statsAnimated = false;
  const statNumbers = document.querySelectorAll('#page-about .stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateStats(statNumbers);
      observer.disconnect();
    }
  }, { threshold: 0.5 });

  const bar = document.querySelector('#page-about .stats-bar');
  if (bar) observer.observe(bar);
}

function animateStats(elements) {
  const data = [
    { target: 500, suffix: '+' },
    { target: 25, suffix: '+' },
    { target: 98, suffix: '%' },
    { target: 10, suffix: '+' },
  ];

  elements.forEach((el, i) => {
    const { target, suffix } = data[i] || { target: 0, suffix: '' };
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// ==========================================
// MARKETPLACE - PRODUCT DATA
// ==========================================

const PRODUCTS = [
  {
    id: 1,
    name: 'Organic Fertiliser',
    category: 'fertiliser',
    price: 2500,
    rating: 4.5,
    reviews: 128,
    desc: 'Premium organic compost blend for all crop types.',
    badge: 'Best Seller',
    icon: '🌱',
    image: 'assets/images/product-fertilizer.png'
  },
  {
    id: 2,
    name: 'Hybrid Seeds Pack',
    category: 'seeds',
    price: 1200,
    rating: 4.3,
    reviews: 87,
    desc: 'High-yield hybrid vegetable seeds — assorted varieties.',
    badge: null,
    icon: '🌾',
    image: 'assets/images/product-seeds.png'
  },
  {
    id: 3,
    name: 'Irrigation Kit',
    category: 'equipment',
    price: 15000,
    rating: 4.7,
    reviews: 54,
    desc: 'Complete drip irrigation system for up to 1 acre.',
    badge: 'Popular',
    icon: '💧',
    image: 'assets/images/product-irrigation.png'
  },
  {
    id: 4,
    name: 'Pesticide Spray',
    category: 'pesticide',
    price: 3800,
    rating: 4.1,
    reviews: 62,
    desc: 'Broad-spectrum organic pesticide, safe for produce.',
    badge: null,
    icon: '🔬',
    image: 'assets/images/product-pesticide.png'
  },
  {
    id: 5,
    name: 'Soil Test Kit',
    category: 'tools',
    price: 1800,
    rating: 4.4,
    reviews: 41,
    desc: 'Test pH, nitrogen, phosphorus and potassium levels.',
    badge: 'New',
    icon: '🧪',
    image: 'assets/images/product-soilkit.png'
  },
  {
    id: 6,
    name: 'NPK Compound Fertiliser',
    category: 'fertiliser',
    price: 4200,
    rating: 4.6,
    reviews: 95,
    desc: 'Balanced NPK formula for maximum crop productivity.',
    badge: null,
    icon: '⚗️',
    image: 'assets/images/product-npk.png'
  },
  {
    id: 7,
    name: 'Paddy Seeds (Super 300)',
    category: 'seeds',
    price: 950,
    rating: 4.8,
    reviews: 210,
    desc: 'Certified high-yield paddy variety, drought-resistant.',
    badge: 'Top Rated',
    icon: '🌾',
    image: 'assets/images/product-paddy.png'
  },
  {
    id: 8,
    name: 'Hand Sprayer Pump',
    category: 'equipment',
    price: 2800,
    rating: 3.9,
    reviews: 33,
    desc: '16L capacity stainless steel hand pump sprayer.',
    badge: null,
    icon: '🚿',
    image: 'assets/images/product-sprayer.jpg'
  },
  {
    id: 9,
    name: 'Weed Control Herbicide',
    category: 'pesticide',
    price: 2200,
    rating: 4.2,
    reviews: 78,
    desc: 'Selective herbicide for paddy and vegetable fields.',
    badge: null,
    icon: '🌿',
    image: 'assets/images/product-herbicide.jpg'
  },
];

let cartCount = 0;

// Icon colours per category
const ICON_COLORS = {
  fertiliser: '#86efac',
  seeds: '#fde68a',
  equipment: '#bfdbfe',
  pesticide: '#fca5a5',
  tools: '#c4b5fd',
};

function getStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');
  if (!grid) return;

  const query = (document.getElementById('productSearch')?.value || '').toLowerCase();

  // Category filter
  const checkedCats = [...document.querySelectorAll('.filters-sidebar input[type="checkbox"]:checked')]
    .map(cb => cb.value);

  // Price filter
  const priceVal = document.querySelector('input[name="priceRange"]:checked')?.value || 'all';
  let priceMin = 0, priceMax = Infinity;
  if (priceVal !== 'all') {
    [priceMin, priceMax] = priceVal.split('-').map(Number);
  }

  // Rating filter
  const ratingRaw = document.querySelector('input[name="ratingFilter"]:checked')?.value || 'all';
  const ratingMin = ratingRaw === 'all' ? 0 : parseFloat(ratingRaw);

  // Sort
  const sortVal = document.querySelector('.sort-select')?.value || 'default';

  let filtered = PRODUCTS.filter(p => {
    const matchCat = checkedCats.includes(p.category);
    const matchPrice = p.price >= priceMin && p.price <= priceMax;
    const matchRating = ratingMin === 0 || p.rating >= ratingMin;
    const matchQuery = !query || p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchCat && matchPrice && matchRating && matchQuery;
  });

  if (sortVal === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortVal === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortVal === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'flex';
    grid.style.display = 'none';
  } else {
    noResults.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = filtered.map(p => `
      <div class="product-card reveal">
        <div class="product-image" style="background:${ICON_COLORS[p.category] || '#f0fdf4'}20;">
          ${p.image
            ? `<img src="${p.image}" alt="${p.name}" class="product-img" />`
            : `<div style="font-size:56px;line-height:1;">${p.icon}</div>`
          }
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        </div>
        <div class="product-body">
          <p class="product-category">${p.category}</p>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-rating">
            <span class="stars">${getStars(p.rating)}</span>
            <span>${p.rating} (${p.reviews})</span>
          </div>
          <div class="product-footer">
            <div>
              <div class="product-price">LKR ${p.price.toLocaleString()}</div>
            </div>
            <button class="btn-add-cart" onclick="addToCart('${p.name}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              Add
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Trigger reveal on new cards
    setTimeout(() => {
      grid.querySelectorAll('.product-card.reveal').forEach((el, i) => {
        el.style.transitionDelay = (i * 40) + 'ms';
        setTimeout(() => el.classList.add('visible'), 20);
      });
    }, 10);
  }
}

function filterProducts() { renderProducts(); }

function sortProducts(val) { renderProducts(); }

function resetFilters() {
  document.querySelectorAll('.filters-sidebar input[type="checkbox"]').forEach(cb => cb.checked = true);
  const allPrice = document.querySelector('input[name="priceRange"][value="all"]');
  if (allPrice) allPrice.checked = true;
  const allRating = document.querySelector('input[name="ratingFilter"][value="all"]');
  if (allRating) allRating.checked = true;
  const searchInput = document.getElementById('productSearch');
  if (searchInput) searchInput.value = '';
  renderProducts();
}

function addToCart(name) {
  cartCount++;
  const toast = document.getElementById('cartToast');
  const msg = document.getElementById('cartToastMsg');
  if (toast && msg) {
    msg.textContent = `"${name}" added to cart!`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
}

// ==========================================
// CONTACT FORM
// ==========================================

function handleSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn = form.querySelector('button[type="submit"]');

  const origHTML = btn.innerHTML;
  btn.innerHTML = '<span style="opacity:0.7">Sending...</span>';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.style.display = 'block';
  }, 1200);
}

function resetContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form) {
    form.reset();
    form.style.display = 'flex';
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = false;
  }
  if (success) success.style.display = 'none';
}

// ==========================================
// INIT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
