import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const TOKEN_KEY = 'accessToken';

// Interceptor: Thêm token vào request
// CHỈ thêm token cho các request KHÔNG thuộc module auth
axiosInstance.interceptors.request.use(
  (config) => {
    // Kiểm tra nếu request KHÔNG phải là auth endpoint
    const isAuthEndpoint = config.url?.startsWith('/auth/');

    if (!isAuthEndpoint) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Handle response errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Chỉ xử lý 401 cho các request không phải auth
    // (vì auth endpoints có thể trả về 401 khi login sai)
    const isAuthEndpoint = error.config?.url?.startsWith('/auth/');

    if (error.response?.status === 401 && !isAuthEndpoint) {
      // Token hết hạn hoặc không hợp lệ -> logout
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('authUser');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
