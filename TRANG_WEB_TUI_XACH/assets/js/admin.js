// ===== ADMIN.JS =====

const orderStatuses = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã hoàn tất',
  cancelled: 'Đã hủy'
};

let editingProductId = null;
let uploadedImageData = '';

function isAdminSession() {
  const session = getFromStorage('mlSession', null);
  return session && session.role === 'admin';
}

function showAdminDashboard() {
  const adminGate = document.getElementById('adminGate');
  const adminDashboard = document.getElementById('adminDashboard');
  const logoutBtn = document.getElementById('logoutAdminBtn');
  if (adminGate) adminGate.style.display = 'none';
  if (adminDashboard) adminDashboard.style.display = 'block';
  if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  renderAdminProducts();
  renderAdminOrders();
  renderRevenueStats();
}

function showCustomerNoAccess() {
  const adminGate = document.getElementById('adminGate');
  const adminDashboard = document.getElementById('adminDashboard');
  const logoutBtn = document.getElementById('logoutAdminBtn');
  if (adminDashboard) adminDashboard.style.display = 'none';
  if (logoutBtn) logoutBtn.style.display = 'none';
  if (!adminGate) return;
  adminGate.style.display = 'block';
  adminGate.innerHTML = `
    <div class="section-subtitle">Customer Account</div>
    <h2>Không hiển thị khu vực Admin</h2>
    <p>Bạn đang đăng nhập bằng tài khoản khách hàng nên phần quản trị đã được ẩn khỏi menu và không thể truy cập trực tiếp.</p>
    <div class="d-flex flex-wrap gap-3 mt-4">
      <a class="btn-gold" href="index.html">Về trang chủ</a>
      <button class="btn-outline-custom" type="button" id="customerLogoutBtn">Đăng xuất</button>
    </div>
  `;
  document.getElementById('customerLogoutBtn')?.addEventListener('click', () => {
    saveToStorage('mlSession', null);
    window.location.href = 'login.html';
  });
}

function submitAdminGate(event) {
  event.preventDefault();
  const email = document.getElementById('adminGateEmail').value.trim();
  const password = document.getElementById('adminGatePassword').value;
  if (email === maisonDemoAccount.admin.email && password === maisonDemoAccount.admin.password) {
    saveToStorage('mlSession', {
      email,
      name: maisonDemoAccount.admin.name,
      role: 'admin',
      loginAt: new Date().toISOString()
    });
    showToast('Đăng nhập admin thành công.');
    showAdminDashboard();
    return;
  }
  document.getElementById('adminGateError').textContent = 'Sai thông tin admin demo.';
  document.getElementById('adminGateError').style.display = 'block';
}

function logoutAdmin() {
  saveToStorage('mlSession', null);
  window.location.href = 'login.html';
}

function saveProductsCatalog() {
  saveToStorage('mlProducts', products);
}

function getAdminProductValues() {
  const selectedTags = Array.from(document.querySelectorAll('[name="adminProductTag"]:checked')).map(input => input.value);
  const selectedAddOns = Array.from(document.querySelectorAll('[name="adminAddon"]:checked')).map(input => ({
    id: input.value,
    name: input.dataset.name,
    price: Number(input.dataset.price) || 0
  }));
  const flag = document.querySelector('[name="adminProductFlag"]:checked')?.value || 'normal';
  const status = document.querySelector('[name="adminProductStatus"]:checked')?.value || 'active';
  const color = document.getElementById('adminProductColor').value.trim();
  const size = document.getElementById('adminProductSize').value.trim();
  const image = uploadedImageData || document.getElementById('adminProductImage').value.trim();

  return {
    name: document.getElementById('adminProductName').value.trim(),
    category: document.getElementById('adminProductCategory').value,
    price: Number(document.getElementById('adminProductPrice').value),
    oldPrice: Number(document.getElementById('adminProductOldPrice').value) || null,
    stock: Number(document.getElementById('adminProductStock').value),
    image,
    gallery: [image].filter(Boolean),
    description: document.getElementById('adminProductDescription').value.trim(),
    material: document.getElementById('adminProductMaterial').value.trim(),
    color,
    size,
    sizes: [size, 'Mini', 'Standard'].filter(Boolean),
    colors: [{ name: color || 'Kem', hex: '#c9a227' }, { name: 'Đen', hex: '#1f1a17' }, { name: 'Nâu', hex: '#7a4e2d' }],
    stockStatus: status,
    isFeatured: flag === 'featured',
    isNew: flag === 'new',
    tags: selectedTags,
    addOns: selectedAddOns.length ? selectedAddOns : [
      { id: 'care', name: 'Bộ vệ sinh da/vải', price: 150000 }
    ]
  };
}

