const API_BASE_URL = 'https://pocketoptionss-backend.onrender.com';

// const API_BASE_URL = 'http://127.0.0.1:3000';
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('user');
      const path = window.location.pathname || '';
      if (!/login\.html$|register\.html$/.test(path)) {
        window.location.href = path.includes('/user/') ? '../login.html' : './login.html';
      }
    }
    return Promise.reject(err);
  }
);