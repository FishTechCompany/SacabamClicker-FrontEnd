// API Types dựa trên Response Format từ Backend
// Format chuẩn: { status, message, data, errorCode, timestamp }

// ==================== COMMON RESPONSE FORMAT ====================

export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data: T | null;
  errorCode: string | null;
  timestamp: string;
}

// ==================== AUTH TYPES ====================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponseData {
  accessToken: string;
  expiresIn: number;
  user: {
    id: number;
    email: string;
    role: {
      id: number;
      name: string;
    };
  };
  profile: {
    displayName: string | null;
    avatarUrl: string | null;
    currentScore: number;
    clickPower: number;
    upgradeLevel: number;
  };
}

export interface RegisterResponseData {
  userId: number;
  email: string;
}

// ==================== USER TYPES ====================

export interface UserInfo {
  id: number;
  email: string;
  role: {
    id: number;
    name: string;
  };
  permissions?: string[]; // Sẽ được decode từ JWT
}

export interface GameProfile {
  id: number;
  userId: number;
  displayName: string | null;
  avatarUrl: string | null;
  currentScore: number;
  clickPower: number;
  upgradeLevel: number;
  status: string;
  lastActiveAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ==================== GAME TYPES ====================

export interface SyncScoreRequest {
  clickCount: number;
  currentClickPower: number;
}

export interface SyncScoreResponseData {
  newScore: number;
  message?: string;
}

export interface UpgradeRequest {
  // Không cần gửi gì, server tự tính
}

export interface UpgradeResponseData {
  newLevel: number;
  newClickPower: number;
  newScore: number;
  finalPrice: number;
}

// ==================== PASSWORD RESET TYPES ====================

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
