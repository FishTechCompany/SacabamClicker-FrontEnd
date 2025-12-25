// Mock data for authentication flows
// This will be replaced with actual API calls later

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Mock login function - simulates API call
export const mockLogin = async (data: LoginRequest): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock success case
      if (data.email === 'demo@example.com' && data.password === 'Demo@1234') {
        resolve({
          success: true,
          user: {
            id: '1',
            username: 'demouser',
            email: data.email,
            createdAt: new Date().toISOString(),
          },
          token: 'mock_token_12345',
        });
      } else {
        // Mock error case
        resolve({
          success: false,
          error: 'Email hoặc mật khẩu không chính xác',
        });
      }
    }, 800);
  });
};

// Mock signup function
export const mockSignup = async (
  data: SignupRequest
): Promise<AuthResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if email already exists (mock)
      if (data.email === 'existing@example.com') {
        resolve({
          success: false,
          error: 'Email này đã được đăng ký',
        });
      } else {
        resolve({
          success: true,
          user: {
            id: Math.random().toString(),
            username: data.username,
            email: data.email,
            createdAt: new Date().toISOString(),
          },
          token: 'mock_token_' + Math.random().toString(36).substr(2, 9),
        });
      }
    }, 1000);
  });
};

// Mock forgot password - send OTP
export const mockSendOTP = async (
  email: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Mã OTP đã được gửi tới ${email}`,
      });
    }, 800);
  });
};

// Mock OTP verification
export const mockVerifyOTP = async (
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock OTP is always "123456"
      if (otp === '123456') {
        resolve({
          success: true,
          message: 'OTP xác thực thành công',
        });
      } else {
        resolve({
          success: false,
          message: 'OTP không chính xác',
        });
      }
    }, 600);
  });
};

// Mock reset password
export const mockResetPassword = async (
  email: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Mật khẩu đã được thay đổi thành công',
      });
    }, 1000);
  });
};
