// ===== CHECKOUT.JS =====

function renderCheckoutSummary() {
  const cart = getFromStorage('cart', []).map(normalizeCartItem).filter(Boolean);
  const checkoutInfo = getFromStorage('checkoutInfo');
  const summaryEl = document.getElementById('orderSummary');

  if (!summaryEl) return;

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + getCheckoutItemTotal(item), 0);
  let discountAmount = 0, discountPercent = 0, discountCode = '', shipping = subtotal >= 500000 ? 0 : 30000, total = 0;

  if (checkoutInfo) {
    discountAmount = checkoutInfo.discountAmount || 0;
    discountPercent = checkoutInfo.discountPercent || 0;
    discountCode = checkoutInfo.discountCode || '';
    shipping = typeof checkoutInfo.shipping === 'number' ? checkoutInfo.shipping : shipping;
  }
  total = Math.max(0, subtotal - discountAmount + shipping);

  summaryEl.innerHTML = `
    <h4 style="font-family:var(--font-display);font-size:1.2rem;margin-bottom:1.2rem;">Đơn Hàng (${cart.length} sản phẩm)</h4>
    <div style="max-height:280px;overflow-y:auto;margin-bottom:1.2rem;">
      ${cart.map(item => `
        <div class="d-flex gap-3 align-items-start mb-3">
          <img src="${safeImageURL(item.image)}" alt="${escapeHTML(item.name)}" style="width:56px;height:70px;object-fit:cover;border:1px solid var(--border);" ${imageFallbackAttr()}>
          <div class="flex-grow-1">
            <div style="font-size:0.9rem;font-weight:500;">${item.name}</div>
            <div style="font-size:0.8rem;color:var(--muted);">SL: ${item.quantity} | ${escapeHTML(item.size)} | ${escapeHTML(item.color)}</div>
            ${(item.addOns || []).length ? `<div style="font-size:0.76rem;color:var(--secondary);">${item.addOns.map(addon => escapeHTML(addon.name)).join(', ')}</div>` : ''}
          </div>
          <div style="font-size:0.88rem;font-weight:500;white-space:nowrap;">${formatPrice(getCheckoutItemTotal(item))}</div>
        </div>
      `).join('')}
    </div>
    <div style="border-top:1px solid var(--border);padding-top:1rem;">
      <div class="d-flex justify-content-between mb-2" style="font-size:0.85rem;">
        <span style="color:var(--muted);">Tạm tính</span>
        <span>${formatPrice(subtotal)}</span>
      </div>
      ${discountAmount > 0 ? `
        <div class="d-flex justify-content-between mb-2" style="font-size:0.85rem;color:var(--success);">
          <span>Giảm giá (${discountCode})</span>
          <span>-${formatPrice(discountAmount)}</span>
        </div>
      ` : ''}
      <div class="d-flex justify-content-between mb-2" style="font-size:0.85rem;">
        <span style="color:var(--muted);">Phí vận chuyển</span>
        <span>${shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
      </div>
      <div class="d-flex justify-content-between" style="font-family:var(--font-display);font-size:1.3rem;padding-top:0.8rem;border-top:1px solid var(--border);">
        <span>Tổng Cộng</span>
        <span style="color:var(--secondary);">${formatPrice(total)}</span>
      </div>
    </div>
  `;
}

function getCheckoutItemTotal(item) {
  const addonTotal = (item.addOns || []).reduce((sum, addon) => sum + (Number(addon.price) || 0), 0);
  return (Number(item.price) + addonTotal) * item.quantity;
}

// Validation helpers
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.classList.add('is-invalid');
  if (error) {
    error.textContent = message;
    error.classList.add('show');
  }
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.classList.remove('is-invalid');
  if (error) error.classList.remove('show');
}

function clearAllErrors() {
  document.querySelectorAll('.form-control-custom').forEach(f => f.classList.remove('is-invalid'));
  document.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));
}

