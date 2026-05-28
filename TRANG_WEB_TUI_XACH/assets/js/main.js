// ===== MAIN.JS - Xử lý chung cho toàn site =====

// Inject navbar
function renderNavbar(activePage = '') {
  const session = getFromStorage('mlSession', null);
  const isAdmin = session && session.role === 'admin';
  const adminNavItem = isAdmin ? `
            <li class="nav-item">
              <a class="nav-link-custom ${activePage === 'admin' ? 'active' : ''}" href="admin.html">Admin</a>
            </li>` : '';

  const navHTML = `
    <div class="navbar-top d-none d-md-block">
      <div class="container">
        <span>Miễn phí vận chuyển cho đơn hàng trên 500.000đ</span>
        <span class="mx-3">|</span>
        <span>Hotline: <a href="tel:0901234567">0901 234 567</a></span>
      </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-custom">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <span class="navbar-brand-text">HUIT</span>
          <span class="navbar-brand-sub">Pure Timeless Bags</span>
        </a>

        <div class="d-flex align-items-center gap-2 order-lg-3 nav-icons">
          <form class="nav-search d-none d-xl-flex" id="globalSearchForm">
            <input id="globalSearchInput" type="search" placeholder="Tìm túi..." aria-label="Tìm kiếm sản phẩm">
            <button type="submit" title="Tìm kiếm"><i class="bi bi-search"></i></button>
          </form>
          <a href="${session ? (session.role === 'admin' ? 'admin.html' : 'register.html') : 'login.html'}" title="${session ? 'Tài khoản' : 'Đăng nhập'}" class="position-relative">
            <i class="bi bi-person"></i>
          </a>
          <a href="wishlist.html" title="Yêu thích" class="position-relative">
            <i class="bi bi-heart"></i>
            <span class="wishlist-badge" style="display:none">0</span>
          </a>
          <a href="cart.html" title="Giỏ hàng" class="position-relative">
            <i class="bi bi-bag"></i>
            <span class="cart-badge" style="display:none">0</span>
          </a>
          <button class="navbar-toggler border-0 ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <i class="bi bi-list fs-4"></i>
          </button>
        </div>

        <div class="collapse navbar-collapse order-lg-2" id="mainNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <a class="nav-link-custom ${activePage === 'home' ? 'active' : ''}" href="index.html">Trang Chủ</a>
            </li>
            <li class="nav-item dropdown nav-dropdown">
              <a class="nav-link-custom ${activePage === 'products' ? 'active' : ''}" href="products.html">
                Sản Phẩm
              </a>
              <ul class="dropdown-menu luxury-dropdown">
                <li><a class="dropdown-item" href="products.html">Tất cả sản phẩm</a></li>
                <li><a class="dropdown-item" href="products.html?cat=tote">Túi Tote</a></li>
                <li><a class="dropdown-item" href="products.html?cat=crossbody">Túi Đeo Chéo</a></li>
                <li><a class="dropdown-item" href="products.html?cat=office">Túi Công Sở</a></li>
                <li><a class="dropdown-item" href="products.html?cat=clutch">Clutch</a></li>
                <li><a class="dropdown-item" href="products.html?cat=backpack">Balo Mini</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link-custom ${activePage === 'news' ? 'active' : ''}" href="news.html">Tin Tức</a>
            </li>
            <li class="nav-item dropdown nav-dropdown">
              <a class="nav-link-custom ${['about','faq','contact','policy'].includes(activePage) ? 'active' : ''}" href="about.html">
                HUIT
              </a>
              <ul class="dropdown-menu luxury-dropdown">
                <li><a class="dropdown-item" href="about.html">Giới Thiệu</a></li>
                <li><a class="dropdown-item" href="faq.html">FAQ</a></li>
                <li><a class="dropdown-item" href="policy.html">Chính Sách</a></li>
                <li><a class="dropdown-item" href="contact.html">Liên Hệ</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link-custom ${activePage === 'register' ? 'active' : ''}" href="register.html">Đăng Ký</a>
            </li>
            ${adminNavItem}
          </ul>
        </div>
      </div>
    </nav>
  `;

  const navContainer = document.getElementById('navbar-container');
  if (navContainer) navContainer.innerHTML = navHTML;
  initGlobalSearch();
  initNavigationLinks();
}

