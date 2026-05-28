// ===== HUIT CHATBOT - GEMINI + OFFLINE FALLBACK =====

(function initHuitChatbot() {
  if (document.getElementById('ml-chat-fab')) return;

  const style = document.createElement('style');
  style.textContent = `
    #ml-chat-fab{position:fixed;right:26px;bottom:92px;width:60px;height:60px;border:0;border-radius:50%;background:linear-gradient(135deg,#003A5A,#00B8D4,#99FFFF);color:#003A5A;z-index:9998;box-shadow:0 18px 44px rgba(0,58,90,.28);display:flex;align-items:center;justify-content:center;font-size:1.28rem;transition:.22s ease;font-weight:800}
    #ml-chat-fab:hover{transform:translateY(-4px) scale(1.03);filter:saturate(1.1)}
    #ml-chat-window{position:fixed;right:26px;bottom:166px;width:min(480px,calc(100vw - 28px));height:650px;max-height:calc(100vh - 190px);background:#fff;border:1px solid #BDEFF2;box-shadow:0 24px 80px rgba(0,58,90,.22);z-index:9997;display:flex;flex-direction:column;opacity:0;pointer-events:none;transform:translateY(16px) scale(.96);transition:.22s ease;border-radius:24px;overflow:hidden}
    #ml-chat-window.open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}
    .ml-chat-head{background:linear-gradient(135deg,#003A5A,#006B91,#00B8D4);color:#fff;padding:17px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px}
    .ml-chat-head strong{font-family:var(--font-display);font-size:1.08rem;font-weight:700;letter-spacing:.04em}
    .ml-chat-head span{display:block;color:#99FFFF;font-size:.75rem;margin-top:2px}
    .ml-chat-close{border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.08);color:#fff;width:34px;height:34px;border-radius:50%}
    .ml-chat-messages{flex:1;overflow:auto;background:linear-gradient(180deg,#EFFFFF,#F8FFFF);padding:16px;display:flex;flex-direction:column;gap:10px}
    .ml-msg{max-width:92%;padding:11px 14px;border-radius:18px;font-size:.88rem;line-height:1.58;border:1px solid #BDEFF2;background:#fff;color:#003A5A;box-shadow:0 6px 18px rgba(0,58,90,.06)}
    .ml-msg.user{align-self:flex-end;background:#003A5A;color:#fff;border-color:#003A5A;border-bottom-right-radius:5px}
    .ml-msg.bot{align-self:flex-start;border-bottom-left-radius:5px}
    .ml-msg.loading{opacity:.78;font-style:italic}
    .ml-chat-products{display:grid;grid-template-columns:1fr;gap:8px;margin-top:9px}
    .ml-chat-products-title{font-size:.74rem;font-weight:800;color:#007FAE;letter-spacing:.02em;margin-top:10px;margin-bottom:2px}
    .ml-chat-product{display:flex;gap:10px;align-items:center;text-decoration:none;color:#003A5A;border:1px solid #BDEFF2;background:#F7FFFF;padding:8px;border-radius:16px;transition:.2s ease}
    .ml-chat-product:hover{border-color:#00B8D4;transform:translateY(-1px);background:#EFFFFF}
    .ml-chat-product img{width:50px;height:62px;object-fit:cover;border-radius:12px;background:#fff}
    .ml-chat-product strong{display:block;font-size:.8rem;font-weight:700}
    .ml-chat-product span{font-size:.76rem;color:#007FAE;font-weight:700}
    .ml-quick{display:flex;gap:8px;flex-wrap:wrap;padding:12px 14px;border-top:1px solid #BDEFF2;background:#fff}
    .ml-quick button{border:1px solid #BDEFF2;background:#F7FFFF;color:#426272;border-radius:999px;padding:7px 10px;font-size:.75rem;transition:.18s ease}
    .ml-quick button:hover{background:#003A5A;color:#fff;border-color:#003A5A}
    .ml-chat-form{display:flex;gap:8px;padding:12px 14px;border-top:1px solid #BDEFF2;background:#fff}
    .ml-chat-form input{flex:1;border:1px solid #BDEFF2;border-radius:999px;padding:11px 14px;outline:none;font-size:.86rem}
    .ml-chat-form input:focus{border-color:#00B8D4;box-shadow:0 0 0 3px rgba(153,255,255,.32)}
    .ml-chat-form button{width:44px;border:0;border-radius:50%;background:linear-gradient(135deg,#006B91,#00B8D4,#99FFFF);color:#003A5A;transition:.18s ease;font-weight:800}
    .ml-chat-form button:hover{transform:translateY(-2px)}
  `;
  document.head.appendChild(style);

  const fab = document.createElement('button');
  fab.id = 'ml-chat-fab';
  fab.title = 'Tư vấn HUIT AI';
  fab.innerHTML = '<i class="bi bi-stars"></i>';

  const hasKey = Boolean(window.HUIT_GEMINI_API_KEY && window.HUIT_GEMINI_API_KEY.trim());
  const panel = document.createElement('section');
  panel.id = 'ml-chat-window';
  panel.innerHTML = `
    <div class="ml-chat-head">
      <div><strong>HUIT AI Concierge</strong><span>${hasKey ? ' ' : ' '}</span></div>
      <button class="ml-chat-close" type="button" title="Đóng"><i class="bi bi-x-lg"></i></button>
    </div>
    <div class="ml-chat-messages" id="mlChatMessages"></div>
    <div class="ml-quick">
      <button type="button" data-chat="Tư vấn túi đi làm màu xanh">Túi đi làm</button>
      <button type="button" data-chat="Có mã giảm giá không?">Mã giảm giá</button>
      <button type="button" data-chat="Tôi muốn túi đi tiệc">Đi tiệc</button>
      <button type="button" data-chat="So sánh giúp tôi 3 mẫu túi nổi bật nhất">So sánh mẫu</button>
      <button type="button" data-chat="Chính sách đổi trả thế nào?">Đổi trả</button>
    </div>
    <form class="ml-chat-form" id="mlChatForm">
      <input id="mlChatInput" autocomplete="off" placeholder="Hỏi HUIT AI về túi xách...">
      <button type="submit" title="Gửi"><i class="bi bi-send"></i></button>
    </form>
  `;

  document.body.append(fab, panel);

  const messages = panel.querySelector('#mlChatMessages');
  const form = panel.querySelector('#mlChatForm');
  const input = panel.querySelector('#mlChatInput');

  function normalizeBotReply(text) {
    return String(text || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p\s*>/gi, '\n')
      .replace(/<\/li\s*>/gi, '\n')
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/^\s*[-*]\s+/gm, '• ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function addMessage(type, text, suggestedProducts = [], extraClass = '') {
    const node = document.createElement('div');
    node.className = `ml-msg ${type} ${extraClass}`.trim();
    const displayText = type === 'bot' ? normalizeBotReply(text) : text;
    node.innerHTML = escapeHTML(displayText).replace(/\n/g, '<br>');
    if (suggestedProducts.length) {
      node.insertAdjacentHTML('beforeend', `
        <div class="ml-chat-products-title">Sản phẩm gợi ý</div>
        <div class="ml-chat-products">
          ${suggestedProducts.map(product => `
            <a class="ml-chat-product" href="product-detail.html?id=${product.id}">
              <img src="${safeImageURL(product.image)}" alt="${escapeHTML(product.name)}" ${imageFallbackAttr()}>
              <div>
                <strong>${escapeHTML(product.name)}</strong>
                <span>${formatPrice(product.price)}</span>
              </div>
            </a>
          `).join('')}
        </div>
      `);
    }
    messages.appendChild(node);
    messages.scrollTop = messages.scrollHeight;
    return node;
  }

  function findProductsByIntent(text) {
    const value = text.toLowerCase();
    if (value.includes('xanh') || value.includes('aqua') || value.includes('blue') || value.includes('cyan') || value.includes('navy')) return products.filter(product => /xanh|aqua|blue|cyan|navy|sky|ocean/i.test(`${product.name} ${product.color}`)).slice(0, 3);
    if (value.includes('đi làm') || value.includes('công sở') || value.includes('laptop')) return products.filter(product => product.category === 'office').slice(0, 3);
    if (value.includes('tiệc') || value.includes('clutch') || value.includes('dạ hội')) return products.filter(product => product.category === 'clutch').slice(0, 3);
    if (value.includes('đeo chéo') || value.includes('du lịch') || value.includes('nhỏ') || value.includes('mini')) return products.filter(product => product.category === 'crossbody').slice(0, 3);
    if (value.includes('balo') || value.includes('đi học')) return products.filter(product => product.category === 'backpack').slice(0, 3);
    if (value.includes('rẻ') || value.includes('giá tốt') || value.includes('sale') || value.includes('giảm')) return [...products].sort((a, b) => a.price - b.price).slice(0, 3);
    return products.filter(product => product.isFeatured).slice(0, 3);
  }

  function getOfflineReply(text) {
    const value = text.toLowerCase();
    if (value.includes('đổi trả') || value.includes('bảo hành')) {
      return { text: 'HUIT hỗ trợ đổi trả trong 7 ngày khi sản phẩm còn tem, chưa sử dụng. Lỗi sản xuất được bảo hành 3 tháng. Mình gợi ý vài mẫu dễ chăm sóc bên dưới nhé.', products: products.filter(product => ['tote', 'office'].includes(product.category)).slice(0, 3) };
    }
    if (value.includes('ship') || value.includes('giao')) return { text: 'Đơn từ 500.000đ được miễn phí vận chuyển. Nội thành thường 1-2 ngày, tỉnh khác 3-5 ngày. Khi checkout, phí ship sẽ tự tính theo tổng đơn.', products: [] };
    if (value.includes('mã') || value.includes('giảm') || value.includes('coupon')) return { text: 'Bạn có thể thử SALE10, HUIT20 hoặc NEWUSER trong giỏ hàng. Mã HUIT20 đang là mã giảm mạnh nhất trong bài demo.', products: findProductsByIntent('sale') };
    if (value.includes('admin') || value.includes('đăng nhập')) return { text: 'Tài khoản demo admin: admin@huit.vn / admin123. Admin có quản lý sản phẩm, đơn hàng và thống kê doanh thu bằng localStorage.', products: [] };
    return { text: 'Mình gợi ý các mẫu túi HUIT hợp với nhu cầu của bạn bên dưới. Bạn có thể bấm vào từng sản phẩm để xem chi tiết, chọn size, màu và phụ kiện mua kèm.', products: findProductsByIntent(text) };
  }

  function wantsShortReply(text) {
    return /\b(ngan|tom tat|sieu ngan|brief|short)\b/i.test(text.normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
  }

  function getGeminiModels() {
    const configuredModel = (window.HUIT_GEMINI_MODEL || 'gemini-2.5-flash').trim();
    return [...new Set([configuredModel, 'gemini-2.0-flash', 'gemini-1.5-flash'])].filter(Boolean);
  }

  function readGeminiError(status, rawText) {
    let message = rawText || '';
    try {
      const data = JSON.parse(rawText);
      message = data?.error?.message || data?.message || rawText;
    } catch (_) {}
    message = normalizeBotReply(message).replace(/AIza[\w-]+/g, '[API_KEY]');
    if (!message) message = 'Không đọc được nội dung lỗi từ Gemini.';
    return `Gemini API lỗi ${status}: ${message}`;
  }

  function buildGeminiPrompt(userText, responseStyle, productContext) {
    return `Bạn là chatbot tư vấn bán túi xách cho cửa hàng HUIT.

Yêu cầu trả lời:
- Trả lời tiếng Việt, thân thiện, tự nhiên và hữu ích.
- ${responseStyle}
- Chỉ dùng văn bản thuần, không dùng HTML/CSS, không dùng thẻ span, không dùng style màu.
- Không dùng markdown đậm dạng **...**.
- Nếu cần liệt kê, chỉ chọn tối đa 3-5 gợi ý phù hợp nhất, trừ khi khách yêu cầu xem tất cả sản phẩm.
- Phong cách HUIT: "Vẻ Đẹp Thuần Khiết Vượt Thời Gian".
- Màu chủ đạo: #99FFFF.
- Không bịa giá ngoài danh sách.

Danh sách sản phẩm:
${productContext}

Khách hỏi:
${userText}`;
  }

  async function callGeminiModel(model, apiKey, body) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const rawText = await response.text().catch(() => '');
      throw new Error(readGeminiError(response.status, rawText));
    }

    return response.json();
  }

  async function askGemini(userText) {
    const apiKey = window.HUIT_GEMINI_API_KEY && window.HUIT_GEMINI_API_KEY.trim();
    if (!apiKey) return null;

    const maxOutputTokens = Number(window.HUIT_GEMINI_MAX_OUTPUT_TOKENS) || 1400;
    const shortMode = wantsShortReply(userText);
    const responseStyle = shortMode
      ? 'Người dùng đang muốn câu trả lời ngắn/tóm tắt. Trả lời gọn trong 2-5 câu, đi thẳng vào ý chính.'
      : 'Khi người dùng cần tư vấn, so sánh hoặc giải thích, hãy trả lời đầy đủ vừa đủ, rõ ràng theo từng ý. Không liệt kê toàn bộ danh sách sản phẩm nếu người dùng chưa yêu cầu.';
    const productContext = products.slice(0, 18).map(p => `- ${p.name}: ${formatPrice(p.price)}, loại ${p.category}, màu ${p.color}, chất liệu ${p.material}, tồn ${p.stock}`).join('\n');
    const prompt = buildGeminiPrompt(userText, responseStyle, productContext);

    const body = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.65, maxOutputTokens }
    };

    let lastError = null;
    for (const model of getGeminiModels()) {
      try {
        const data = await callGeminiModel(model, apiKey, body);
        const candidate = data?.candidates?.[0];
        const text = candidate?.content?.parts?.map(part => part.text || '').join('\n').trim() || null;
        const cleanText = text ? normalizeBotReply(text) : null;

        if (!cleanText) {
          const reason = candidate?.finishReason || data?.promptFeedback?.blockReason || 'NO_TEXT';
          throw new Error(`Gemini không trả nội dung (${reason}).`);
        }

        if (candidate?.finishReason === 'MAX_TOKENS') {
          return `${cleanText}\n\n⚠️ Câu trả lời có thể bị rút gọn vì đã chạm giới hạn ${maxOutputTokens} token. Bạn có thể tăng window.HUIT_GEMINI_MAX_OUTPUT_TOKENS trong assets/js/gemini-config.js nếu cần dài hơn.`;
        }

        return cleanText;
      } catch (error) {
        lastError = error;
        const message = String(error?.message || error);
        const canTryNextModel = message.includes('Gemini API lỗi 400') || message.includes('Gemini API lỗi 404');
        if (!canTryNextModel) break;
      }
    }

    throw lastError || new Error('Gemini chưa phản hồi.');
  }

  async function send(text) {
    const clean = text.trim();
    if (!clean) return;
    addMessage('user', clean);
    const typing = addMessage('bot', 'HUIT AI đang tư vấn...', [], 'loading');
    const productsByIntent = findProductsByIntent(clean);
    try {
      const aiText = await askGemini(clean);
      typing.remove();
      if (aiText) addMessage('bot', aiText, productsByIntent);
      else {
        const reply = getOfflineReply(clean);
        addMessage('bot', reply.text, reply.products);
      }
    } catch (error) {
      console.warn(error);
      typing.remove();
      const reply = getOfflineReply(clean);
      const detail = normalizeBotReply(error?.message || error || 'Không rõ lỗi.');
      addMessage('bot', `${reply.text}\n\n(Gemini chưa phản hồi nên HUIT dùng tư vấn offline tạm thời. Chi tiết: ${detail})`, reply.products);
    }
  }

  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) input.focus();
  });
  panel.querySelector('.ml-chat-close').addEventListener('click', () => panel.classList.remove('open'));
  panel.querySelectorAll('[data-chat]').forEach(button => button.addEventListener('click', () => send(button.dataset.chat)));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    send(input.value);
    input.value = '';
  });

  addMessage('bot', hasKey
    ? 'Xin chào! Mình là HUIT AI dùng Gemini. Bạn muốn tìm túi đi làm, đi học, đi tiệc hay cần so sánh giá?'
    : 'Xin chào! Mình là HUIT AI. Hiện chưa có key Gemini trong assets/js/gemini-config.js nên mình đang dùng tư vấn offline.');
})();
