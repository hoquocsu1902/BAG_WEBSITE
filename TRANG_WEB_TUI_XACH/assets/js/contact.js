// ===== CONTACT.JS =====

function validateContactForm(e) {
  e.preventDefault();
  let isValid = true;

  // Clear all errors first
  document.querySelectorAll('.form-error').forEach(el => el.classList.remove('show'));
  document.querySelectorAll('.form-control-custom').forEach(el => el.classList.remove('is-invalid'));

  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();

  if (!name || name.length < 2) {
    showFieldError('contactName', 'Vui lòng nhập họ tên (ít nhất 2 ký tự)');
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('contactEmail', 'Email không đúng định dạng');
    isValid = false;
  }

  if (phone && !/^(0[3-9][0-9]{8}|0[1-9][0-9]{9})$/.test(phone)) {
    showFieldError('contactPhone', 'Số điện thoại không hợp lệ');
    isValid = false;
  }

  if (!message || message.length < 20) {
    showFieldError('contactMessage', 'Nội dung quá ngắn (ít nhất 20 ký tự)');
    isValid = false;
  }

  if (isValid) {
    showToast('Tin nhắn đã được gửi thành công! Chúng tôi sẽ liên hệ sớm nhất. 💌');
    e.target.reset();
  }
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  if (field) field.classList.add('is-invalid');
  if (error) {
    error.textContent = message;
    error.classList.add('show');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', validateContactForm);

  // Live validation
  ['contactName','contactEmail','contactPhone','contactMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      el.classList.remove('is-invalid');
      const err = document.getElementById(id + 'Error');
      if (err) err.classList.remove('show');
    });
  });
});
