// ===== ZOOM.JS – Zoom ảnh sản phẩm =====


(function () {

  // ========== STYLES ==========
  const style = document.createElement('style');
  style.textContent = `
    /* --- Zoom wrapper --- */
    .zoom-wrapper {
      position: relative;
      overflow: hidden;
      cursor: zoom-in;
      background: var(--cream, #EFF6FF);
      user-select: none;
    }

    /* Lens kính lúp nhỏ hiện trên ảnh */
    .zoom-lens {
      position: absolute;
      width: 120px;
      height: 120px;
      border: 2px solid var(--secondary, #38BDF8);
      background: rgba(37,99,235,0.08);
      pointer-events: none;
      display: none;
      z-index: 10;
      box-shadow: 0 0 0 9999px rgba(0,0,0,0.04);
    }

    /* Preview phóng to ở bên phải */
    .zoom-preview {
      position: absolute;
      top: 0;
      left: calc(100% + 16px);
      width: 380px;
      height: 380px;
      border: 1px solid var(--border, #D7E3F4);
      background-color: var(--cream, #EFF6FF);
      background-repeat: no-repeat;
      display: none;
      z-index: 100;
      pointer-events: none;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    }

    /* Chỉ hiện preview trên lg trở lên */
    @media (max-width: 1199px) {
      .zoom-preview { display: none !important; }
    }

    .zoom-wrapper:hover .zoom-lens,
    .zoom-wrapper:hover .zoom-preview {
      display: block;
    }

    /* Badge zoom hint */
    .zoom-hint {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0,0,0,0.55);
      color: #fff;
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      padding: 4px 10px;
      pointer-events: none;
      z-index: 5;
      opacity: 1;
      transition: opacity 0.3s;
    }

    .zoom-wrapper:hover .zoom-hint {
      opacity: 0;
    }

    /* --- Lightbox --- */
    .ml-lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.92);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s;
    }

    .ml-lightbox.open {
      opacity: 1;
      pointer-events: all;
    }

    .ml-lightbox-inner {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .ml-lightbox-img {
      max-width: 80vw;
      max-height: 85vh;
      object-fit: contain;
      display: block;
      transform: scale(0.95);
      transition: transform 0.3s;
    }

    .ml-lightbox.open .ml-lightbox-img {
      transform: scale(1);
    }

    .ml-lightbox-close {
      position: absolute;
      top: -44px;
      right: 0;
      width: 36px; height: 36px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
      line-height: 1;
    }

    .ml-lightbox-close:hover {
      background: rgba(37,99,235,0.25);
    }

    .ml-lightbox-nav {
      width: 44px; height: 44px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 50%;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s;
    }

    .ml-lightbox-nav:hover {
      background: rgba(37,99,235,0.22);
      border-color: rgba(37,99,235,0.45);
    }

    .ml-lightbox-nav:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }

    .ml-lightbox-dots {
      position: absolute;
      bottom: -36px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 6px;
    }

    .ml-lightbox-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      cursor: pointer;
      transition: background 0.2s;
      border: none;
      padding: 0;
    }

    .ml-lightbox-dot.active {
      background: #38BDF8;
    }

    /* Zoom inside lightbox on scroll */
    .ml-lightbox-img.zoomed {
      cursor: zoom-out;
      max-width: none;
      max-height: none;
    }

    .ml-lightbox-counter {
      position: absolute;
      top: -44px;
      left: 0;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.1em;
    }

    /* --- Sticky Mobile CTA --- */
    .ml-sticky-cta {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      border-top: 1px solid #D7E3F4;
      padding: 12px 16px;
      display: none;
      align-items: center;
      gap: 10px;
      z-index: 9000;
      box-shadow: 0 -4px 16px rgba(0,0,0,0.08);
      transform: translateY(100%);
      transition: transform 0.3s;
    }

    .ml-sticky-cta.visible {
      transform: translateY(0);
    }

    @media (max-width: 767px) {
      .ml-sticky-cta { display: flex; }
    }

    .ml-sticky-img {
      width: 44px; height: 54px;
      object-fit: cover;
      border: 1px solid #D7E3F4;
      flex-shrink: 0;
    }

    .ml-sticky-info { flex: 1; min-width: 0; }
    .ml-sticky-name {
      font-size: 0.82rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #0B1F3A;
    }
    .ml-sticky-price {
      font-size: 0.88rem;
      color: #38BDF8;
      font-weight: 600;
    }

    .ml-sticky-btn {
      background: #0B1F3A;
      color: #fff;
      border: none;
      padding: 12px 18px;
      font-size: 0.8rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      font-family: inherit;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: background 0.2s;
    }

    .ml-sticky-btn:hover { background: #38BDF8; }

    /* Ẩn sticky khi đã scroll qua nút gốc */
    .detail-main-img { cursor: zoom-in !important; }
  `;
  document.head.appendChild(style);

  // ========== LIGHTBOX ==========
  let lightboxGallery = [];
  let lightboxIndex = 0;
  let lightboxZoomed = false;

  function createLightbox() {
    const lb = document.createElement('div');
    lb.className = 'ml-lightbox';
    lb.id = 'mlLightbox';
    lb.innerHTML = `
      <div class="ml-lightbox-inner">
        <button class="ml-lightbox-close" id="lbClose" title="Đóng (Esc)">&#x2715;</button>
        <span class="ml-lightbox-counter" id="lbCounter"></span>
        <button class="ml-lightbox-nav" id="lbPrev">&#8249;</button>
        <img class="ml-lightbox-img" id="lbImg" src="" alt="Product zoom">
        <button class="ml-lightbox-nav" id="lbNext">&#8250;</button>
        <div class="ml-lightbox-dots" id="lbDots"></div>
      </div>
    `;
    document.body.appendChild(lb);

    document.getElementById('lbClose').onclick = closeLightbox;
    document.getElementById('lbPrev').onclick = () => navigateLightbox(-1);
    document.getElementById('lbNext').onclick = () => navigateLightbox(1);
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Scroll to zoom inside lightbox
    document.getElementById('lbImg').addEventListener('wheel', (e) => {
      e.preventDefault();
      const img = e.target;
      if (e.deltaY < 0) {
        img.style.transform = 'scale(1.8)';
        img.style.cursor = 'zoom-out';
        lightboxZoomed = true;
      } else {
        img.style.transform = 'scale(1)';
        img.style.cursor = 'zoom-in';
        lightboxZoomed = false;
      }
    });

    // Touch swipe
    let touchStartX = 0;
    lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
    lb.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? 1 : -1);
    });
  }

  function openLightbox(gallery, index) {
    lightboxGallery = gallery;
    lightboxIndex = index;
    const lb = document.getElementById('mlLightbox');
    if (!lb) return;

    updateLightboxImage();

    // Render dots
    const dots = document.getElementById('lbDots');
    dots.innerHTML = gallery.map((_, i) =>
      `<button class="ml-lightbox-dot ${i === index ? 'active' : ''}" onclick="window._lbGoTo(${i})"></button>`
    ).join('');

    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxImage() {
    const img = document.getElementById('lbImg');
    const counter = document.getElementById('lbCounter');
    const prev = document.getElementById('lbPrev');
    const next = document.getElementById('lbNext');
    const dots = document.querySelectorAll('.ml-lightbox-dot');

    // Load high-res image
    const src = lightboxGallery[lightboxIndex];
    const hiRes = src.replace('w=200', 'w=1200').replace('w=300', 'w=1200').replace('w=500', 'w=1200');
    img.src = hiRes;
    img.style.transform = 'scale(1)';
    lightboxZoomed = false;

    counter.textContent = `${lightboxIndex + 1} / ${lightboxGallery.length}`;
    prev.disabled = lightboxIndex === 0;
    next.disabled = lightboxIndex === lightboxGallery.length - 1;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === lightboxIndex));
  }

  function navigateLightbox(dir) {
    const newIdx = lightboxIndex + dir;
    if (newIdx < 0 || newIdx >= lightboxGallery.length) return;
    lightboxIndex = newIdx;
    updateLightboxImage();
  }

  function closeLightbox() {
    const lb = document.getElementById('mlLightbox');
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Expose for dot buttons
  window._lbGoTo = function (i) {
    lightboxIndex = i;
    updateLightboxImage();
  };

  // ========== HOVER ZOOM ==========
  function initHoverZoom(wrapper, img) {
    const lens = document.createElement('div');
    lens.className = 'zoom-lens';

    const preview = document.createElement('div');
    preview.className = 'zoom-preview';

    const hint = document.createElement('div');
    hint.className = 'zoom-hint';
    hint.textContent = 'Di chuột để zoom';

    wrapper.appendChild(lens);
    wrapper.appendChild(preview);
    wrapper.appendChild(hint);

    const ZOOM = 2.5;

    function updateZoom(e) {
      const rect = wrapper.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;

      // Clamp lens inside wrapper
      x = Math.max(lens.offsetWidth / 2, Math.min(x, wrapper.offsetWidth - lens.offsetWidth / 2));
      y = Math.max(lens.offsetHeight / 2, Math.min(y, wrapper.offsetHeight - lens.offsetHeight / 2));

      lens.style.left = (x - lens.offsetWidth / 2) + 'px';
      lens.style.top = (y - lens.offsetHeight / 2) + 'px';

      // Background position for preview
      const px = (x / wrapper.offsetWidth) * 100;
      const py = (y / wrapper.offsetHeight) * 100;

      const hiRes = img.src.replace('w=200', 'w=1200').replace('w=300', 'w=1200').replace('w=500', 'w=1200').replace('q=70', 'q=90').replace('q=80', 'q=90');

      preview.style.backgroundImage = `url('${hiRes}')`;
      preview.style.backgroundSize = `${wrapper.offsetWidth * ZOOM}px ${wrapper.offsetHeight * ZOOM}px`;
      preview.style.backgroundPosition = `${px}% ${py}%`;

      // Match preview height to wrapper
      preview.style.height = wrapper.offsetHeight + 'px';
    }

    wrapper.addEventListener('mousemove', updateZoom);
  }

  // ========== STICKY MOBILE CTA ==========
  function initStickyMobileCTA() {
    const addToCartBtn = document.querySelector('.btn-primary-custom');
    if (!addToCartBtn) return;

    const cta = document.createElement('div');
    cta.className = 'ml-sticky-cta';
    cta.id = 'mlStickyCTA';
    document.body.appendChild(cta);

    // Watch for product to load
    const observer = new MutationObserver(() => {
      if (!window.currentProduct) return;
      const p = window.currentProduct;
      cta.innerHTML = `
        <img class="ml-sticky-img" src="${safeImageURL(p.image)}" alt="${escapeHTML(p.name)}" id="mlStickyImg" ${imageFallbackAttr()}>
        <div class="ml-sticky-info">
          <div class="ml-sticky-name">${p.name}</div>
          <div class="ml-sticky-price">${new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(p.price)}</div>
        </div>
        <button class="ml-sticky-btn" onclick="addToCartFromDetail()">
          + Thêm Giỏ
        </button>
      `;
      observer.disconnect();
    });

    observer.observe(document.getElementById('detailContent'), { childList: true, subtree: true });

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      const btn = document.querySelector('.btn-primary-custom');
      if (!btn) return;
      const btnRect = btn.getBoundingClientRect();
      const shouldShow = btnRect.bottom < 0; // button scrolled above viewport
      cta.classList.toggle('visible', shouldShow);
    });
  }

  // ========== PATCH detail.js — inject zoom after render ==========
  function patchDetailRenderer() {
    // Watch for mainImage to appear in DOM
    const observer = new MutationObserver(() => {
      const mainImg = document.getElementById('mainImage');
      if (!mainImg || mainImg.dataset.zoomInit) return;
      mainImg.dataset.zoomInit = '1';

      // Wrap main image in zoom-wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'zoom-wrapper';
      mainImg.parentNode.insertBefore(wrapper, mainImg);
      wrapper.appendChild(mainImg);

      // Init hover zoom
      initHoverZoom(wrapper, mainImg);

      // Open lightbox on click
      wrapper.style.cursor = 'zoom-in';
      wrapper.addEventListener('click', () => {
        if (!window.currentProduct) return;
        const gallery = window.currentProduct.gallery;
        const currentSrc = mainImg.src;
        // Find index of current image in gallery
        const idx = gallery.findIndex(g => currentSrc.includes(g.split('?')[0].split('/').pop().split('?')[0]));
        openLightbox(gallery, idx >= 0 ? idx : 0);
      });

      // Update zoom when thumbnail changes
      const origChange = window.changeMainImage;
      window.changeMainImage = function (thumb, src) {
        if (origChange) origChange(thumb, src);
        // Re-init zoom for new image
        initHoverZoom(wrapper, mainImg);
      };

      // Also make thumbnails open lightbox on double-click
      document.querySelectorAll('.detail-thumb').forEach((thumb, i) => {
        thumb.addEventListener('dblclick', () => {
          if (!window.currentProduct) return;
          openLightbox(window.currentProduct.gallery, i);
        });
        thumb.title = 'Click để chọn · Double-click để phóng to';
      });

      observer.disconnect();
    });

    const detailContent = document.getElementById('detailContent');
    if (detailContent) {
      observer.observe(detailContent, { childList: true, subtree: true });
    }
  }

  // ========== INIT ==========
  document.addEventListener('DOMContentLoaded', () => {
    createLightbox();
    patchDetailRenderer();
    initStickyMobileCTA();
  });

})();
