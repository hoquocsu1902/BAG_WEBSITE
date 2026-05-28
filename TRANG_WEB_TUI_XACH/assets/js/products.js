// ===== PRODUCTS.JS =====

let currentProducts = [...products];
let activeCategory = 'all';
let activePriceRange = 'all';
let activeSort = 'default';
let searchKeyword = '';

// Category labels
const categoryLabels = {
  all: 'Tất Cả',
  tote: 'Túi Tote',
  crossbody: 'Túi Đeo Chéo',
  office: 'Túi Công Sở',
  clutch: 'Clutch',
  backpack: 'Balo Mini'
};

// Get category label
function getCategoryLabel(cat) {
  return categoryLabels[cat] || cat;
}

// Filter & sort products
function getFilteredProducts() {
  let filtered = products.filter(p => p.stockStatus !== 'hidden');

  // Filter by category
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }

  // Filter by price
  if (activePriceRange !== 'all') {
    filtered = filtered.filter(p => {
      if (activePriceRange === 'under300') return p.price < 300000;
      if (activePriceRange === '300to500') return p.price >= 300000 && p.price <= 500000;
      if (activePriceRange === 'over500') return p.price > 500000;
      return true;
    });
  }

  // Search by keyword
  if (searchKeyword.trim()) {
    const kw = searchKeyword.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(kw) ||
      p.description.toLowerCase().includes(kw) ||
      getCategoryLabel(p.category).toLowerCase().includes(kw)
    );
  }

  // Sort
  if (activeSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'new') {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else if (activeSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return filtered;
}

// Create product card HTML
function createProductCard(product) {
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const inWishlist = isInWishlist(product.id);

  return `
    <div class="col-lg-3 col-md-4 col-sm-6 col-6 mb-4">
      <div class="product-card h-100">
        <div class="product-card-img-wrapper">
          <a href="product-detail.html?id=${product.id}">
            <img src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" class="product-card-img" loading="lazy" ${imageFallbackAttr()}>
          </a>
          <div class="product-badges">
            ${product.isNew ? '<span class="badge-new">Mới</span>' : ''}
            ${hasDiscount ? `<span class="badge-sale">-${discount}%</span>` : ''}
          </div>
          <div class="product-actions">
            <button class="action-btn ${inWishlist ? 'wishlisted' : ''}" 
              onclick="handleWishlistToggle(${product.id}, this)" title="Yêu thích">
              <i class="bi bi-heart${inWishlist ? '-fill' : ''}"></i>
            </button>
            <a href="product-detail.html?id=${product.id}" class="action-btn" title="Xem chi tiết">
              <i class="bi bi-eye"></i>
            </a>
          </div>
          <div class="product-overlay">
            <button onclick="addToCart(${product.id})">
              <i class="bi bi-bag me-2"></i>Thêm Vào Giỏ
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <div class="product-category">${getCategoryLabel(product.category)}</div>
          <h3 class="product-name">
            <a href="product-detail.html?id=${product.id}">${product.name}</a>
          </h3>
          <div class="product-rating">
            ${renderStars(product.rating)}
            <span style="color:var(--muted);font-size:0.8rem">(${product.rating})</span>
          </div>
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${hasDiscount ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
          <div class="product-specs">
            <span><i class="bi bi-arrows-angle-expand"></i>${escapeHTML(product.size)}</span>
            <span><i class="bi bi-palette"></i>${escapeHTML(product.color)}</span>
          </div>
          <div class="product-stock ${product.stock > 0 ? '' : 'is-empty'}">
            ${product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render products to DOM
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const resultCount = document.getElementById('resultCount');
  const emptyState = document.getElementById('emptyState');

  if (!grid) return;

  const filtered = getFilteredProducts();

  if (resultCount) {
    resultCount.textContent = `${filtered.length} sản phẩm`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
  } else {
    if (emptyState) emptyState.style.display = 'none';
    grid.innerHTML = filtered.map(createProductCard).join('');
    window.setTimeout(() => {
      if (typeof initScrollReveal === 'function') initScrollReveal();
    }, 40);
  }
}

// Handle wishlist toggle
function handleWishlistToggle(id, btn) {
  const inList = toggleWishlist(id);
  const icon = btn.querySelector('i');
  if (inList) {
    btn.classList.add('wishlisted');
    icon.className = 'bi bi-heart-fill';
  } else {
    btn.classList.remove('wishlisted');
    icon.className = 'bi bi-heart';
  }
}

// Init category filter buttons
function initCategoryFilters() {
  const btns = document.querySelectorAll('[data-category]');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts();
    });
  });
}

// Init price range radios
function initPriceFilters() {
  const radios = document.querySelectorAll('[name="priceRange"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      activePriceRange = radio.value;
      renderProducts();
    });
  });
}

// Init sort select
function initSort() {
  const sortEl = document.getElementById('sortSelect');
  if (sortEl) {
    sortEl.addEventListener('change', () => {
      activeSort = sortEl.value;
      renderProducts();
    });
  }
}

// Init search
function initSearch() {
  const searchEl = document.getElementById('searchInput');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      searchKeyword = searchEl.value;
      renderProducts();
    });

    searchEl.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchEl.value = '';
        searchKeyword = '';
        renderProducts();
      }
    });
  }
}

// Init from URL params
function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const search = params.get('search');

  if (cat) {
    activeCategory = cat;
    const btn = document.querySelector(`[data-category="${cat}"]`);
    if (btn) {
      document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  }

  if (search) {
    searchKeyword = search;
    const searchEl = document.getElementById('searchInput');
    if (searchEl) searchEl.value = search;
  }
}

// Main init
document.addEventListener('DOMContentLoaded', () => {
  initFromURL();
  initCategoryFilters();
  initPriceFilters();
  initSort();
  initSearch();
  renderProducts();
});