// Validate checkout form
function validateCheckoutForm() {
  clearAllErrors();
  let isValid = true;

  const fullname = document.getElementById('fullname')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  const address = document.getElementById('address')?.value.trim();
  const city = document.getElementById('city')?.value;

  if (!fullname || fullname.length < 3) {
    showError('fullname', 'Vui lòng nhập họ tên (ít nhất 3 ký tự)');
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Email không đúng định dạng');
    isValid = false;
  }

  if (!phone || !/^(0[3-9][0-9]{8}|0[1-9][0-9]{9})$/.test(phone)) {
    showError('phone', 'Số điện thoại không hợp lệ (VD: 0901234567)');
    isValid = false;
  }

  if (!address || address.length < 10) {
    showError('address', 'Vui lòng nhập địa chỉ đầy đủ (ít nhất 10 ký tự)');
    isValid = false;
  }

  if (!city) {
    showError('city', 'Vui lòng chọn tỉnh/thành phố');
    isValid = false;
  }

  const paymentEl = document.querySelector('[name="payment"]:checked');
  if (!paymentEl) {
    showToast('Vui lòng chọn phương thức thanh toán', 'error');
    isValid = false;
  }

  return isValid;
}

function submitOrder(e) {
  e.preventDefault();

  if (!validateCheckoutForm()) return;
  const cart = getFromStorage('cart', []).map(normalizeCartItem).filter(Boolean);
  if (!cart.length) {
    showToast('Giỏ hàng trống, vui lòng chọn sản phẩm trước', 'error');
    return;
  }

  const stockIssue = cart.find(item => item.quantity > getProductStock(item.id));
  if (stockIssue) {
    showToast(`"${stockIssue.name}" chỉ còn ${getProductStock(stockIssue.id)} sản phẩm`, 'error');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + getCheckoutItemTotal(item), 0);
  const checkoutInfo = getFromStorage('checkoutInfo', {});
  const discountAmount = Number(checkoutInfo.discountAmount) || 0;
  const shipping = typeof checkoutInfo.shipping === 'number' ? checkoutInfo.shipping : (subtotal >= 500000 ? 0 : 30000);
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const orderData = {
    id: 'HUIT' + Date.now().toString().slice(-6),
    fullname: document.getElementById('fullname').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    address: document.getElementById('address').value.trim(),
    city: document.getElementById('city').value,
    district: document.getElementById('district')?.value.trim() || '',
    note: document.getElementById('note')?.value.trim(),
    payment: document.querySelector('[name="payment"]:checked')?.value,
    orderDate: new Date().toLocaleDateString('vi-VN'),
    createdAt: new Date().toISOString(),
    status: 'pending',
    items: cart,
    subtotal,
    discountAmount,
    discountCode: checkoutInfo.discountCode || '',
    shipping,
    total
  };

  const orders = getFromStorage('mlOrders', []);
  orders.unshift(orderData);
  saveToStorage('mlOrders', orders);
  saveToStorage('lastOrder', { ...orderData, orderId: orderData.id });
  reduceStockAfterOrder(cart);

  // Clear cart
  saveToStorage('cart', []);
  saveToStorage('checkoutInfo', null);
  updateCartBadge();

  // Show success modal
  const modal = document.getElementById('successModal');
  const orderIdEl = document.getElementById('orderId');
  if (orderIdEl) orderIdEl.textContent = orderData.id;

  if (modal) {
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }
}

function reduceStockAfterOrder(cart) {
  cart.forEach(item => {
    const product = getProductById(item.id);
    if (product) product.stock = Math.max(0, (Number(product.stock) || 0) - item.quantity);
  });
  saveToStorage('mlProducts', products);
}

// Init live validation
function initLiveValidation() {
  const fields = ['fullname', 'email', 'phone', 'address', 'city'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearError(id));
      el.addEventListener('change', () => clearError(id));
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  initLiveValidation();

  const form = document.getElementById('checkoutForm');
  if (form) form.addEventListener('submit', submitOrder);
});
