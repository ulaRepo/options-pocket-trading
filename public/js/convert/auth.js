async function isLoggedIn() {
  try {
    const { data } = await api.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(data));
    return true;
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return false;
  }
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

function getToken() {
  return localStorage.getItem('token') || null;
}

async function logout() {
  try {
    await api.get('/auth/logout');
  } catch (_) {}
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  const path = window.location.pathname || '';
  if (path.includes('/user/') || path.includes('/admin/')) {
    window.location.href = '../login.html';
  } else {
    window.location.href = './login.html';
  }
}

async function requireAuthPage() {
  const ok = await isLoggedIn();
  if (!ok) {
    const path = window.location.pathname || '';
    if (path.includes('/user/') || path.includes('/admin/')) {
      window.location.href = '../login.html';
    } else {
      window.location.href = './login.html';
    }
  }
}

async function requireAdmin() {
  try {
    const { data } = await api.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(data));
    if (!data || data.role !== 'ADMIN') {
      window.location.href = '../index.html';
    }
  } catch {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '../login.html';
  }
}