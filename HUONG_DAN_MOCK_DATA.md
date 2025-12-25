# Hướng Dẫn Dữ Liệu Giả Lập (Mock Data)

Thư mục `src/mocks/` chứa tất cả dữ liệu giả lập cho ứng dụng frontend. Nó được thiết kế để dễ dàng thay thế bằng các lệnh gọi API thực khi backend sẵn sàng.

## Các File

### `authMock.ts`

Chứa các hàm giả lập cho luồng xác thực:

- `mockLogin(data: LoginRequest)` - Giả lập gọi API đăng nhập
- `mockSignup(data: SignupRequest)` - Giả lập gọi API đăng ký
- `mockSendOTP(email: string)` - Giả lập gửi mã OTP
- `mockVerifyOTP(email: string, otp: string)` - Giả lập xác minh OTP
- `mockResetPassword(email: string, newPassword: string)` - Giả lập đặt lại mật khẩu

## Cách Sử Dụng

```typescript
import { mockLogin } from '@/mocks/authMock';

// Sử dụng trong component của bạn
const response = await mockLogin({
  email: 'user@example.com',
  password: 'pass123',
});
```

## Thông Tin Đăng Nhập Kiểm Thử

Để kiểm thử xác thực giả lập:

- **Email**: `demo@example.com`
- **Mật khẩu**: `Demo@1234`
- **Mã OTP**: `123456`

## Di Chuyển Sang API Thực

Khi backend API sẵn sàng:

1. Tạo một thư mục `api` trong `src/`
2. Tạo các file service (ví dụ: `authService.ts`)
3. Thay thế các lệnh gọi hàm giả lập bằng lệnh gọi API
4. Cập nhật import trên toàn bộ các component

Ví dụ:

```typescript
// Trước (giả lập)
import { mockLogin } from '@/mocks/authMock';
const response = await mockLogin(data);

// Sau (API thực)
import { authService } from '@/api/authService';
const response = await authService.login(data);
```

## Thêm Dữ Liệu Giả Lập Mới

Khi thêm dữ liệu giả lập mới:

1. Tạo một file mới trong thư mục `src/mocks/` (ví dụ: `productMock.ts`)
2. Xuất các interface và hàm giả lập
3. Ghi chú thêm dữ liệu kiểm thử/thông tin xác thực
4. Thêm ví dụ sử dụng vào tài liệu này

## Cấu Trúc Thư Mục

```
src/
└── mocks/
    ├── README.md              # Tài liệu gốc (tiếng Anh)
    ├── authMock.ts            # Dữ liệu giả lập xác thực
    └── [các file mock khác]   # Sẽ thêm trong tương lai
```

## Lợi Ích Của Cách Tiếp Cận Này

✅ **Độc lập với Backend**: Phát triển frontend mà không cần chờ API sẵn sàng
✅ **Dễ Bảo Trì**: Thay đổi API một chỗ thay vì khắp nơi
✅ **Kiểm Thử Dễ Dàng**: Mock dữ liệu cho các trường hợp kiểm thử khác nhau
✅ **Demo**: Dễ dàng demo ứng dụng với dữ liệu giả lập
