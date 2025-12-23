import { create } from 'zustand';
import axiosInstance from '../api/config/axiosConfig';
import { mockLogin, mockSignup } from '../mocks/authMock';

type UserInfo = {
  email: string;
  role?: string;
  permissions?: string[];
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthState = {
  token: string | null;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  hydrateFromStorage: () => void;
};

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';

// Trong giai đoạn chưa có API thật, ưu tiên dùng mock.
// Khi backend sẵn sàng và cấu hình VITE_API_URL, store sẽ tự chuyển sang gọi API thật.
const USE_MOCK = !import.meta.env.VITE_API_URL;

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  hydrateFromStorage: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    set({
      token: storedToken,
      user: storedUser ? JSON.parse(storedUser) : null,
      error: null,
    });
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      if (USE_MOCK) {
        const res = await mockLogin({ email, password });
        if (!res.success || !res.token || !res.user) {
          throw new Error(res.error || 'Sai tài khoản hoặc mật khẩu');
        }
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.user));
        set({ token: res.token, user: res.user, loading: false, error: null });
        return;
      }

      const res = await axiosInstance.post('/auth/login', { email, password });
      const accessToken = res.data?.accessToken || res.data?.token;
      const user: UserInfo = res.data?.user || {
        email,
        role: res.data?.role,
        permissions: res.data?.permissions,
      };

      if (!accessToken) {
        throw new Error('Không nhận được accessToken từ server');
      }

      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      set({ token: accessToken, user, loading: false, error: null });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Sai tài khoản hoặc mật khẩu';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  register: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      if (USE_MOCK) {
        const res = await mockSignup({ email, password, username: email });
        if (!res.success) {
          throw new Error(res.error || 'Đăng ký thất bại');
        }
        set({ loading: false, error: null });
        return;
      }

      await axiosInstance.post('/auth/register', { email, password });
      set({ loading: false, error: null });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Đăng ký thất bại';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    set({ token: null, user: null, error: null });
  },
}));

// Khởi tạo state auth từ localStorage ngay khi load module
// để tránh gọi trong render gây lỗi với React 19.
useAuthStore.getState().hydrateFromStorage();
