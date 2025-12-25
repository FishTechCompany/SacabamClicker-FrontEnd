import { create } from 'zustand';
import * as authService from '../api/services/authService';
import type { UserInfo, GameProfile } from '../types/api';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthState = {
  token: string | null;
  user: UserInfo | null;
  profile: GameProfile | null;
  loading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  hydrateFromStorage: () => void;
};

const TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';
const PROFILE_KEY = 'authProfile';

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  profile: null,
  loading: false,
  error: null,

  hydrateFromStorage: () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    const storedProfile = localStorage.getItem(PROFILE_KEY);
    set({
      token: storedToken,
      user: storedUser ? JSON.parse(storedUser) : null,
      profile: storedProfile ? JSON.parse(storedProfile) : null,
      error: null,
    });
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      // Gọi API
      const response = await authService.login({ email, password });

      // Kiểm tra response status
      if (response.status !== 200 || !response.data) {
        throw new Error(response.message || 'Đăng nhập thất bại');
      }

      const { accessToken, user, profile } = response.data;

      if (!accessToken) {
        throw new Error('Không nhận được accessToken từ server');
      }

      // Map profile từ response sang GameProfile đầy đủ
      const fullProfile: GameProfile | null = profile
        ? {
            id: 0, // Sẽ được cập nhật khi gọi API get profile
            userId: user.id,
            displayName: profile.displayName,
            avatarUrl: profile.avatarUrl,
            currentScore: profile.currentScore,
            clickPower: profile.clickPower,
            upgradeLevel: profile.upgradeLevel,
            status: 'ACTIVE', // Giá trị mặc định
            lastActiveAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
        : null;

      // Lưu vào localStorage
      localStorage.setItem(TOKEN_KEY, accessToken);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      if (fullProfile) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(fullProfile));
      }

      // Lưu vào Zustand store
      set({
        token: accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          permissions: [], // Sẽ decode từ JWT nếu cần
        },
        profile: fullProfile,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      // Xử lý error từ Backend
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Sai tài khoản hoặc mật khẩu';
      set({ error: message, loading: false });
      throw new Error(message);
    }
  },

  register: async ({ email, password, confirmPassword }) => {
    set({ loading: true, error: null });
    try {
      // Gọi API
      const response = await authService.register({
        email,
        password,
        confirmPassword,
      });

      // Kiểm tra response status
      if (response.status !== 201) {
        throw new Error(response.message || 'Đăng ký thất bại');
      }

      set({ loading: false, error: null });
    } catch (err: any) {
      // Xử lý error từ Backend
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
    // Xóa tất cả dữ liệu từ localStorage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PROFILE_KEY);

    // Clear state trong Zustand
    set({ token: null, user: null, profile: null, error: null });

    // Redirect về login (sử dụng window.location để đảm bảo không thể back)
    window.location.href = '/login';
  },
}));

// Khởi tạo state auth từ localStorage ngay khi load module
// để tránh gọi trong render gây lỗi với React 19.
useAuthStore.getState().hydrateFromStorage();
