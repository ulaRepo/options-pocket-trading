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

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      const path = window.location.pathname || '';
      if (!/login\.html$|register\.html$/.test(path)) {
        if (path.includes('/user/') || path.includes('/admin/')) {
          window.location.href = '../login.html';
        } else {
          window.location.href = './login.html';
        }
      }
    }
    return Promise.reject(err);
  }
);

