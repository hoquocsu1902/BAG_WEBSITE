// ===== LOGIN.JS =====

function findLoginUser(email, password) {
  const normalized = email.toLowerCase();
  const demoUsers = [maisonDemoAccount.admin, maisonDemoAccount.customer];
  const registeredUsers = getFromStorage('mlUsers', []);
  return [...demoUsers, ...registeredUsers].find(user =>
    user.email.toLowerCase() === normalized && user.password === password
  );
}

function showLoginError(message) {
  const box = document.getElementById('loginError');
  if (!box) return;
  box.textContent = message;
  box.style.display = 'block';
}

function clearLoginError() {
  const box = document.getElementById('loginError');
  if (!box) return;
  box.textContent = '';
  box.style.display = 'none';
}

function submitLogin(event) {
  event.preventDefault();
  clearLoginError();

  const email = document.getElementById('loginEmail')?.value.trim() || '';
  const password = document.getElementById('loginPassword')?.value || '';
  const role = document.querySelector('[name="loginRole"]:checked')?.value || 'customer';
  const remember = document.getElementById('rememberLogin')?.checked || false;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showLoginError('Email chưa đúng định dạng.');
    return;
  }
  if (!password) {
    showLoginError('Vui lòng nhập mật khẩu.');
    return;
  }

  const user = findLoginUser(email, password);
  if (!user) {
    showLoginError('Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại email và mật khẩu.');
    return;
  }
  if (role !== user.role) {
    showLoginError(role === 'admin'
      ? 'Tài khoản này không có quyền quản trị.'
      : 'Tài khoản này không thuộc vai trò khách hàng.');
    return;
  }

  const session = {
    email: user.email,
    name: user.name || user.fullname || 'HUIT Member',
    role: user.role,
    remember,
    loginAt: new Date().toISOString()
  };
  saveToStorage('mlSession', session);
  showToast('Đăng nhập thành công.');
  window.setTimeout(() => {
    window.location.href = user.role === 'admin' ? 'admin.html' : 'index.html';
  }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) form.addEventListener('submit', submitLogin);

  document.querySelectorAll('#loginEmail, #loginPassword, [name="loginRole"]').forEach(input => {
    input.addEventListener('input', clearLoginError);
    input.addEventListener('change', clearLoginError);
  });
});