function validateAdminProduct(values) {
  if (values.name.length < 3) return 'Tên sản phẩm cần ít nhất 3 ký tự.';
  if (!values.category) return 'Vui lòng chọn danh mục.';
  if (!values.price || values.price < 10000) return 'Giá sản phẩm chưa hợp lệ.';
  if (Number.isNaN(values.stock) || values.stock < 0) return 'Tồn kho không hợp lệ.';
  if (!values.image) return 'Vui lòng nhập URL hình hoặc chọn file hình.';
  if (!values.description) return 'Vui lòng nhập mô tả sản phẩm.';
  return '';
}

function resetAdminProductForm() {
  editingProductId = null;
  uploadedImageData = '';
  document.getElementById('adminProductForm').reset();
  document.getElementById('adminProductSubmitText').textContent = 'Thêm sản phẩm';
  document.getElementById('adminImagePreview').innerHTML = '<i class="bi bi-image"></i><span>Chưa có hình</span>';
}

function submitAdminProduct(event) {
  event.preventDefault();
  const values = getAdminProductValues();
  const error = validateAdminProduct(values);
  if (error) {
    showToast(error, 'error');
    return;
  }

  if (editingProductId) {
    const index = products.findIndex(product => product.id === editingProductId);
    if (index > -1) {
      products[index] = {
        ...products[index],
        ...values,
        components: {
          'Dòng sản phẩm': document.getElementById('adminProductCategory').selectedOptions[0].textContent,
          'Chất liệu chính': values.material,
          'Lót trong': 'Microfiber mềm, chống xước vật dụng',
          'Phụ kiện': 'Khóa kéo kim loại, quai đeo điều chỉnh',
          'Bảo hành': '3 tháng lỗi sản xuất'
        }
      };
    }
    showToast('Đã cập nhật sản phẩm.');
  } else {
    const nextId = Math.max(...products.map(product => Number(product.id) || 0)) + 1;
    products.unshift({
      id: nextId,
      rating: 4.5,
      ...values,
      components: {
        'Dòng sản phẩm': document.getElementById('adminProductCategory').selectedOptions[0].textContent,
        'Chất liệu chính': values.material,
        'Lót trong': 'Microfiber mềm, chống xước vật dụng',
        'Phụ kiện': 'Khóa kéo kim loại, quai đeo điều chỉnh',
        'Bảo hành': '3 tháng lỗi sản xuất'
      }
    });
    showToast('Đã thêm sản phẩm mới.');
  }

  saveProductsCatalog();
  resetAdminProductForm();
  renderAdminProducts();
  renderRevenueStats();
}

function editProduct(productId) {
  const product = getProductById(productId);
  if (!product) return;
  editingProductId = Number(productId);
  uploadedImageData = '';
  document.getElementById('adminProductName').value = product.name;
  document.getElementById('adminProductCategory').value = product.category;
  document.getElementById('adminProductPrice').value = product.price;
  document.getElementById('adminProductOldPrice').value = product.oldPrice || '';
  document.getElementById('adminProductStock').value = product.stock;
  document.getElementById('adminProductImage').value = product.image;
  document.getElementById('adminProductMaterial').value = product.material;
  document.getElementById('adminProductColor').value = product.color;
  document.getElementById('adminProductSize').value = product.size;
  document.getElementById('adminProductDescription').value = product.description;
  document.querySelector(`[name="adminProductFlag"][value="${product.isFeatured ? 'featured' : product.isNew ? 'new' : 'normal'}"]`).checked = true;
  document.querySelector(`[name="adminProductStatus"][value="${product.stockStatus || 'active'}"]`).checked = true;
  document.querySelectorAll('[name="adminProductTag"]').forEach(input => {
    input.checked = (product.tags || []).includes(input.value);
  });
  document.getElementById('adminProductSubmitText').textContent = 'Cập nhật sản phẩm';
  document.getElementById('adminImagePreview').innerHTML = `<img src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" ${imageFallbackAttr()}>`;
  window.scrollTo({ top: document.getElementById('productFormPanel').offsetTop - 100, behavior: 'smooth' });
}

function deleteProduct(productId) {
  const product = getProductById(productId);
  if (!product || !confirm(`Xóa "${product.name}" khỏi catalog?`)) return;
  const index = products.findIndex(item => item.id === Number(productId));
  if (index > -1) products.splice(index, 1);
  saveProductsCatalog();
  renderAdminProducts();
  showToast('Đã xóa sản phẩm.', 'info');
}

