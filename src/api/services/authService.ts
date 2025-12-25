import axiosInstance from '../config/axiosConfig';
import type {
  LoginRequest,
  RegisterRequest,
  ApiResponse,
  LoginResponseData,
  RegisterResponseData,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
} from '../../types/api';

/**
 * Auth Service - Xử lý tất cả API calls liên quan đến Authentication
 */

// ==================== LOGIN ====================

export const login = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponseData>> => {
  const response = await axiosInstance.post<ApiResponse<LoginResponseData>>(
    '/auth/login',
    data
  );
  return response.data;
};

// ==================== REGISTER ====================

export const register = async (
  data: RegisterRequest
): Promise<ApiResponse<RegisterResponseData>> => {
  const response = await axiosInstance.post<ApiResponse<RegisterResponseData>>(
    '/auth/register',
    data
  );
  return response.data;
};

// ==================== PASSWORD RESET ====================

export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    '/auth/forgot',
    data
  );
  return response.data;
};

export const verifyOTP = async (
  data: VerifyOTPRequest
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.post<ApiResponse<null>>(
    '/auth/verify-otp',
    data
  );
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ApiResponse<null>> => {
  const response = await axiosInstance.put<ApiResponse<null>>(
    '/auth/reset',
    data
  );
  return response.data;
};
