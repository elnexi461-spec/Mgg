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
  menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  cart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  arrowRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowLeft: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  checkCircle: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  minus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  mapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  mail: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`,
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>`,
  package: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  fileText: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  oilCan: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 13-5 5"/><path d="M2 12h21"/><path d="m19 11-5-5"/><path d="M9 7V2H5v5"/><path d="M5 7v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7"/></svg>`,
  bottleWater: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 22a2.5 2.5 0 0 1 0-5h11a2.5 2.5 0 0 1 0 5z"/><path d="M12 2v5"/><path d="M7 7h10v10H7z"/><path d="M9 2h6"/></svg>`,
  boxesStacked: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
  send: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>`,
  whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  shoppingBag: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  arrowUp: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`,
  info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  alertCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  externalLink: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
  moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
};

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
  toast.innerHTML = `${type === 'success' ? Icons.check : type === 'error' ? Icons.alertCircle : Icons.info}<span>${message}</span>`;
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
    <section class="hero">
      <div class="hero-pattern"></div>
      <div class="container hero-content">
        <div class="hero-badge">
          <span class="dot"></span>
          <span>Trusted UK Wholesale Supplier</span>
        </div>
        <h1 style="animation-delay:0.1s">
          Premium Wholesale Food & Beverages for UK Businesses
        </h1>
        <p style="animation-delay:0.2s">
          MGOLD GT Ltd supplies restaurants, supermarkets, cash & carry outlets and corporate clients with quality edible oils, dairy, beverages and dry goods - sourced worldwide, delivered across the UK.
        </p>
        <div class="hero-actions">
          <a href="#/products" class="btn btn-primary btn-lg">Browse Products ${Icons.arrowRight}</a>
          <a href="#/quote-basket" class="btn btn-outline btn-lg">Request a Quote</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-value">14+</div>
            <div class="hero-stat-label">Products</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">3</div>
            <div class="hero-stat-label">Categories</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-value">UK</div>
            <div class="hero-stat-label">Wide Delivery</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Our Product Categories</h2>
          <p>Browse our wholesale range of oils, liquids and dry goods sourced from reliable suppliers worldwide.</p>
        </div>
        <div class="categories-grid">
          ${CATEGORIES.map(cat => `
            <div class="category-card" onclick="window.location.hash='#/category/${cat.slug}'">
              <div class="category-image" style="background-image:url('${cat.image}')">
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
    </section>

    <section class="section" style="background:var(--bg-warm)">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose MGOLD GT?</h2>
          <p>We are a trusted UK wholesaler with a global supply network and a commitment to quality.</p>
        </div>
        <div class="products-grid">
          ${[
            { title: 'Global Sourcing', desc: 'We source from reliable suppliers in Ukraine, Malaysia, Europe and worldwide to ensure competitive pricing and consistent supply.', icon: 'package' },
            { title: 'Custom Labelling', desc: 'All products available with MGOLD GT custom labelling upon request. Build your own brand with our wholesale supply.', icon: 'fileText' },
            { title: 'UK Wide Delivery', desc: 'Based in Barking, London. We deliver to restaurants, supermarkets, cash & carry and corporate clients across the UK.', icon: 'mapPin' },
            { title: 'Halal & Kosher', desc: 'Our oil products are certified Halal and Kosher, meeting the dietary requirements of diverse UK customers.', icon: 'checkCircle' },
          ].map(item => `
            <div class="product-card" style="padding:1.5rem">
              <div style="width:48px;height:48px;background:linear-gradient(135deg,var(--gold)0%,var(--gold-dark)100%);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:white;margin-bottom:1rem">
                ${Icons[item.icon]}
              </div>
              <h3 style="font-size:1.1rem;margin-bottom:0.5rem">${item.title}</h3>
              <p style="font-size:0.9rem">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Featured Products</h2>
          <p>Our most requested wholesale items, available in bulk with custom packaging options.</p>
        </div>
        <div class="products-grid">
          ${PRODUCTS.slice(0, 4).map(p => renderProductCard(p)).join('')}
        </div>
        <div class="text-center mt-3">
          <a href="#/products" class="btn btn-primary btn-lg">View All Products ${Icons.arrowRight}</a>
        </div>
      </div>
    </section>

    <section class="section" style="background:linear-gradient(135deg, var(--navy) 0%, #2a1a1a 100%);color:white">
      <div class="container">
        <div class="section-header" style="color:white">
          <h2 style="color:white">Leadership</h2>
          <p style="color:rgba(255,255,255,0.7)">Meet the team behind MGOLD GT Ltd</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr;gap:2rem;align-items:center;max-width:800px;margin:0 auto">
          <div style="text-align:center">
            <div style="width:160px;height:160px;border-radius:50%;overflow:hidden;margin:0 auto 1.5rem;border:3px solid var(--gold);box-shadow:0 8px 30px rgba(0,0,0,0.3)">
              <img src="./md-photo.jpg" alt="Riffat Zakaria" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.parentElement.style.background='var(--gold)'">
            </div>
            <h3 style="color:var(--gold);margin-bottom:0.25rem">Riffat Zakaria</h3>
            <p style="color:rgba(255,255,255,0.6);font-size:0.9rem;margin-bottom:1rem">Managing Director</p>
            <p style="color:rgba(255,255,255,0.8);line-height:1.7;font-size:0.95rem">
              He is a Managing Director of a well-known established wholesale company MGOLD GT Ltd based in London, UK. He is also a Director of MGOLD General Trading LLC which is based in Dubai-UAE. Both the companies, in their respective areas, specialise in the wholesale of Edible oil, Vegetable oil, Sunflower oil, Olive oil, Mineral water, Condensed milk, Evaporated milk, Tea, Spices, Soft drinks, Milk powder, Sugar, Salt.
            </p>
          </div>
        </div>
      </div>
    </section>
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
    <div class="container section" style="padding-top:0">
      <div class="breadcrumbs">
        <a href="#/">Home</a>
        ${Icons.chevronRight}
        <span>Products</span>
      </div>

      ${CATEGORIES.map(cat => `
        <div style="margin-bottom:3rem">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem">
            <h2 style="font-size:1.25rem">${cat.name}</h2>
            <span style="font-size:0.8rem;color:var(--text-muted);background:var(--bg-cool);padding:0.25rem 0.6rem;border-radius:100px">${cat.productCount} items</span>
          </div>
          <div class="products-grid">
            ${PRODUCTS.filter(p => p.categoryId === cat.id).map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      `).join('')}
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
    <div class="container section" style="padding-top:0">
      <div class="breadcrumbs">
        <a href="#/">Home</a>
        ${Icons.chevronRight}
        <a href="#/products">Products</a>
        ${Icons.chevronRight}
        <span>${category.name}</span>
      </div>
      <div class="products-grid">
        ${products.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;
}

function renderProductCard(product) {
  const category = CATEGORIES.find(c => c.id === product.categoryId);
  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="img-fallback" style="display:none"><span>${product.name}</span></div>
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
          <a href="#/product/${product.id}" class="btn btn-outline btn-sm">View Details</a>
          <button class="btn btn-primary btn-sm" onclick="quickAdd('${product.id}', event)">Add to Quote</button>
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
          <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
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

            <div class="quote-form-inline">
              <h4>Request a Quote</h4>
              <form onsubmit="addToQuoteFromDetail(event, '${product.id}')">
                <div class="form-row">
                  <div class="form-group">
                    <label>Packaging</label>
                    <select class="form-control" name="packaging" required>
                      ${product.packaging.map(p => `<option value="${p}">${p}</option>`).join('')}
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" class="form-control" name="quantity" min="1" value="1" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Notes (optional)</label>
                  <input type="text" class="form-control" name="notes" placeholder="e.g. Custom labelling, specific delivery requirements">
                </div>
                <button type="submit" class="btn btn-primary btn-block">${Icons.cart} Add to Quote</button>
              </form>
            </div>
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
          <div class="basket-header">
            <h1>Quote Basket</h1>
            <p>Your selected products for quotation</p>
          </div>
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
          <p>Review your selected products before requesting a quote</p>
        </div>

        <div style="display:grid;grid-template-columns:1fr;gap:2rem">
          <div>
            <div class="basket-list">
              ${items.map(item => `
                <div class="basket-item" data-id="${item.id}">
                  <div class="basket-item-image">
                    <img src="${item.product.image}" alt="${item.product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
                    <div class="img-fallback" style="display:none"><span>${item.product.name}</span></div>
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

            <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
              <a href="#/products" class="btn btn-outline">${Icons.arrowLeft} Continue Shopping</a>
              <button class="btn btn-ghost" onclick="clearBasket()" style="color:var(--danger)">${Icons.trash} Clear All</button>
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
            <a href="#/request-quote" class="btn btn-primary btn-block btn-lg">${Icons.send} Proceed to Quote</a>
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
            <div class="quote-items-preview">
              <div class="form-section-title">Products in Quote</div>
              ${items.map(item => `
                <div class="quote-item-preview">
                  <img src="${item.product.image}" alt="${item.product.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" style="position:relative;z-index:1">
                  <div class="img-fallback" style="display:none;width:48px;height:48px;position:absolute;left:0;top:0"><span style="font-size:0.6rem">${item.product.name}</span></div>
                  <div class="quote-item-preview-info">
                    <h5>${item.product.name}</h5>
                    <p>${item.packaging}${item.notes ? ' | ' + item.notes : ''}</p>
                  </div>
                  <span class="quote-item-preview-qty">× ${item.quantity}</span>
                </div>
              `).join('')}
            </div>

            <form id="quote-form" onsubmit="submitQuote(event)">
              <div class="form-section">
                <div class="form-section-title">Company Details</div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" class="form-control" name="fullName" placeholder="Your full name" required>
                  </div>
                  <div class="form-group">
                    <label>Company Name *</label>
                    <input type="text" class="form-control" name="company" placeholder="Your company name" required>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" class="form-control" name="phone" placeholder="+44 7XXX XXXXXX" required>
                  </div>
                  <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" class="form-control" name="email" placeholder="you@company.com" required>
                  </div>
                </div>
                <div class="form-group">
                  <label>Business Type</label>
                  <select class="form-control" name="businessType">
                    <option value="">Select business type</option>
                    <option value="restaurant">Restaurant / Cafe</option>
                    <option value="cash-carry">Cash & Carry</option>
                    <option value="supermarket">Supermarket / Retail</option>
                    <option value="food-manufacturer">Food Manufacturer</option>
                    <option value="corporate">Corporate</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div class="form-section">
                <div class="form-section-title">Delivery & Requirements</div>
                <div class="form-group">
                  <label>Delivery Address</label>
                  <textarea class="form-control" name="address" rows="2" placeholder="Full delivery address (optional)"></textarea>
                </div>
                <div class="form-group">
                  <label>Additional Message</label>
                  <textarea class="form-control" name="message" rows="3" placeholder="Any specific requirements, preferred delivery dates, custom labelling needs, etc."></textarea>
                </div>
              </div>

              <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
                <a href="#/quote-basket" class="btn btn-outline">${Icons.arrowLeft} Back to Basket</a>
                <button type="submit" class="btn btn-primary" id="submit-quote-btn">${Icons.send} Submit Quote Request</button>
              </div>
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

          <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center">
            <button class="btn btn-outline" onclick="copyToClipboard()">${Icons.copy} Copy Message</button>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="background:#25D366;border-color:#25D366">${Icons.whatsapp} Send via WhatsApp</a>
          </div>

          <div style="margin-top:2rem;padding-top:2rem;border-top:1px solid var(--border)">
            <p style="font-size:0.875rem;color:var(--text-muted)">
              We will also email a copy of your quote request to <strong>${lastQuote.customer.email}</strong>.<br>
              For urgent enquiries, call us on <a href="tel:${COMPANY.phone}" style="color:var(--gold-dark)">${COMPANY.phone}</a>
            </p>
            <a href="#/products" class="btn btn-ghost mt-2">${Icons.arrowLeft} Back to Products</a>
          </div>
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
        <h1 style="margin-bottom:1.5rem">Admin Dashboard</h1>

        <div class="admin-grid">
          <div class="admin-sidebar">
            <h3>Navigation</h3>
            <ul class="admin-nav">
              <li><a href="#/admin" class="active">${Icons.fileText} Quote Requests</a></li>
              <li><a href="#/products">${Icons.package} Products</a></li>
              <li><a href="#/">${Icons.home} Home</a></li>
            </ul>
          </div>

          <div class="admin-content">
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

            <h3 style="margin-bottom:1rem">Recent Quote Requests</h3>
            ${quotes.length === 0 ? `
              <div style="text-align:center;padding:3rem;background:var(--bg-warm);border-radius:var(--radius-lg)">
                <p style="color:var(--text-muted)">No quote requests yet.</p>
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
                        <td>${q.customer.fullName}<br><span style="color:var(--text-muted);font-size:0.8rem">${q.customer.phone}</span></td>
                        <td>${q.customer.company}<br><span style="color:var(--text-muted);font-size:0.8rem">${q.customer.email}</span></td>
                        <td>${q.items.length} products<br><span style="color:var(--text-muted);font-size:0.8rem">${q.items.reduce((s, i) => s + i.quantity, 0)} units</span></td>
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
  btn.innerHTML = `<div class="loading-spinner"></div> Submitting...`;

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
          <svg class="logo-mark" width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
  <circle cx="100" cy="100" r="90" stroke="#C9A227" stroke-width="4" fill="none" stroke-dasharray="6 4"/>
  <circle cx="100" cy="100" r="78" stroke="#C9A227" stroke-width="2" fill="none" opacity="0.5"/>
  <text x="100" y="108" text-anchor="middle" fill="#C9A227" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="42" letter-spacing="3">MGOLD</text>
  <text x="100" y="132" text-anchor="middle" fill="#C9A227" font-family="Arial, sans-serif" font-weight="400" font-size="14" letter-spacing="6" opacity="0.9">GT</text>
</svg>
          MGOLD <span>GT</span>
        </a>

        <nav class="nav-desktop">
          <a href="#/" class="nav-link" data-path="/">Home</a>
          <a href="#/products" class="nav-link" data-path="/products">Products</a>
          <a href="#/quote-basket" class="nav-link" data-path="/quote-basket">Quote Basket</a>
          <a href="#/admin" class="nav-link" data-path="/admin">Admin</a>
        </nav>

        <div class="header-actions">
          <button class="btn-icon" onclick="toggleTheme()" aria-label="Toggle theme" id="theme-toggle" title="Toggle dark mode">
            ${Icons.moon}
          </button>
          <a href="#/quote-basket" class="btn-icon quote-badge" title="Quote Basket">
            ${Icons.cart}
            <span class="quote-count" style="display:${Store.getQuoteCount() > 0 ? 'flex' : 'none'}">${Store.getQuoteCount()}</span>
          </a>
          <button class="btn-icon menu-toggle" onclick="toggleMenu()" aria-label="Menu">
            ${Icons.menu}
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" id="mobile-menu">
      <a href="#/" class="nav-link" onclick="toggleMenu()">Home</a>
      <a href="#/products" class="nav-link" onclick="toggleMenu()">Products</a>
      <a href="#/quote-basket" class="nav-link" onclick="toggleMenu()">Quote Basket</a>
      <a href="#/admin" class="nav-link" onclick="toggleMenu()">Admin Dashboard</a>
      <div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border-light)">
        <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.5rem">Contact Us</p>
        <a href="tel:${COMPANY.phone}" style="display:flex;align-items:center;gap:0.5rem;padding:0.75rem 0;font-weight:600">${Icons.phone} ${COMPANY.phone}</a>
        <a href="mailto:${COMPANY.email}" style="display:flex;align-items:center;gap:0.5rem;padding:0.75rem 0;font-weight:600">${Icons.mail} ${COMPANY.email}</a>
      </div>
    </div>
  `;
}

function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">
              <svg class="logo-mark" width="40" height="40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
  <circle cx="100" cy="100" r="90" stroke="#C9A227" stroke-width="4" fill="none" stroke-dasharray="6 4"/>
  <circle cx="100" cy="100" r="78" stroke="#C9A227" stroke-width="2" fill="none" opacity="0.5"/>
  <text x="100" y="108" text-anchor="middle" fill="#C9A227" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="42" letter-spacing="3">MGOLD</text>
  <text x="100" y="132" text-anchor="middle" fill="#C9A227" font-family="Arial, sans-serif" font-weight="400" font-size="14" letter-spacing="6" opacity="0.9">GT</text>
</svg>
              MGOLD <span>GT</span>
            </div>
            <p>${COMPANY.description}</p>
            <p style="margin-top:1rem;font-size:0.8rem">Company No: ${COMPANY.companyNumber}</p>
          </div>

          <div>
            <h4>Products</h4>
            <ul class="footer-links">
              ${CATEGORIES.map(c => `<li><a href="#/category/${c.slug}">${c.name}</a></li>`).join('')}
              <li><a href="#/products">View All Products</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul class="footer-links">
              <li><a href="#/">Home</a></li>
              <li><a href="#/quote-basket">Request Quote</a></li>
              <li><a href="tel:${COMPANY.phone}">Contact</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h4>Contact</h4>
            <p>${Icons.mapPin} ${COMPANY.address}</p>
            <p>${Icons.phone} <a href="tel:${COMPANY.phone}">${COMPANY.phone}</a></p>
            <p>${Icons.mail} <a href="mailto:${COMPANY.email}">${COMPANY.email}</a></p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} MGOLD GT Ltd. All rights reserved.</p>
          <p>Wholesale B2B Catalogue</p>
        </div>
      </div>
    </footer>
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
    <button class="back-to-top" id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">
      ${Icons.arrowUp}
    </button>
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
