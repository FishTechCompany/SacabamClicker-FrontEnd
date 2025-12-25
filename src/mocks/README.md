# Mock Data Structure

This folder contains all mock data for the frontend application. It's designed to be easily replaced with actual API calls when the backend is ready.

## Files

### `authMock.ts`

Contains mock functions for authentication flows:

- `mockLogin(data: LoginRequest)` - Simulates login API call
- `mockSignup(data: SignupRequest)` - Simulates signup API call
- `mockSendOTP(email: string)` - Simulates OTP sending
- `mockVerifyOTP(email: string, otp: string)` - Simulates OTP verification
- `mockResetPassword(email: string, newPassword: string)` - Simulates password reset

## Usage

```typescript
import { mockLogin } from '@/mocks/authMock';

// Use in your component
const response = await mockLogin({
  email: 'user@example.com',
  password: 'pass123',
});
```

## Test Credentials

For testing the mock authentication:

- **Email**: `demo@example.com`
- **Password**: `Demo@1234`
- **OTP**: `123456`

## Migration to Real API

When the backend API is ready:

1. Create an `api` folder in `src/`
2. Create service files (e.g., `authService.ts`)
3. Replace mock function calls with API calls
4. Update imports across components

Example:

```typescript
// Before (mock)
import { mockLogin } from '@/mocks/authMock';

// After (real API)
import { authService } from '@/api/authService';
```

## Adding New Mock Data

When adding new mock data:

1. Create a new file in this folder (e.g., `productMock.ts`)
2. Export interfaces and mock functions
3. Document test data/credentials
4. Add usage examples in this README
