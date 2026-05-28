// ===== REGISTER.JS =====

const registerState = {
  step: 1,
  data: {}
};

function getRegisterValues() {
  return {
    fullname: document.getElementById('regFullname')?.value.trim() || '',
    email: document.getElementById('regEmail')?.value.trim() || '',
    phone: document.getElementById('regPhone')?.value.trim() || '',
    password: document.getElementById('regPassword')?.value || '',
    city: document.getElementById('regCity')?.value || '',
    style: document.getElementById('regStyle')?.value || '',
    gender: document.querySelector('[name="regGender"]:checked')?.value || '',
    customerType: document.querySelector('[name="regCustomerType"]:checked')?.value || '',
    interests: Array.from(document.querySelectorAll('[name="regInterest"]:checked')).map(input => input.value),
    channels: Array.from(document.querySelectorAll('[name="regChannel"]:checked')).map(input => input.value),
    newsletter: document.getElementById('regNewsletter')?.checked || false
  };
}

function setRegisterError(id, message) {
  const error = document.getElementById(id + 'Error');
  const field = document.getElementById(id);
  if (field) field.classList.add('is-invalid');
  if (error) {
    error.textContent = message;
    error.classList.add('show');
  }
}

function clearRegisterErrors() {
  document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
  document.querySelectorAll('.form-error').forEach(error => error.classList.remove('show'));
}

function validateRegisterForm() {
  clearRegisterErrors();
  const data = getRegisterValues();
  let valid = true;

  if (data.fullname.length < 3) {
    setRegisterError('regFullname', 'Họ tên cần ít nhất 3 ký tự');
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    setRegisterError('regEmail', 'Email chưa đúng định dạng');
    valid = false;
  }
  if (!/^(0[3-9][0-9]{8}|0[1-9][0-9]{9})$/.test(data.phone)) {
    setRegisterError('regPhone', 'Số điện thoại chưa hợp lệ');
    valid = false;
  }
  if (data.password.length < 6) {
    setRegisterError('regPassword', 'Mật khẩu cần ít nhất 6 ký tự');
    valid = false;
  }
  if (!data.city) {
    setRegisterError('regCity', 'Vui lòng chọn tỉnh/thành');
    valid = false;
  }
  if (!data.style) {
    setRegisterError('regStyle', 'Vui lòng chọn phong cách');
    valid = false;
  }
  if (!data.gender) {
    showToast('Vui lòng chọn nhóm giới tính/đối tượng', 'error');
    valid = false;
  }
  if (!data.customerType) {
    showToast('Vui lòng chọn nhóm khách hàng', 'error');
    valid = false;
  }
  if (data.interests.length < 1) {
    showToast('Vui lòng chọn ít nhất một danh mục quan tâm', 'error');
    valid = false;
  }
  if (data.channels.length < 1) {
    showToast('Vui lòng chọn ít nhất một kênh nhận tin', 'error');
    valid = false;
  }

  return { valid, data };
}

function renderRegisterPreview(data = getRegisterValues()) {
  const preview = document.getElementById('registerPreview');
  if (!preview) return;
  preview.innerHTML = `
    <div class="preview-grid">
      <div><span>Họ tên</span><strong>${escapeHTML(data.fullname || 'Chưa nhập')}</strong></div>
      <div><span>Email</span><strong>${escapeHTML(data.email || 'Chưa nhập')}</strong></div>
      <div><span>Điện thoại</span><strong>${escapeHTML(data.phone || 'Chưa nhập')}</strong></div>
      <div><span>Khu vực</span><strong>${escapeHTML(data.city || 'Chưa chọn')}</strong></div>
      <div><span>Phong cách</span><strong>${escapeHTML(data.style || 'Chưa chọn')}</strong></div>
      <div><span>Đối tượng</span><strong>${escapeHTML(data.gender || 'Chưa chọn')}</strong></div>
      <div><span>Nhóm khách</span><strong>${escapeHTML(data.customerType || 'Chưa chọn')}</strong></div>
      <div><span>Quan tâm</span><strong>${data.interests.length ? data.interests.map(escapeHTML).join(', ') : 'Chưa chọn'}</strong></div>
      <div><span>Kênh tin</span><strong>${data.channels.length ? data.channels.map(escapeHTML).join(', ') : 'Chưa chọn'}</strong></div>
      <div><span>Newsletter</span><strong>${data.newsletter ? 'Có' : 'Không'}</strong></div>
    </div>
  `;
}

function submitRegister(event) {
  event.preventDefault();
  const result = validateRegisterForm();
  if (!result.valid) return;

  const users = getFromStorage('mlUsers', []);
  if (users.some(user => user.email.toLowerCase() === result.data.email.toLowerCase())) {
    setRegisterError('regEmail', 'Email này đã được đăng ký');
    return;
  }

  const newUser = {
    id: 'USER' + Date.now().toString().slice(-6),
    ...result.data,
    role: 'customer',
    createdAt: new Date().toISOString()
  };
  users.unshift(newUser);
  saveToStorage('mlUsers', users);
  saveToStorage('mlSession', { email: newUser.email, name: newUser.fullname, role: 'customer' });
  renderRegisterPreview(result.data);
  showToast('Đăng ký thành công. Thông tin đã được lưu trong localStorage.');
  document.getElementById('registerSuccess').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (form) form.addEventListener('submit', submitRegister);
  document.querySelectorAll('#registerForm input, #registerForm select').forEach(input => {
    input.addEventListener('input', () => renderRegisterPreview());
    input.addEventListener('change', () => renderRegisterPreview());
  });
  renderRegisterPreview();
});
