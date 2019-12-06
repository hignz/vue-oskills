import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:1111'
});

http.CancelToken = axios.CancelToken;
http.isCancel = axios.isCancel;

http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (401 === error.response.status) {
      localStorage.removeItem('accessToken');
      this.$store.state.accessToken = null;
      this.$router.push({ path: '/login' });
    }
    return Promise.reject(error);
  }
);

export default http;