// Inject footer
function renderFooter() {
  const footerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-4 col-md-6">
            <div class="footer-brand mb-1">HUIT</div>
            <div class="footer-tagline">Pure Timeless Bags</div>
            <p class="footer-desc">HUIT mang đến những mẫu túi xách tinh giản, thanh lịch, đề cao vẻ đẹp thuần khiết và khả năng đồng hành bền bỉ theo thời gian.</p>
            <div class="social-links mt-3">
              <a href="#"><i class="bi bi-facebook"></i></a>
              <a href="#"><i class="bi bi-instagram"></i></a>
              <a href="#"><i class="bi bi-tiktok"></i></a>
              <a href="#"><i class="bi bi-youtube"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-6">
            <div class="footer-heading">Danh Mục</div>
            <ul class="footer-links">
              <li><a href="products.html?cat=tote">Túi Tote</a></li>
              <li><a href="products.html?cat=crossbody">Túi Đeo Chéo</a></li>
              <li><a href="products.html?cat=office">Túi Công Sở</a></li>
              <li><a href="products.html?cat=clutch">Clutch</a></li>
              <li><a href="products.html?cat=backpack">Balo Mini</a></li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 col-6">
            <div class="footer-heading">Hỗ Trợ</div>
            <ul class="footer-links">
              <li><a href="news.html">Tin Tức</a></li>
              <li><a href="faq.html">FAQ</a></li>
              <li><a href="policy.html">Chính Sách Đổi Trả</a></li>
              <li><a href="policy.html#shipping">Chính Sách Vận Chuyển</a></li>
              <li><a href="policy.html#privacy">Bảo Mật Thông Tin</a></li>
              <li><a href="contact.html">Liên Hệ</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6">
            <div class="footer-heading">Liên Hệ</div>
            <div class="footer-contact-item">
              <i class="bi bi-geo-alt"></i>
              <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div class="footer-contact-item">
              <i class="bi bi-telephone"></i>
              <span>0901 234 567</span>
            </div>
            <div class="footer-contact-item">
              <i class="bi bi-envelope"></i>
              <span>hello@huit.vn</span>
            </div>
            <div class="footer-contact-item">
              <i class="bi bi-clock"></i>
              <span>T2 - T7: 9:00 - 21:00</span>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 HUIT. Tất cả quyền được bảo lưu.</p>
          <div class="d-flex gap-3">
            <a href="policy.html" style="color:rgba(255,255,255,0.35);font-size:0.78rem;">Điều Khoản</a>
            <a href="policy.html#privacy" style="color:rgba(255,255,255,0.35);font-size:0.78rem;">Bảo Mật</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) footerContainer.innerHTML = footerHTML;
}

// Toast container
function injectToastContainer() {
  if (!document.getElementById('toastContainer')) {
    const div = document.createElement('div');
    div.id = 'toastContainer';
    document.body.appendChild(div);
  }
}

// Back to top button
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
  btn.title = 'Lên đầu trang';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 10);
  });
}

function initGlobalSearch() {
  const form = document.getElementById('globalSearchForm');
  const input = document.getElementById('globalSearchInput');
  if (!form || !input || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const keyword = input.value.trim();
    window.location.href = keyword ? `products.html?search=${encodeURIComponent(keyword)}` : 'products.html';
  });
}

// Giữ các tab/menu chính luôn chuyển trang được.
// Trước đây Bootstrap dropdown dùng data-bs-toggle nên click "Sản Phẩm"/"HUIT" chỉ mở menu, không đi đến file HTML.
function initNavigationLinks() {
  document.querySelectorAll('a[href$=".html"], a[href*=".html?"]').forEach(link => {
    if (link.dataset.linkBound === 'true') return;
    link.dataset.linkBound = 'true';
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      // Nếu thư viện nào đó chặn nhầm link, điều hướng thủ công để các file vẫn liên kết với nhau.
      window.setTimeout(() => {
        if (document.activeElement === link) window.location.href = href;
      }, 0);
    });
  });
}

function initScrollReveal() {
  const targets = document.querySelectorAll('.product-card, .category-card, .testimonial-card, .news-card, .stat-card, .feature-item, .admin-panel, .report-panel');
  if (!targets.length) return;

  targets.forEach((target, index) => {
    target.classList.add('reveal-on-scroll');
    target.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  targets.forEach(target => observer.observe(target));
}

// Thêm vào giỏ hàng (dùng chung)
function addToCart(productId, quantity = 1, options = {}) {
  const product = getProductById(productId);
  if (!product) return;

  const requestedQty = Math.max(1, Number(quantity) || 1);
  const stock = Number(product.stock) || 0;
  if (stock <= 0) {
    showToast('Sản phẩm đã hết hàng', 'error');
    return;
  }

  let cart = getFromStorage('cart', []).map(normalizeCartItem).filter(Boolean);
  const size = options.size || product.sizes?.[0] || product.size;
  const color = options.color || product.colors?.[0]?.name || product.color;
  const addOns = Array.isArray(options.addOns) ? options.addOns : [];
  const existingIndex = cart.findIndex(item =>
    item.id === product.id &&
    item.size === size &&
    item.color === color &&
    JSON.stringify(item.addOns || []) === JSON.stringify(addOns)
  );
  const currentQtyForProduct = cart.reduce((sum, item) => item.id === product.id ? sum + item.quantity : sum, 0);
  const allowedQty = Math.min(requestedQty, stock - currentQtyForProduct);

  if (allowedQty <= 0) {
    showToast(`Giỏ hàng đã đạt tối đa tồn kho của "${product.name}"`, 'error');
    saveToStorage('cart', cart);
    updateCartBadge();
    return;
  }

  if (existingIndex > -1) {
    cart[existingIndex].quantity += allowedQty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: allowedQty,
      category: product.category,
      size,
      color,
      addOns
    });
  }

  saveToStorage('cart', cart);
  updateCartBadge();
  showToast(`Đã thêm ${allowedQty} "${product.name}" vào giỏ hàng`);
}

// Init toàn site
document.addEventListener('DOMContentLoaded', () => {
  injectToastContainer();
  initBackToTop();
  initNavbarScroll();
  initGlobalSearch();
  updateCartBadge();
  updateWishlistBadge();
  window.setTimeout(initScrollReveal, 80);
});
