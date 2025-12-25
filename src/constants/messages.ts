// Validation messages and constants
export const VALIDATION_MESSAGES = {
  EMAIL: {
    REQUIRED: 'Email không được để trống',
    INVALID: 'Email không hợp lệ',
  },
  PASSWORD: {
    REQUIRED: 'Mật khẩu không được để trống',
    MIN_LENGTH: 'Mật khẩu phải có ít nhất 6 ký tự.',
    MISSING_UPPERCASE: 'Mật khẩu phải bao gồm chữ hoa.',
    MISSING_LOWERCASE: 'Mật khẩu phải bao gồm chữ thường.',
    MISSING_NUMBER: 'Mật khẩu phải bao gồm số.',
    MISSING_SPECIAL:
      'Mật khẩu phải bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*...).',
  },
  CONFIRM_PASSWORD: {
    REQUIRED: 'Vui lòng nhập lại mật khẩu để xác nhận.',
    MISMATCH: 'Mật khẩu và xác nhận mật khẩu không khớp.',
    SUCCESS: 'Xác nhận mật khẩu thành công.',
  },
  USERNAME: {
    REQUIRED: 'User Name không được để trống',
  },
};

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 6,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
};

export const ERROR_TYPES = {
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};
