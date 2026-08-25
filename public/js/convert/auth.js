async function isLoggedIn() {
  try {
    const { data } = await api.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(data));
    return true;
  } catch {
    localStorage.removeItem('user');
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

async function logout() {
  try {
    await api.get('/auth/logout');
  } catch (_) {}
  localStorage.removeItem('user');
  // Use the same path style as your pages:
  // - if login.html is next to index.html in the frontend root:
  window.location.href = '/frontend/login.html';
  // - if files are under /frontend/ on Live Server, use:
  // window.location.href = '/frontend/login.html';
  // - or relative from a page in /user/:
  // window.location.href = '../login.html';
}

async function requireAuthPage() {
  const ok = await isLoggedIn();
  if (!ok) {
    window.location.href = '/login.html';
    // same path rule as logout
  }
}

async function requireAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'ADMIN') {
    window.location.href = '/index.html';
  }
}