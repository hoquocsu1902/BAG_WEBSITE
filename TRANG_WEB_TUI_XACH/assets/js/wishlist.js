// ===== WISHLIST.JS =====

function renderWishlist() {
  const wishlistIds = getFromStorage('wishlist') || [];
  const grid = document.getElementById('wishlistGrid');
  const emptyState = document.getElementById('wishlistEmpty');
  const countEl = document.getElementById('wishlistCount');

  if (!grid) return;

  if (countEl) countEl.textContent = wishlistIds.length;

  if (wishlistIds.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  const wishlistProducts = wishlistIds
    .map(id => getProductById(id))
    .filter(Boolean);

  grid.innerHTML = wishlistProducts.map(product => {
    const hasDiscount = product.oldPrice && product.oldPrice > product.price;
    return `
      <div class="col-lg-3 col-md-4 col-sm-6 col-6" id="wishlistItem_${product.id}">
        <div class="product-card">
          <div class="product-card-img-wrapper">
            <a href="product-detail.html?id=${product.id}">
              <img src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" class="product-card-img" loading="lazy" ${imageFallbackAttr()}>
            </a>
            <div class="product-actions" style="opacity:1;transform:none;">
              <button class="action-btn wishlisted" onclick="removeFromWishlist(${product.id})" title="Xóa khỏi yêu thích">
                <i class="bi bi-heart-fill"></i>
              </button>
              <a href="product-detail.html?id=${product.id}" class="action-btn" title="Xem chi tiết">
                <i class="bi bi-eye"></i>
              </a>
            </div>
            <div class="product-overlay" style="transform:translateY(0);">
              <button onclick="moveToCart(${product.id})">
                <i class="bi bi-bag me-2"></i>Thêm Vào Giỏ
              </button>
            </div>
          </div>
          <div class="product-card-body">
            <div class="product-category">${getCategoryLabel(product.category)}</div>
            <h3 class="product-name"><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
            <div class="product-rating">${renderStars(product.rating)}</div>
            <div class="product-price">
              <span class="price-current">${formatPrice(product.price)}</span>
              ${hasDiscount ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>
            <button onclick="moveToCart(${product.id})" class="btn-gold mt-2" style="font-size:0.76rem;padding:8px;">
              <i class="bi bi-bag me-1"></i>Thêm Vào Giỏ
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryLabel(cat) {
  const map = { tote:'Túi Tote', crossbody:'Túi Đeo Chéo', office:'Túi Công Sở', clutch:'Clutch', backpack:'Balo Mini' };
  return map[cat] || cat;
}

function removeFromWishlist(productId) {
  let wishlist = getFromStorage('wishlist') || [];
  wishlist = wishlist.filter(id => id !== productId);
  saveToStorage('wishlist', wishlist);
  updateWishlistBadge();

  const item = document.getElementById(`wishlistItem_${productId}`);
  if (item) {
    item.style.transition = 'opacity 0.3s, transform 0.3s';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    setTimeout(() => {
      item.remove();
      renderWishlist();
    }, 300);
  }

  showToast('Đã xóa khỏi danh sách yêu thích', 'info');
}

function moveToCart(productId) {
  addToCart(productId);
  removeFromWishlist(productId);
}

function clearWishlist() {
  if (!confirm('Bạn có chắc muốn xóa toàn bộ danh sách yêu thích?')) return;
  saveToStorage('wishlist', []);
  updateWishlistBadge();
  renderWishlist();
  showToast('Đã xóa toàn bộ danh sách yêu thích', 'info');
}

function addAllToCart() {
  const wishlistIds = getFromStorage('wishlist') || [];
  wishlistIds.forEach(id => addToCart(id));
  showToast(`Đã thêm ${wishlistIds.length} sản phẩm vào giỏ hàng!`);
}

document.addEventListener('DOMContentLoaded', renderWishlist);