function renderAdminProducts() {
  const tbody = document.getElementById('adminProductRows');
  if (!tbody) return;
  tbody.innerHTML = products.map(product => `
    <tr>
      <td><img src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" class="admin-thumb" ${imageFallbackAttr()}></td>
      <td>
        <strong>${escapeHTML(product.name)}</strong>
        <span>${escapeHTML(product.material)} | ${escapeHTML(product.color)} | ${escapeHTML(product.size)}</span>
      </td>
      <td>${escapeHTML(product.category)}</td>
      <td>${formatPrice(product.price)}</td>
      <td>${product.stock}</td>
      <td>${product.isFeatured ? 'Nổi bật' : product.isNew ? 'Mới' : 'Thường'}</td>
      <td>
        <button class="icon-btn" onclick="editProduct(${product.id})" title="Sửa"><i class="bi bi-pencil"></i></button>
        <button class="icon-btn danger" onclick="deleteProduct(${product.id})" title="Xóa"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function getOrders() {
  return getFromStorage('mlOrders', []);
}

function saveOrders(orders) {
  saveToStorage('mlOrders', orders);
}

function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const order = orders.find(item => item.id === orderId);
  if (!order) return;
  order.status = status;
  order.updatedAt = new Date().toISOString();
  saveOrders(orders);
  renderAdminOrders();
  renderRevenueStats();
  showToast(`Đã cập nhật đơn ${orderId}: ${orderStatuses[status]}`);
}

function renderAdminOrders() {
  const tbody = document.getElementById('adminOrderRows');
  const empty = document.getElementById('adminOrderEmpty');
  if (!tbody) return;
  const orders = getOrders();
  empty.style.display = orders.length ? 'none' : 'block';
  tbody.innerHTML = orders.map(order => `
    <tr>
      <td><strong>${order.id}</strong><span>${order.orderDate || ''}</span></td>
      <td>${escapeHTML(order.fullname)}<span>${escapeHTML(order.phone)}</span></td>
      <td>${order.items.length} sản phẩm</td>
      <td>${formatPrice(order.total || 0)}</td>
      <td>
        <select class="admin-status-select" onchange="updateOrderStatus('${order.id}', this.value)">
          ${Object.entries(orderStatuses).map(([value, label]) => `
            <option value="${value}" ${order.status === value ? 'selected' : ''}>${label}</option>
          `).join('')}
        </select>
      </td>
      <td>${escapeHTML(order.payment || 'cod')}</td>
    </tr>
  `).join('');
}

function renderRevenueStats() {
  const orders = getOrders();
  const validOrders = orders.filter(order => order.status !== 'cancelled');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const revenue = validOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const deliveredRevenue = deliveredOrders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const units = validOrders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  document.getElementById('statRevenue').textContent = formatPrice(revenue);
  document.getElementById('statDelivered').textContent = formatPrice(deliveredRevenue);
  document.getElementById('statOrders').textContent = orders.length;
  document.getElementById('statUnits').textContent = units;

  const statusWrap = document.getElementById('statusBreakdown');
  statusWrap.innerHTML = Object.entries(orderStatuses).map(([status, label]) => {
    const count = orders.filter(order => order.status === status).length;
    const percent = orders.length ? Math.round(count / orders.length * 100) : 0;
    return `
      <div class="status-bar-row">
        <span>${label}</span>
        <div><i style="width:${percent}%"></i></div>
        <strong>${count}</strong>
      </div>
    `;
  }).join('');
}

function initAdminImageUpload() {
  const file = document.getElementById('adminProductFile');
  const imageUrl = document.getElementById('adminProductImage');
  const preview = document.getElementById('adminImagePreview');

  imageUrl.addEventListener('input', () => {
    uploadedImageData = '';
    const value = imageUrl.value.trim();
    preview.innerHTML = value ? `<img src="${value}" alt="Preview">` : '<i class="bi bi-image"></i><span>Chưa có hình</span>';
  });

  file.addEventListener('change', () => {
    const selected = file.files?.[0];
    if (!selected) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImageData = reader.result;
      preview.innerHTML = `<img src="${uploadedImageData}" alt="Preview">`;
    };
    reader.readAsDataURL(selected);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const session = getFromStorage('mlSession', null);
  const logoutBtn = document.getElementById('logoutAdminBtn');
  if (logoutBtn) logoutBtn.style.display = 'none';

  if (session && session.role !== 'admin') {
    showCustomerNoAccess();
    return;
  }

  document.getElementById('adminGateForm')?.addEventListener('submit', submitAdminGate);
  document.getElementById('logoutAdminBtn')?.addEventListener('click', logoutAdmin);
  document.getElementById('adminProductForm')?.addEventListener('submit', submitAdminProduct);
  document.getElementById('resetProductForm')?.addEventListener('click', resetAdminProductForm);
  initAdminImageUpload();

  if (isAdminSession()) {
    showAdminDashboard();
  }
});
