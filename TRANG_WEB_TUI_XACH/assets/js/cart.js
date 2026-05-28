// ===== CART.JS =====

let appliedDiscount = 0;
let appliedCode = '';

function getCart() {
  const cart = getFromStorage('cart', []).map(normalizeCartItem).filter(Boolean);
  saveToStorage('cart', cart);
  return cart;
}

function saveCart(cart) {
  saveToStorage('cart', cart);
  updateCartBadge();
}

function calculateSubtotal(cart) {
  return cart.reduce((sum, item) => sum + getCartItemTotal(item), 0);
}

function getCartItemTotal(item) {
  const addonTotal = (item.addOns || []).reduce((sum, addon) => sum + (Number(addon.price) || 0), 0);
  return (Number(item.price) + addonTotal) * item.quantity;
}

function renderCart() {
  const cart = getCart();
  const cartContent = document.getElementById('cartContent');
  const cartEmpty = document.getElementById('cartEmpty');
  const cartFull = document.getElementById('cartFull');

  if (!cartContent) return;

  if (cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'block';
    if (cartFull) cartFull.style.display = 'none';
    return;
  }

  if (cartEmpty) cartEmpty.style.display = 'none';
  if (cartFull) cartFull.style.display = 'block';

  // Render cart items
  const tbody = document.getElementById('cartBody');
  if (tbody) {
    tbody.innerHTML = cart.map(item => `
      <tr>
        <td data-label="Sản phẩm">
          <div class="d-flex align-items-center gap-3">
            <img src="${safeImageURL(item.image)}" alt="${escapeHTML(item.name)}" class="cart-product-img" ${imageFallbackAttr()}>
            <div>
              <div class="cart-product-name">${item.name}</div>
              <div style="font-size:0.78rem;color:var(--muted);">Mã: SP-${String(item.id).padStart(3,'0')}</div>
              <div style="font-size:0.76rem;color:var(--muted);">Size: ${escapeHTML(item.size)} | Màu: ${escapeHTML(item.color)}</div>
              ${(item.addOns || []).length ? `<div style="font-size:0.76rem;color:var(--secondary);">${item.addOns.map(addon => escapeHTML(addon.name)).join(', ')}</div>` : ''}
            </div>
          </div>
        </td>
        <td data-label="Đơn giá">${formatPrice(item.price)}</td>
        <td data-label="Số lượng">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)"><i class="bi bi-dash"></i></button>
            <input type="number" value="${item.quantity}" min="1" class="qty-input"
              onchange="setQty(${item.id}, this.value)">
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)"><i class="bi bi-plus"></i></button>
          </div>
        </td>
        <td data-label="Thành tiền">
          <strong>${formatPrice(getCartItemTotal(item))}</strong>
        </td>
        <td data-label="">
          <button class="cart-remove" onclick="removeItem(${item.id})" title="Xóa">
            <i class="bi bi-x-lg"></i>
          </button>
        </td>
      </tr>
    `).join('');
  }

  updateSummary(cart);
}

function updateSummary(cart) {
  const subtotal = calculateSubtotal(cart);
  const discountAmount = Math.round(subtotal * appliedDiscount / 100);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal - discountAmount + shipping;

  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discountRow');
  const discountAmtEl = document.getElementById('discountAmount');
  const shippingEl = document.getElementById('shippingFee');
  const totalEl = document.getElementById('totalAmount');

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Miễn phí' : formatPrice(shipping);
  if (totalEl) totalEl.textContent = formatPrice(total);

  if (discountEl) {
    if (appliedDiscount > 0) {
      discountEl.style.display = 'flex';
      if (discountAmtEl) discountAmtEl.textContent = `-${formatPrice(discountAmount)}`;
    } else {
      discountEl.style.display = 'none';
    }
  }

  // Shipping notice
  const shippingNotice = document.getElementById('shippingNotice');
  if (shippingNotice) {
    if (shipping === 0) {
      shippingNotice.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i>Bạn được miễn phí vận chuyển!';
      shippingNotice.style.color = 'var(--success)';
    } else {
      const needed = 500000 - subtotal;
      shippingNotice.innerHTML = `<i class="bi bi-info-circle me-1"></i>Mua thêm ${formatPrice(needed)} để miễn phí ship`;
      shippingNotice.style.color = 'var(--secondary)';
    }
  }
}

function updateQty(productId, delta) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  cart[index].quantity += delta;
  const stock = getProductStock(productId);
  if (cart[index].quantity > stock) {
    cart[index].quantity = stock;
    showToast(`Chỉ còn ${stock} sản phẩm trong kho`, 'error');
  }
  if (cart[index].quantity <= 0) {
    if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = 1;
    }
  }

  saveCart(cart);
  renderCart();
}

function setQty(productId, value) {
  let cart = getCart();
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  let qty = parseInt(value);
  if (isNaN(qty) || qty < 1) qty = 1;
  const stock = getProductStock(productId);
  if (qty > stock) {
    qty = stock;
    showToast(`Không thể vượt quá tồn kho (${stock})`, 'error');
  }
  cart[index].quantity = qty;

  saveCart(cart);
  renderCart();
}

function removeItem(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
  showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
}

function clearCart() {
  if (!confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) return;
  saveCart([]);
  renderCart();
  showToast('Đã xóa toàn bộ giỏ hàng', 'info');
}

function applyCoupon() {
  const codeInput = document.getElementById('couponInput');
  if (!codeInput) return;

  const code = codeInput.value.trim().toUpperCase();
  if (!code) {
    showToast('Vui lòng nhập mã giảm giá', 'error');
    return;
  }

  if (discountCodes && discountCodes[code]) {
    appliedDiscount = discountCodes[code];
    appliedCode = code;
    showToast(`Áp dụng mã "${code}" thành công! Giảm ${appliedDiscount}%`);
    updateSummary(getCart());

    const couponMsg = document.getElementById('couponMsg');
    if (couponMsg) {
      couponMsg.textContent = `✓ Mã "${code}" đã được áp dụng (-${appliedDiscount}%)`;
      couponMsg.style.color = 'var(--success)';
    }
  } else {
    showToast('Mã giảm giá không hợp lệ hoặc đã hết hạn', 'error');
    appliedDiscount = 0;
    appliedCode = '';
    updateSummary(getCart());

    const couponMsg = document.getElementById('couponMsg');
    if (couponMsg) {
      couponMsg.textContent = 'Mã giảm giá không hợp lệ';
      couponMsg.style.color = 'var(--danger)';
    }
  }
}

function proceedToCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Giỏ hàng trống!', 'error');
    return;
  }
  const invalidItem = cart.find(item => item.quantity > getProductStock(item.id));
  if (invalidItem) {
    showToast(`Số lượng "${invalidItem.name}" vượt tồn kho. Vui lòng cập nhật giỏ hàng.`, 'error');
    renderCart();
    return;
  }

  // Save checkout info to storage
  const subtotal = calculateSubtotal(cart);
  const discountAmount = Math.round(subtotal * appliedDiscount / 100);
  const shipping = subtotal >= 500000 ? 0 : 30000;
  const total = subtotal - discountAmount + shipping;

  saveToStorage('checkoutInfo', {
    subtotal,
    discountAmount,
    discountCode: appliedCode,
    discountPercent: appliedDiscount,
    shipping,
    total
  });

  window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', renderCart);
