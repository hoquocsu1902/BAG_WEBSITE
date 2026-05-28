// ===== REVIEWS.JS =====

function getAllReviews(productId = null) {
  const stored = getFromStorage('mlReviews', []);
  const combined = [...reviewData, ...(Array.isArray(stored) ? stored : [])];
  return productId ? combined.filter(review => Number(review.productId) === Number(productId)) : combined;
}

function getReviewStats(reviews) {
  const count = reviews.length;
  const average = count ? reviews.reduce((sum, review) => sum + Number(review.rating), 0) / count : 0;
  const fiveStars = reviews.filter(review => Number(review.rating) === 5).length;
  const recommend = count ? Math.round((fiveStars / count) * 100) : 0;
  return { count, average, recommend };
}

function getReviewProduct(review) {
  return products.find(product => Number(product.id) === Number(review.productId)) || products[0];
}

function createReviewCard(review) {
  const product = getReviewProduct(review);
  const avatar = review.avatar || review.name.split(' ').map(part => part[0]).slice(-2).join('').toUpperCase();
  return `
    <div class="col-lg-4 col-md-6">
      <article class="testimonial-card review-card h-100">
        <div class="review-card-inner">
          <div class="review-head">
            <div class="review-avatar">${escapeHTML(avatar)}</div>
            <div class="review-meta">
              <strong>${escapeHTML(review.name)}</strong>
              <span>Khách hàng HUIT</span>
            </div>
            <div class="review-verified"><i class="bi bi-patch-check-fill"></i> Đã mua</div>
          </div>

          <a class="review-product" href="product-detail.html?id=${product.id}">
            <img src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" ${imageFallbackAttr()}>
            <span>
              <small>Sản phẩm đánh giá</small>
              <b>${escapeHTML(product.name)}</b>
            </span>
          </a>

          <div class="review-stars">${renderStars(Number(review.rating) || 0)}</div>
          <h3>${escapeHTML(review.title)}</h3>
          <p class="testimonial-text">“${escapeHTML(review.content)}”</p>

          <div class="review-foot">
            <span class="review-date">${escapeHTML(review.date)}</span>
            <span style="color:var(--secondary);font-weight:700;font-size:.78rem;">${Number(review.rating).toFixed(1)}/5</span>
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderReviewModule(options = {}) {
  const listId = options.listId || 'reviewList';
  const summaryId = options.summaryId || 'reviewSummary';
  const reviews = getAllReviews(options.productId);
  const list = document.getElementById(listId);
  const summary = document.getElementById(summaryId);
  const stats = getReviewStats(reviews);

  if (summary) {
    summary.innerHTML = `
      <div class="review-stat-card">
        <div>
          <span>${stats.count}</span>
          <small>phản hồi</small>
        </div>
        <div>
          <span>${stats.average.toFixed(1)}</span>
          <small>điểm trung bình</small>
        </div>
        <div>
          <span>${stats.recommend}%</span>
          <small>đánh giá 5 sao</small>
        </div>
        <div class="review-stars">${renderStars(stats.average)}</div>
      </div>
    `;
  }

  if (!list) return;

  if (!reviews.length) {
    list.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <i class="bi bi-chat-square-heart"></i>
          <h4>Chưa có phản hồi</h4>
          <p>Sản phẩm này đang chờ đánh giá đầu tiên từ khách hàng.</p>
        </div>
      </div>
    `;
    return;
  }

  list.innerHTML = reviews.slice(0, options.limit || reviews.length).map(createReviewCard).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('reviewList')) {
    renderReviewModule({ listId: 'reviewList', summaryId: 'reviewSummary', limit: 6 });
  }

  if (document.getElementById('detailReviewList')) {
    const productId = getProductIdFromURL();
    renderReviewModule({
      productId,
      listId: 'detailReviewList',
      summaryId: 'detailReviewSummary',
      limit: 6
    });
  }
});
