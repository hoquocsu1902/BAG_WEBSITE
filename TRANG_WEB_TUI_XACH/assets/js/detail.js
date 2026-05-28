// ===== DETAIL.JS =====

let currentProduct = null;
let selectedQty = 1;
let selectedSize = '';
let selectedColor = '';

function renderProductDetail() {
  const productId = getProductIdFromURL();
  if (!productId) {
    window.location.href = 'products.html';
    return;
  }

  const product = getProductById(productId);
  if (!product) {
    document.getElementById('detailContent').innerHTML = `
      <div class="empty-state py-5">
        <i class="bi bi-bag-x"></i>
        <h4>Không Tìm Thấy Sản Phẩm</h4>
        <p>Sản phẩm này không tồn tại hoặc đã bị xóa.</p>
        <a href="products.html" class="btn-dark-custom mt-3" style="padding:12px 28px;">Quay Lại Cửa Hàng</a>
      </div>
    `;
    return;
  }

  currentProduct = product;
  window.currentProduct = product;
  selectedSize = product.sizes?.[0] || product.size;
  selectedColor = product.colors?.[0]?.name || product.color;
  document.title = `${product.name} – HUIT`;

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discount = hasDiscount ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const inWishlist = isInWishlist(product.id);

  const detailHTML = `
    <div class="row g-5">
      <!-- Images -->
      <div class="col-lg-6">
        <div class="mb-3">
          <img id="mainImage" src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" class="detail-main-img" ${imageFallbackAttr()}>
        </div>
        <div class="row g-2">
          ${product.gallery.map((img, i) => `
            <div class="col-4">
              <img src="${safeImageURL(img)}" alt="${escapeHTML(product.name)} ${i+1}" class="detail-thumb ${i===0?'active':''}" ${imageFallbackAttr()}
                onclick="changeMainImage(this, '${img}')">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Info -->
      <div class="col-lg-6">
        <div style="font-size:0.75rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--secondary);margin-bottom:0.5rem;">
          ${getCategoryLabel(product.category)}
        </div>

        <h1 class="detail-title">${product.name}</h1>

        <div class="d-flex align-items-center gap-3 mb-3">
          <div style="color:var(--secondary);font-size:0.9rem;">${renderStars(product.rating)}</div>
          <span style="font-size:0.85rem;color:var(--muted);">${product.rating} / 5 sao</span>
          <span style="font-size:0.85rem;color:var(--muted);">|</span>
          <span style="font-size:0.85rem;color:${product.stock > 0 ? 'var(--success)' : 'var(--danger)'};">
            <i class="bi bi-circle-fill" style="font-size:0.5rem;"></i>
            ${product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
          </span>
        </div>

        <div class="d-flex align-items-center gap-3 mb-4" style="border-top:1px solid var(--border);padding-top:1.2rem;">
          <span class="detail-price-current">${formatPrice(product.price)}</span>
          ${hasDiscount ? `
            <span class="detail-price-old">${formatPrice(product.oldPrice)}</span>
            <span style="background:var(--danger);color:#fff;font-size:0.7rem;padding:3px 10px;letter-spacing:0.1em;">-${discount}%</span>
          ` : ''}
        </div>

        <p style="font-size:0.9rem;color:var(--muted);line-height:1.8;margin-bottom:1.5rem;">${product.description}</p>

        <div class="detail-options-grid mb-4">
          <div>
            <div class="option-label">Kích thước</div>
            <div class="option-row" id="sizeOptions">
              ${product.sizes.map((size, index) => `
                <button type="button" class="option-pill ${index === 0 ? 'active' : ''}" onclick="selectSize('${escapeHTML(size)}', this)">${escapeHTML(size)}</button>
              `).join('')}
            </div>
          </div>
          <div>
            <div class="option-label">Màu sắc</div>
            <div class="option-row" id="colorOptions">
              ${product.colors.map((color, index) => `
                <button type="button" class="color-pill ${index === 0 ? 'active' : ''}" onclick="selectColor('${escapeHTML(color.name)}', this)" title="${escapeHTML(color.name)}">
                  <span style="background:${color.hex || '#c9a227'}"></span>${escapeHTML(color.name)}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="detail-addon-box mb-4">
          <div class="option-label">Thành phần mua kèm</div>
          ${product.addOns.map(addon => `
            <label class="addon-option">
              <input type="checkbox" name="addon" value="${escapeHTML(addon.id)}" data-name="${escapeHTML(addon.name)}" data-price="${addon.price}">
              <span>${escapeHTML(addon.name)}</span>
              <strong>${formatPrice(addon.price)}</strong>
            </label>
          `).join('')}
        </div>

        <div class="table-responsive mb-4">
          <table class="detail-spec-table">
            <tbody>
              ${Object.entries(product.components).map(([key, value]) => `
                <tr>
                  <th>${escapeHTML(key)}</th>
                  <td>${escapeHTML(value)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Quantity -->
        <div class="d-flex align-items-center gap-3 mb-4">
          <span style="font-size:0.78rem;letter-spacing:0.15em;text-transform:uppercase;font-weight:500;">Số lượng:</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(-1)"><i class="bi bi-dash"></i></button>
            <input type="number" id="qtyInput" class="qty-input" value="1" min="1" max="${product.stock}" 
              onchange="validateQty(this, ${product.stock})">
            <button class="qty-btn" onclick="changeQty(1)"><i class="bi bi-plus"></i></button>
          </div>
        </div>

        <!-- Actions -->
        <div class="d-flex gap-3 mb-4 flex-wrap">
          <button onclick="addToCartFromDetail()" class="btn-primary-custom flex-grow-1" ${product.stock === 0 ? 'disabled' : ''}>
            <i class="bi bi-bag me-2"></i>${product.stock === 0 ? 'Hết Hàng' : 'Thêm Vào Giỏ'}
          </button>
          <button id="wishlistBtn" onclick="handleWishlistToggle(${product.id}, this)" class="action-btn ${inWishlist?'wishlisted':''}" 
            style="width:48px;height:48px;border:1px solid var(--border);" title="Yêu thích">
            <i class="bi bi-heart${inWishlist?'-fill':''}"></i>
          </button>
        </div>

        <!-- Trust signals -->
        <div class="d-flex gap-4 flex-wrap" style="border-top:1px solid var(--border);padding-top:1.2rem;">
          <div style="font-size:0.78rem;color:var(--muted);"><i class="bi bi-truck me-1" style="color:var(--secondary);"></i>Miễn phí ship 500K+</div>
          <div style="font-size:0.78rem;color:var(--muted);"><i class="bi bi-arrow-repeat me-1" style="color:var(--secondary);"></i>Đổi trả 7 ngày</div>
          <div style="font-size:0.78rem;color:var(--muted);"><i class="bi bi-shield-check me-1" style="color:var(--secondary);"></i>Hàng chính hãng</div>
        </div>
      </div>
    </div>
  `;

  const detailContent = document.getElementById('detailContent');
  if (detailContent) detailContent.innerHTML = detailHTML;

  // Breadcrumb
  const breadcrumb = document.getElementById('productBreadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="index.html">Trang Chủ</a> /
      <a href="products.html">Sản Phẩm</a> /
      <a href="products.html?cat=${product.category}">${getCategoryLabel(product.category)}</a> /
      <span>${product.name}</span>
    `;
  }

  // Related products
  renderRelatedProducts(product);
}

function getCategoryLabel(cat) {
  const map = { tote:'Túi Tote', crossbody:'Túi Đeo Chéo', office:'Túi Công Sở', clutch:'Clutch', backpack:'Balo Mini' };
  return map[cat] || cat;
}

function changeMainImage(thumb, src) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('.detail-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function changeQty(delta) {
  const input = document.getElementById('qtyInput');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  const max = parseInt(input.max);
  if (val < 1) val = 1;
  if (val > max) val = max;
  input.value = val;
  selectedQty = val;
}

function validateQty(input, max) {
  let val = parseInt(input.value);
  if (isNaN(val) || val < 1) val = 1;
  if (val > max) val = max;
  input.value = val;
  selectedQty = val;
}

function selectSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll('#sizeOptions .option-pill').forEach(item => item.classList.remove('active'));
  btn.classList.add('active');
}

function selectColor(color, btn) {
  selectedColor = color;
  document.querySelectorAll('#colorOptions .color-pill').forEach(item => item.classList.remove('active'));
  btn.classList.add('active');
}

function getSelectedAddOns() {
  return Array.from(document.querySelectorAll('[name="addon"]:checked')).map(input => ({
    id: input.value,
    name: input.dataset.name,
    price: Number(input.dataset.price) || 0
  }));
}

function addToCartFromDetail() {
  if (!currentProduct) return;
  const qty = parseInt(document.getElementById('qtyInput')?.value) || 1;
  addToCart(currentProduct.id, qty, {
    size: selectedSize,
    color: selectedColor,
    addOns: getSelectedAddOns()
  });
}

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

function renderRelatedProducts(product) {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  if (related.length === 0) {
    container.closest('section').style.display = 'none';
    return;
  }

  container.innerHTML = related.map(p => {
    const hasDiscount = p.oldPrice && p.oldPrice > p.price;
    return `
      <div class="col-lg-3 col-md-4 col-6">
        <div class="product-card">
          <div class="product-card-img-wrapper">
            <a href="product-detail.html?id=${p.id}">
              <img src="${safeImageURL(p.image)}" alt="${escapeHTML(p.name)}" class="product-card-img" loading="lazy" ${imageFallbackAttr()}>
            </a>
            <div class="product-overlay">
              <button onclick="addToCart(${p.id})"><i class="bi bi-bag me-2"></i>Thêm Vào Giỏ</button>
            </div>
          </div>
          <div class="product-card-body">
            <div class="product-name"><a href="product-detail.html?id=${p.id}">${p.name}</a></div>
            <div class="product-price">
              <span class="price-current">${formatPrice(p.price)}</span>
              ${hasDiscount ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
            </div>
            <div class="product-specs">
              <span><i class="bi bi-arrows-angle-expand"></i>${escapeHTML(p.size)}</span>
              <span><i class="bi bi-palette"></i>${escapeHTML(p.color)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderProductDetail);
