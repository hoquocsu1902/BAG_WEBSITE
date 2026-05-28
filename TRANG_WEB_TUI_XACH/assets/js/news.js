// ===== NEWS.JS =====

let activeNewsCategory = 'all';

function getNewsCategories() {
  return ['all', ...new Set(newsData.map(item => item.category))];
}

function renderNewsFilters() {
  const wrap = document.getElementById('newsFilters');
  if (!wrap) return;
  wrap.innerHTML = getNewsCategories().map(category => `
    <button type="button" class="${activeNewsCategory === category ? 'active' : ''}" data-news-category="${escapeHTML(category)}">
      ${category === 'all' ? 'Tất cả' : escapeHTML(category)}
    </button>
  `).join('');
  wrap.querySelectorAll('[data-news-category]').forEach(button => {
    button.addEventListener('click', () => {
      activeNewsCategory = button.dataset.newsCategory;
      renderNews();
    });
  });
}

function createNewsCard(item, featured = false) {
  return `
    <article class="news-card ${featured ? 'featured' : ''}">
      <a href="news.html?id=${item.id}">
        <img src="${safeImageURL(item.image)}" alt="${escapeHTML(item.title)}" ${imageFallbackAttr()}>
      </a>
      <div class="news-card-body">
        <div class="news-meta"><span>${escapeHTML(item.category)}</span><span>${escapeHTML(item.date)}</span></div>
        <h3><a href="news.html?id=${item.id}">${escapeHTML(item.title)}</a></h3>
        <p>${escapeHTML(item.excerpt)}</p>
        <a class="text-link" href="news.html?id=${item.id}">Đọc tiếp <i class="bi bi-arrow-right"></i></a>
      </div>
    </article>
  `;
}

function renderNewsDetail(id) {
  const detail = document.getElementById('newsDetail');
  const list = document.getElementById('newsListSection');
  if (!detail) return false;
  const item = newsData.find(news => Number(news.id) === Number(id));
  if (!item) return false;
  if (list) list.style.display = 'none';
  detail.style.display = 'block';
  detail.innerHTML = `
    <div class="news-detail-hero">
      <img src="${safeImageURL(item.image)}" alt="${escapeHTML(item.title)}" ${imageFallbackAttr()}>
      <div>
        <div class="news-meta"><span>${escapeHTML(item.category)}</span><span>${escapeHTML(item.date)}</span></div>
        <h1>${escapeHTML(item.title)}</h1>
        <p>${escapeHTML(item.excerpt)}</p>
      </div>
    </div>
    <div class="news-detail-body">
      <p>${escapeHTML(item.content)}</p>
      <p>Gợi ý phối đồ: chọn màu trung tính cho ngày làm việc, thêm charm hoặc khăn lụa để tạo điểm nhấn cá nhân.</p>
      <a href="products.html" class="btn-primary-custom">Xem bộ sưu tập</a>
    </div>
  `;
  return true;
}

function renderNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  renderNewsFilters();
  const items = activeNewsCategory === 'all' ? newsData : newsData.filter(item => item.category === activeNewsCategory);
  grid.innerHTML = items.length
    ? items.map((item, index) => `<div class="${index === 0 ? 'col-lg-6' : 'col-lg-3 col-md-6'}">${createNewsCard(item, index === 0)}</div>`).join('')
    : '<div class="col-12"><div class="empty-state"><i class="bi bi-newspaper"></i><h4>Chưa có bài viết</h4><p>Vui lòng chọn danh mục khác.</p></div></div>';
  window.setTimeout(() => {
    if (typeof initScrollReveal === 'function') initScrollReveal();
  }, 40);
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  if (!renderNewsDetail(params.get('id'))) {
    renderNews();
  }
});
