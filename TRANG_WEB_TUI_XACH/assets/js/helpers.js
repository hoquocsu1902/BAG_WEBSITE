// ===== HELPER FUNCTIONS =====

// Format tiền VNĐ
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
}

// Lưu vào localStorage
function saveToStorage(key, data) {
  try {
    if (data === null || typeof data === 'undefined') {
      localStorage.removeItem(key);
      return true;
    }
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Lỗi khi lưu localStorage:', e);
    showStorageFallbackToast();
    return false;
  }
}

// Đọc từ localStorage
function getFromStorage(key, fallback = null) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error('Lỗi khi đọc localStorage:', e);
    return fallback;
  }
}

function showStorageFallbackToast() {
  if (document.getElementById('toastContainer')) {
    showToast('Trình duyệt đang chặn lưu dữ liệu cục bộ. Một số thao tác chỉ hiển thị tạm thời.', 'error');
  }
}

function escapeHTML(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}


const HUIT_FALLBACK_IMAGE = "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80";

function imageFallbackAttr() {
  return `onerror="this.onerror=null;this.src='${HUIT_FALLBACK_IMAGE}'"`;
}

function safeImageURL(value) {
  return value || HUIT_FALLBACK_IMAGE;
}

// Lấy sản phẩm theo id
function getProductById(id) {
  return products.find(p => p.id === parseInt(id)) || null;
}

function getProductStock(productId) {
  const product = getProductById(productId);
  return product ? Number(product.stock) || 0 : 0;
}

function getCartQuantity(productId) {
  const cart = getFromStorage('cart', []);
  return cart.reduce((sum, item) => item.id === parseInt(productId) ? sum + (Number(item.quantity) || 0) : sum, 0);
}

function normalizeCartItem(item) {
  const product = getProductById(item.id);
  if (!product) return null;
  const stock = Number(product.stock) || 0;
  const quantity = Math.max(1, Math.min(Number(item.quantity) || 1, stock || 1));
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity,
    category: product.category,
    size: item.size || product.sizes?.[0] || product.size,
    color: item.color || product.colors?.[0]?.name || product.color,
    addOns: Array.isArray(item.addOns) ? item.addOns : []
  };
}

// Lấy sản phẩm từ query param
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

// Hiển thị toast thông báo
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;

  const toastId = 'toast_' + Date.now();
  const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
  const icon = type === 'success' ? 'bi-check-circle-fill' : type === 'error' ? 'bi-x-circle-fill' : 'bi-info-circle-fill';

  const toastHTML = `
    <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi ${icon} me-2"></i>${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
      </div>
    </div>
  `;

  toastContainer.insertAdjacentHTML('beforeend', toastHTML);
  const toastEl = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();

  toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

// Render số lượng giỏ hàng trên navbar
function updateCartBadge() {
  const cart = getFromStorage('cart', []);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  });
}

// Render số yêu thích
function updateWishlistBadge() {
  const wishlist = getFromStorage('wishlist', []);
  const badges = document.querySelectorAll('.wishlist-badge');
  badges.forEach(badge => {
    badge.textContent = wishlist.length;
    badge.style.display = wishlist.length > 0 ? 'flex' : 'none';
  });
}

// Render stars
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let stars = '';
  for (let i = 0; i < full; i++) stars += '<i class="bi bi-star-fill"></i>';
  if (half) stars += '<i class="bi bi-star-half"></i>';
  for (let i = 0; i < empty; i++) stars += '<i class="bi bi-star"></i>';
  return stars;
}

// Kiểm tra wishlist
function isInWishlist(productId) {
  const wishlist = getFromStorage('wishlist', []);
  return wishlist.includes(parseInt(productId));
}

// Toggle wishlist
function toggleWishlist(productId) {
  const id = parseInt(productId);
  let wishlist = getFromStorage('wishlist', []);
  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Đã xóa khỏi danh sách yêu thích', 'info');
  } else {
    wishlist.push(id);
    showToast('Đã thêm vào danh sách yêu thích ❤️');
  }
  saveToStorage('wishlist', wishlist);
  updateWishlistBadge();
  return wishlist.includes(id);
}
