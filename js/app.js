// ============================================
// MGOLD GT Ltd - B2B Wholesale Catalog App
// Mobile-First SPA with Quote Flow
// ============================================

import { COMPANY, CATEGORIES, PRODUCTS, PACKAGING_OPTIONS } from './data.js';

// ============================================
// STATE MANAGEMENT
// ============================================

const Store = {
  quote: JSON.parse(localStorage.getItem('mgold_quote') || '[]'),
  quotes: JSON.parse(localStorage.getItem('mgold_quotes') || '[]'),

  save() {
    localStorage.setItem('mgold_quote', JSON.stringify(this.quote));
    localStorage.setItem('mgold_quotes', JSON.stringify(this.quotes));
  },

  addToQuote(productId, packaging, quantity, notes = '') {
    const existing = this.quote.find(item => item.productId === productId && item.packaging === packaging);
    if (existing) {
      existing.quantity += parseInt(quantity);
    } else {
      this.quote.push({
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        productId,
        packaging,
        quantity: parseInt(quantity),
        notes,
        addedAt: new Date().toISOString()
      });
    }
    this.save();
    this.updateBadge();
    return true;
  },

  removeFromQuote(itemId) {
    this.quote = this.quote.filter(item => item.id !== itemId);
    this.save();
    this.updateBadge();
  },

  updateQuantity(itemId, quantity) {
    const item = this.quote.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, parseInt(quantity));
      this.save();
    }
  },

  clearQuote() {
    this.quote = [];
    this.save();
    this.updateBadge();
  },

  getQuoteItems() {
    return this.quote.map(item => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);
  },

  getQuoteCount() {
    return this.quote.reduce((sum, item) => sum + item.quantity, 0);
  },

  submitQuote(customerData) {
    const quote = {
      id: 'Q-' + Date.now().toString(36).toUpperCase(),
      customer: customerData,
      items: this.getQuoteItems(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    this.quotes.unshift(quote);
    this.save();
    this.clearQuote();
    return quote;
  },

  updateBadge() {
    const badge = document.querySelector('.quote-count');
    const count = this.getQuoteCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// ============================================
// ICONS (inline SVG)
// ============================================

const Icons = {
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  cart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  minus: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  package: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  fileText: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  oilCan: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19.072 6.056-1.284-.321a2.5 2.5 0 0 0-1.868.173l-1.46.73a2.5 2.5 0 0 1-1.868.173l-1.46-.73a2.5 2.5 0 0 0-1.868-.173l-1.284.321a2 2 0 0 0-1.468 1.935V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.991a2 2 0 0 0-1.468-1.935Z"/><path d="M10 13V9"/><path d="M14 13V9"/></svg>`,
  bottleWater: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 22a2.5 2.5 0 0 1 0-5h11a2.5 2.5 0 0 1 0 5z"/><path d="M12 2v5"/><path d="M7 7h10v10H7z"/><path d="M9 2h6"/></svg>`,
  boxesStacked: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  shoppingBag: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  arrowUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  externalLink: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
};

// ============================================
// IMAGE FALLBACK HELPER
// ============================================

function imgOnError(name) {
  return `onerror="this.onerror=null;this.style.display='none';this.parentElement.setAttribute('data-name','${name.replace(/'/g, "\'")}');this.parentElement.classList.add('img-error');"`;
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container') || (() => {
    const el = document.createElement('div');
    el.className = 'toast-container';
    document.body.appendChild(el);
    return el;
  })();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? Icons.check : type === 'error' ? Icons.alertCircle : Icons.info}${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============================================
// ROUTER
// ============================================

const Router = {
  routes: {
    '/': 'home',
    '/products': 'products',
    '/category/:slug': 'category',
    '/product/:id': 'product',
    '/quote-basket': 'quoteBasket',
    '/request-quote': 'requestQuote',
    '/success': 'success',
    '/admin': 'admin',
  },

  init() {
    window.addEventListener('hashchange', () => this.handle());
    window.addEventListener('popstate', () => this.handle());
    this.handle();
  },

  handle() {
    const hash = window.location.hash.replace('#', '') || '/';
    const path = hash.split('?')[0];

    for (const [route, page] of Object.entries(this.routes)) {
      const match = this.match(path, route);
      if (match) {
        this.render(page, match);
        window.scrollTo(0, 0);
        this.updateNav(path);
        return;
      }
    }

    this.render('home');
  },

  match(path, route) {
    const pathParts = path.split('/').filter(Boolean);
    const routeParts = route.split('/').filter(Boolean);

    if (pathParts.length !== routeParts.length) return null;

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = pathParts[i];
      } else if (routeParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  },

  navigate(path) {
    window.location.hash = path;
  },

  render(page, params = {}) {
    const main = document.getElementById('main-content');
    main.innerHTML = '';

    switch (page) {
      case 'home': renderHome(main); break;
      case 'products': renderProducts(main); break;
      case 'category': renderCategory(main, params.slug); break;
      case 'product': renderProductDetail(main, params.id); break;
      case 'quoteBasket': renderQuoteBasket(main); break;
      case 'requestQuote': renderRequestQuote(main); break;
      case 'success': renderSuccess(main); break;
      case 'admin': renderAdmin(main); break;
    }

    // Close mobile menu
    document.querySelector('.mobile-menu')?.classList.remove('open');
  },

  updateNav(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.path === path);
    });
  }
};

// ============================================
// PAGE COMPONENTS
// ============================================

function renderHome(container) {
  container.innerHTML = `
<div class="hero">
  <div class="hero-pattern"></div>
  <div class="container hero-content">
    <div class="hero-badge"><span class="dot"></span> Trusted UK Wholesale Supplier</div>
    <h1>Premium Wholesale Food & Beverages for UK Businesses</h1>
    <p>MGOLD GT Ltd supplies restaurants, supermarkets, cash & carry outlets and corporate clients with quality edible oils, dairy, beverages and dry goods - sourced worldwide, delivered across the UK.</p>
    <div class="hero-actions">
      <a href="#/products" class="btn btn-primary">Browse Products ${Icons.arrowRight}</a>
      <a href="#/quote-basket" class="btn btn-outline">View Quote Basket</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="hero-stat-value">14+</div><div class="hero-stat-label">Products</div></div>
      <div class="hero-stat"><div class="hero-stat-value">3</div><div class="hero-stat-label">Categories</div></div>
      <div class="hero-stat"><div class="hero-stat-value">UK</div><div class="hero-stat-label">Wide Delivery</div></div>
    </div>
  </div>
</div>

<div class="section">
  <div class="container">
    <div class="section-header">
      <h2>Product Categories</h2>
      <p>Browse our wholesale catalogue by category</p>
    </div>
    <div class="categories-grid">
      ${CATEGORIES.map(cat => `
        <div class="category-card" onclick="Router.navigate('/category/${cat.slug}')">
          <div class="category-image" style="background-image: url('${cat.image}');">
            <div class="category-icon">${Icons[cat.icon] || Icons.package}</div>
          </div>
          <div class="category-body">
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
            <div class="category-meta">
              <span class="category-count">${cat.productCount} products</span>
              <span class="category-arrow">${Icons.arrowRight}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</div>

<div class="section" style="background: var(--bg-cool);">
  <div class="container">
    <div class="section-header">
      <h2>Why Choose MGOLD GT?</h2>
      <p>Your trusted partner for wholesale food and beverage supply</p>
    </div>
    <div class="categories-grid">
      ${[
        { title: 'Global Sourcing', desc: 'We source from reliable suppliers in Ukraine, Malaysia, Europe and worldwide to ensure competitive pricing and consistent supply.', icon: 'package' },
        { title: 'Custom Labelling', desc: 'All products available with MGOLD GT custom labelling upon request. Build your own brand with our wholesale supply.', icon: 'fileText' },
        { title: 'UK Wide Delivery', desc: 'Based in Barking, London. We deliver to restaurants, supermarkets, cash & carry and corporate clients across the UK.', icon: 'mapPin' },
        { title: 'Halal & Kosher', desc: 'Our oil products are certified Halal and Kosher, meeting the dietary requirements of diverse UK customers.', icon: 'checkCircle' },
      ].map(item => `
        <div class="feature-card">
          <div class="feature-icon">${Icons[item.icon]}</div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `).join('')}
    </div>
  </div>
</div>

<div class="section">
  <div class="container">
    <div class="section-header">
      <h2>Featured Products</h2>
      <p>Popular wholesale products from our catalogue</p>
    </div>
    <div class="products-grid">
      ${PRODUCTS.slice(0, 4).map(p => renderProductCard(p)).join('')}
    </div>
    <div class="text-center mt-3">
      <a href="#/products" class="btn btn-secondary">View All Products ${Icons.arrowRight}</a>
    </div>
  </div>
</div>

<div class="section" style="background: var(--bg-warm);">
  <div class="container">
    <div class="md-section">
      <div class="md-portrait">
        <img src="assets/images/md.jpg" alt="Riffat Zakaria" loading="lazy">
      </div>
      <h3>Riffat Zakaria</h3>
      <p class="text-gold font-medium mb-2">Managing Director</p>
      <p>He is a Managing Director of a well-known established wholesale company MGOLD GT Ltd based in London, UK. He is also a Director of MGOLD General Trading LLC which is based in Dubai-UAE. Both the companies, in their respective areas, specialise in the wholesale of Edible oil, Vegetable oil, Sunflower oil, Olive oil, Mineral water, Condensed milk, Evaporated milk, Tea, Spices, Soft drinks, Milk powder, Sugar, Salt.</p>
    </div>
  </div>
</div>
  `;
}

function renderProducts(container) {
  container.innerHTML = `
<div class="page-title-bar">
  <div class="container">
    <h1>All Products</h1>
    <p>Browse our complete wholesale product catalogue</p>
  </div>
</div>
<div class="section">
  <div class="container">
    ${CATEGORIES.map(cat => `
      <div class="mb-3">
        <h2 class="mb-2">${cat.name}</h2>
        <p class="text-muted mb-2">${cat.productCount} items</p>
        <div class="products-grid">
          ${PRODUCTS.filter(p => p.categoryId === cat.id).map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    `).join('')}
  </div>
</div>
  `;
}

function renderCategory(container, slug) {
  const category = CATEGORIES.find(c => c.slug === slug);
  if (!category) return Router.navigate('/products');

  const products = PRODUCTS.filter(p => p.categoryId === category.id);

  container.innerHTML = `
<div class="page-title-bar">
  <div class="container">
    <h1>${category.name}</h1>
    <p>${category.description}</p>
  </div>
</div>
<div class="section">
  <div class="container">
    <div class="products-grid">
      ${products.map(p => renderProductCard(p)).join('')}
    </div>
  </div>
</div>
  `;
}

function renderProductCard(product) {
  const category = CATEGORIES.find(c => c.id === product.categoryId);
  return `
    <div class="product-card" onclick="Router.navigate('/product/${product.id}')">
      <div class="product-image" data-name="${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" ${imgOnError(product.name)}>
        <div class="product-badges">
          ${product.certifications.map(c => `<span class="badge badge-gold">${c}</span>`).join('')}
          <span class="badge badge-outline">${product.origin}</span>
        </div>
      </div>
      <div class="product-body">
        <div class="product-category">${category?.name || 'Product'}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-subtitle">${product.subtitle}</p>
        <div class="product-origin">
          ${Icons.mapPin} ${product.origin}
        </div>
        <div class="product-features">
          ${product.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
        </div>
        <div class="product-footer">
          <button class="btn btn-primary btn-sm" onclick="quickAdd('${product.id}', event)">Quick Add</button>
          <a href="#/product/${product.id}" class="btn btn-ghost btn-sm">Details</a>
        </div>
      </div>
    </div>
  `;
}

function renderProductDetail(container, id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return Router.navigate('/products');

  const category = CATEGORIES.find(c => c.id === product.categoryId);

  container.innerHTML = `
<div class="product-detail">
  <div class="container">
    <div class="breadcrumbs">
      <a href="#/">Home</a>
      ${Icons.chevronRight}
      <a href="#/products">Products</a>
      ${Icons.chevronRight}
      <a href="#/category/${category?.slug}">${category?.name}</a>
      ${Icons.chevronRight}
      <span>${product.name}</span>
    </div>

    <div class="product-detail-grid">
      <div class="product-detail-image" data-name="${product.name}">
        <img src="${product.image}" alt="${product.name}" ${imgOnError(product.name)}>
      </div>

      <div class="product-detail-info">
        <div class="product-category">${category?.name}</div>
        <h1>${product.name}</h1>
        <p class="product-detail-subtitle">${product.subtitle}</p>

        <div class="product-detail-meta">
          ${product.certifications.map(c => `<span class="badge badge-gold">${c}</span>`).join('')}
          <span class="badge badge-outline">${product.origin}</span>
        </div>

        <div class="product-detail-desc">
          ${product.description.split('\n\n').map(p => `<p>${p}</p>`).join('')}
        </div>

        <div class="detail-section">
          <h4>Packaging Options</h4>
          <div class="packaging-options">
            ${product.packaging.map(pack => `<span class="pack-option">${pack}</span>`).join('')}
          </div>
        </div>

        <div class="detail-section">
          <h4>Key Features</h4>
          <ul class="features-list">
            ${product.features.map(f => `<li>${Icons.check} ${f}</li>`).join('')}
          </ul>
        </div>

        <div class="moq-box">
          <p><strong>Minimum Order:</strong> ${product.moqNote}</p>
        </div>

        <form onsubmit="addToQuoteFromDetail(event, '${product.id}')" class="quote-form-inline">
          <h4>Request a Quote</h4>
          <div class="form-row">
            <div class="form-group">
              <label>Packaging</label>
              <select name="packaging" class="form-control" required>
                ${product.packaging.map(p => `<option value="${p}">${p}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" class="form-control" value="1" min="1" required>
            </div>
          </div>
          <div class="form-group">
            <label>Notes (optional)</label>
            <textarea name="notes" class="form-control" placeholder="Any specific requirements..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">${Icons.plus} Add to Quote</button>
        </form>
      </div>
    </div>
  </div>
</div>
  `;
}

function renderQuoteBasket(container) {
  const items = Store.getQuoteItems();

  if (items.length === 0) {
    container.innerHTML = `
<div class="quote-basket-page">
  <div class="container">
    <div class="basket-empty">
      ${Icons.shoppingBag}
      <h3>Your quote basket is empty</h3>
      <p>Browse our products and add items to request a wholesale quote.</p>
      <a href="#/products" class="btn btn-primary">Browse Products</a>
    </div>
  </div>
</div>
    `;
    return;
  }

  container.innerHTML = `
<div class="quote-basket-page">
  <div class="container">
    <div class="basket-header">
      <h1>Quote Basket</h1>
      <p>Review your selected items before submitting a quote request.</p>
    </div>

    <div class="basket-layout">
      <div>
        <div class="basket-list">
          ${items.map(item => `
            <div class="basket-item">
              <div class="basket-item-image" data-name="${item.product.name}">
                <img src="${item.product.image}" alt="${item.product.name}" ${imgOnError(item.product.name)}>
              </div>
              <div class="basket-item-info">
                <h4>${item.product.name}</h4>
                <p>${item.packaging}${item.notes ? ' | ' + item.notes : ''}</p>
                <div class="basket-item-qty">
                  <button class="qty-btn" onclick="updateQty('${item.id}', -1)">${Icons.minus}</button>
                  <span class="qty-value">${item.quantity}</span>
                  <button class="qty-btn" onclick="updateQty('${item.id}', 1)">${Icons.plus}</button>
                </div>
              </div>
              <div class="basket-item-actions">
                <button class="remove-btn" onclick="removeItem('${item.id}')">${Icons.trash} Remove</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="flex gap-1">
          <button class="btn btn-outline" onclick="clearBasket()">Clear All</button>
          <a href="#/products" class="btn btn-ghost">${Icons.arrowLeft} Continue Shopping</a>
        </div>
      </div>

      <div class="basket-summary">
        <h3>Quote Summary</h3>
        <div class="summary-row">
          <span>Products</span>
          <span>${items.length}</span>
        </div>
        <div class="summary-row">
          <span>Total Units</span>
          <span>${Store.getQuoteCount()}</span>
        </div>
        <div class="summary-row total">
          <span>Items in Quote</span>
          <span>${items.length}</span>
        </div>
        <div class="summary-note">
          ${Icons.info} Prices are not shown as all quotes are customised based on volume, packaging and delivery requirements. Submit your request and we will respond within 24 hours.
        </div>
        <a href="#/request-quote" class="btn btn-primary btn-block">${Icons.send} Proceed to Quote</a>
      </div>
    </div>
  </div>
</div>
  `;
}

function renderRequestQuote(container) {
  const items = Store.getQuoteItems();

  if (items.length === 0) {
    return Router.navigate('/quote-basket');
  }

  container.innerHTML = `
<div class="request-quote-page">
  <div class="container">
    <div class="quote-form-container">
      <h1>Request a Quote</h1>
      <p>Fill in your details below. We will prepare your customised wholesale quote and respond within 24 hours.</p>

      <div class="quote-form-card">
        <div class="form-section">
          <div class="form-section-title">Products in Quote</div>
          <div class="quote-items-preview">
            ${items.map(item => `
              <div class="quote-item-preview">
                <img src="${item.product.image}" alt="${item.product.name}" ${imgOnError(item.product.name)} style="width:48px;height:48px;border-radius:var(--radius-sm);object-fit:cover;">
                <div class="quote-item-preview-info">
                  <h5>${item.product.name}</h5>
                  <p>${item.packaging}${item.notes ? ' | ' + item.notes : ''}</p>
                </div>
                <div class="quote-item-preview-qty">× ${item.quantity}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <form onsubmit="submitQuote(event)">
          <div class="form-section">
            <div class="form-section-title">Your Details</div>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" class="form-control" placeholder="John Smith" required>
              </div>
              <div class="form-group">
                <label>Company Name *</label>
                <input type="text" name="company" class="form-control" placeholder="Your Company Ltd" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="phone" class="form-control" placeholder="+44 7000 000000" required>
              </div>
              <div class="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" class="form-control" placeholder="john@company.com" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Business Type</label>
                <select name="businessType" class="form-control">
                  <option value="">Select business type</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Supermarket">Supermarket</option>
                  <option value="Cash & Carry">Cash & Carry</option>
                  <option value="Retail">Retail</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div class="form-group">
                <label>Delivery Address</label>
                <input type="text" name="address" class="form-control" placeholder="Full delivery address">
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="form-section-title">Additional Message</div>
            <div class="form-group">
              <textarea name="message" class="form-control" placeholder="Any specific requirements, delivery preferences, or questions..."></textarea>
            </div>
          </div>

          <button type="submit" id="submit-quote-btn" class="btn btn-primary btn-block btn-lg">${Icons.send} Submit Quote Request</button>
        </form>
      </div>
    </div>
  </div>
</div>
  `;
}

function renderSuccess(container) {
  const lastQuote = Store.quotes[0];
  if (!lastQuote) return Router.navigate('/');

  const message = generateWhatsAppMessage(lastQuote);
  const whatsappUrl = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(message)}`;

  container.innerHTML = `
<div class="success-page">
  <div class="container">
    <div class="success-card">
      <div class="success-icon">${Icons.checkCircle}</div>
      <h1>Quote Request Submitted</h1>
      <p>Thank you, <strong>${lastQuote.customer.fullName}</strong>. Your quote request <strong>${lastQuote.id}</strong> has been received. You can also send it directly via WhatsApp for faster response.</p>

      <div class="whatsapp-preview">${escapeHtml(message)}</div>

      <div class="flex gap-1 justify-center mb-2">
        <a href="${whatsappUrl}" target="_blank" class="btn btn-primary">${Icons.whatsapp} Send via WhatsApp</a>
        <button class="btn btn-outline" onclick="copyToClipboard()">${Icons.copy} Copy Message</button>
      </div>

      <p>We will also email a copy of your quote request to <strong>${lastQuote.customer.email}</strong>.</p>
      <p class="text-muted">For urgent enquiries, call us on ${COMPANY.phone}</p>

      <a href="#/products" class="btn btn-ghost">${Icons.arrowLeft} Back to Products</a>
    </div>
  </div>
</div>
  `;
}

function renderAdmin(container) {
  const quotes = Store.quotes;
  const totalItems = quotes.reduce((sum, q) => sum + q.items.reduce((s, i) => s + i.quantity, 0), 0);

  container.innerHTML = `
<div class="admin-page">
  <div class="container">
    <h1 class="mb-2">Admin Dashboard</h1>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-card-value">${quotes.length}</div>
        <div class="stat-card-label">Total Quotes</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value">${quotes.filter(q => q.status === 'pending').length}</div>
        <div class="stat-card-label">Pending</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value">${totalItems}</div>
        <div class="stat-card-label">Items Quoted</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-value">${PRODUCTS.length}</div>
        <div class="stat-card-label">Products</div>
      </div>
    </div>

    <div class="admin-content">
      <h3 class="mb-2">Recent Quote Requests</h3>
      ${quotes.length === 0 ? `
        <div class="text-center py-3">
          <p class="text-muted">No quote requests yet.</p>
        </div>
      ` : `
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Quote ID</th>
                <th>Customer</th>
                <th>Company</th>
                <th>Items</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${quotes.map(q => `
                <tr>
                  <td><strong>${q.id}</strong></td>
                  <td>${q.customer.fullName}<br><span class="text-muted text-sm">${q.customer.phone}</span></td>
                  <td>${q.customer.company}<br><span class="text-muted text-sm">${q.customer.email}</span></td>
                  <td>${q.items.length} products<br><span class="text-muted text-sm">${q.items.reduce((s, i) => s + i.quantity, 0)} units</span></td>
                  <td>${new Date(q.submittedAt).toLocaleDateString('en-GB')}</td>
                  <td><span class="status-badge status-${q.status}">${q.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  </div>
</div>
  `;
}

// ============================================
// ACTIONS
// ============================================

window.quickAdd = function(productId, event) {
  event.stopPropagation();
  event.preventDefault();
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const packaging = product.packaging[0];
  Store.addToQuote(productId, packaging, 1);
  showToast(`${product.name} added to quote`);
};

window.addToQuoteFromDetail = function(event, productId) {
  event.preventDefault();
  const form = event.target;
  const packaging = form.packaging.value;
  const quantity = parseInt(form.quantity.value);
  const notes = form.notes.value;

  Store.addToQuote(productId, packaging, quantity, notes);
  showToast('Product added to quote basket');

  // Reset form
  form.notes.value = '';
  form.quantity.value = '1';
};

window.updateQty = function(itemId, delta) {
  const item = Store.quote.find(i => i.id === itemId);
  if (!item) return;
  const newQty = item.quantity + delta;
  if (newQty < 1) {
    removeItem(itemId);
    return;
  }
  Store.updateQuantity(itemId, newQty);
  renderQuoteBasket(document.getElementById('main-content'));
};

window.removeItem = function(itemId) {
  Store.removeFromQuote(itemId);
  renderQuoteBasket(document.getElementById('main-content'));
  showToast('Item removed from quote');
};

window.clearBasket = function() {
  if (confirm('Clear all items from your quote basket?')) {
    Store.clearQuote();
    renderQuoteBasket(document.getElementById('main-content'));
    showToast('Quote basket cleared');
  }
};

window.submitQuote = function(event) {
  event.preventDefault();
  const form = event.target;
  const btn = document.getElementById('submit-quote-btn');
  btn.disabled = true;
  btn.innerHTML = `${Icons.send} Submitting...`;

  const customerData = {
    fullName: form.fullName.value,
    company: form.company.value,
    phone: form.phone.value,
    email: form.email.value,
    businessType: form.businessType.value,
    address: form.address.value,
    message: form.message.value
  };

  setTimeout(() => {
    Store.submitQuote(customerData);
    btn.disabled = false;
    btn.innerHTML = `${Icons.send} Submit Quote Request`;
    Router.navigate('/success');
  }, 800);
};

window.copyToClipboard = function() {
  const lastQuote = Store.quotes[0];
  if (!lastQuote) return;
  const message = generateWhatsAppMessage(lastQuote);
  navigator.clipboard.writeText(message).then(() => {
    showToast('Message copied to clipboard');
  }).catch(() => {
    showToast('Failed to copy', 'error');
  });
};

function generateWhatsAppMessage(quote) {
  const items = quote.items.map(item =>
    `• ${item.product.name} | ${item.packaging} | Qty: ${item.quantity}${item.notes ? ' (' + item.notes + ')' : ''}`
  ).join('\n');

  return `*QUOTE REQUEST - ${quote.id}*

*Customer:* ${quote.customer.fullName}
*Company:* ${quote.customer.company}
*Phone:* ${quote.customer.phone}
*Email:* ${quote.customer.email}
${quote.customer.businessType ? '*Business Type:* ' + quote.customer.businessType : ''}
${quote.customer.address ? '*Delivery Address:* ' + quote.customer.address : ''}

*PRODUCTS:*
${items}

${quote.customer.message ? '*Additional Message:*\n' + quote.customer.message : ''}

---
Sent via MGOLD GT Ltd Wholesale Catalog`;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// HEADER & FOOTER
// ============================================

function renderHeader() {
  return `
<header class="header" id="header">
  <div class="container header-inner">
    <a href="#/" class="logo">
      <div class="logo-mark" style="background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);">
        <span style="color: white; font-weight: 800; font-size: 14px;">M</span>
      </div>
      MGOLD <span>GT</span>
    </a>

    <nav class="nav-desktop">
      <a href="#/" class="nav-link" data-path="/">Home</a>
      <a href="#/products" class="nav-link" data-path="/products">Products</a>
      <a href="#/quote-basket" class="nav-link" data-path="/quote-basket">Quote Basket</a>
      <a href="#/request-quote" class="nav-link" data-path="/request-quote">Request Quote</a>
    </nav>

    <div class="header-actions">
      <button id="theme-toggle" class="btn-icon" onclick="toggleTheme()" title="Toggle dark mode">
        ${Icons.moon}
      </button>
      <a href="#/quote-basket" class="btn-icon quote-badge" title="Quote Basket">
        ${Icons.cart}
        <span class="quote-count" style="display: none;">0</span>
      </a>
      <button class="btn-icon menu-toggle" onclick="toggleMenu()">
        ${Icons.menu}
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu">
  <a href="#/" class="nav-link" data-path="/" onclick="toggleMenu()">Home</a>
  <a href="#/products" class="nav-link" data-path="/products" onclick="toggleMenu()">Products</a>
  <a href="#/quote-basket" class="nav-link" data-path="/quote-basket" onclick="toggleMenu()">Quote Basket</a>
  <a href="#/request-quote" class="nav-link" data-path="/request-quote" onclick="toggleMenu()">Request Quote</a>
</div>
  `;
}

function renderFooter() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="logo" style="margin-bottom: 1rem;">
          <div class="logo-mark" style="background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dark) 100%);">
            <span style="color: white; font-weight: 800; font-size: 14px;">M</span>
          </div>
          MGOLD <span>GT</span>
        </div>
        <p>${COMPANY.description}</p>
      </div>

      <div>
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="#/">Home</a></li>
          <li><a href="#/products">Products</a></li>
          <li><a href="#/quote-basket">Quote Basket</a></li>
          <li><a href="#/request-quote">Request Quote</a></li>
        </ul>
      </div>

      <div>
        <h4>Products</h4>
        <ul class="footer-links">
          ${CATEGORIES.map(c => `<li><a href="#/category/${c.slug}">${c.name}</a></li>`).join('')}
        </ul>
      </div>

      <div class="footer-contact">
        <h4>Contact</h4>
        <p>${Icons.mapPin} ${COMPANY.address}</p>
        <p>${Icons.phone} ${COMPANY.phone}</p>
        <p>${Icons.mail} ${COMPANY.email}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} ${COMPANY.name}. Company No. ${COMPANY.companyNumber}</p>
      <p>Wholesale B2B Catalogue</p>
    </div>
  </div>
</footer>

<button class="back-to-top" id="back-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
  ${Icons.arrowUp}
</button>
  `;
}

window.toggleMenu = function() {
  document.getElementById('mobile-menu').classList.toggle('open');
};

window.toggleTheme = function() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('mgold_theme', next);
  updateThemeIcon(next);
};

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? Icons.sun : Icons.moon;
    btn.title = theme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode';
  }
}

function initTheme() {
  const saved = localStorage.getItem('mgold_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

// ============================================
// INITIALISATION
// ============================================

function init() {
  initTheme();
  const app = document.getElementById('app');
  app.innerHTML = `
    ${renderHeader()}
    <main id="main-content"></main>
    ${renderFooter()}
  `;

  Store.updateBadge();
  Router.init();

  // Header scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 10);
    document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 500);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
