import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Box,
  Stack,
  Alert,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { useAuthStore } from '../store/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore((s) => ({
    register: s.register,
    loading: s.loading,
    error: s.error,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [successMsg, setSuccessMsg] = useState('');

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePasswordMessage = (value: string) => {
    if (!value) return 'Mật khẩu không được để trống';
    if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');
    const errors: typeof localError = {};
    if (!email) errors.email = 'Email không được để trống';
    else if (!validateEmail(email)) errors.email = 'Email không hợp lệ';

    const pwdMsg = validatePasswordMessage(password);
    if (pwdMsg) errors.password = pwdMsg;

    if (!confirmPassword) {
      errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không khớp';
    }

    setLocalError(errors);
    if (Object.keys(errors).length) return;

    try {
      await register({ email, password });
      setSuccessMsg('Đăng ký thành công! Vui lòng đăng nhập.');
      setTimeout(() => navigate('/login'), 600);
    } catch (err) {
      console.error(err);
    }
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg,#7b2ff7,#ff6fb5)',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 6px 18px rgba(123,47,247,0.28)',
    height: 40,
    marginTop: 8,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(180deg, #7b2ff7 0%, #ff7eb3 50%, #ffb86b 100%)',
      }}
    >
      <Box
        style={{
          width: 520,
          maxWidth: 'calc(100% - 48px)',
          textAlign: 'center',
        }}
      >
        <Text ta='center' style={{ fontSize: 44, marginBottom: 8 }}>
          🐟
        </Text>
        <Text
          ta='center'
          style={{
            color: '#fff',
            marginTop: 0,
            fontSize: 26,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Tạo tài khoản mới
        </Text>
        <Text
          ta='center'
          style={{
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 24,
            fontSize: 14,
          }}
        >
          Chơi và lưu tiến trình với SacabamClicker
        </Text>

        <Paper
          radius='md'
          p='xl'
          style={{
            borderRadius: 14,
            padding: 28,
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98), #ffffff 100%)',
          }}
          withBorder
        >
          <form onSubmit={handleSubmit}>
            <Stack gap='md'>
              {(localError.email ||
                localError.password ||
                localError.confirmPassword ||
                error) && (
                <Alert
                  icon={<IconAlertCircle size={18} />}
                  color='red'
                  variant='light'
                  title='Đăng ký thất bại'
                >
                  {localError.email ||
                    localError.password ||
                    localError.confirmPassword ||
                    error}
                </Alert>
              )}

              {successMsg && (
                <Alert
                  icon={<IconCheck size={18} />}
                  color='green'
                  variant='light'
                  title='Thành công'
                >
                  {successMsg}
                </Alert>
              )}

              <div>
                <Text
                  component='label'
                  size='sm'
                  fw={400}
                  style={{
                    marginBottom: 6,
                    display: 'block',
                    textAlign: 'left',
                    color: '#333',
                  }}
                >
                  Email
                </Text>
                <TextInput
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    setLocalError((prev) => ({ ...prev, email: undefined }));
                  }}
                  style={{
                    border: 'none',
                    borderRadius: 0,
                    padding: '8px 0',
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  required
                />
                {localError.email && (
                  <Text size='xs' style={{ color: '#e03131', marginTop: 4 }}>
                    {localError.email}
                  </Text>
                )}
              </div>

              <div>
                <Text
                  component='label'
                  size='sm'
                  fw={400}
                  style={{
                    marginBottom: 6,
                    display: 'block',
                    textAlign: 'left',
                    color: '#333',
                  }}
                >
                  Password
                </Text>
                <PasswordInput
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    setLocalError((prev) => ({ ...prev, password: undefined }));
                  }}
                  style={{
                    border: 'none',
                    borderRadius: 0,
                    padding: '8px 0',
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  required
                />
                {localError.password && (
                  <Text size='xs' style={{ color: '#e03131', marginTop: 4 }}>
                    {localError.password}
                  </Text>
                )}
              </div>

              <div>
                <Text
                  component='label'
                  size='sm'
                  fw={400}
                  style={{
                    marginBottom: 6,
                    display: 'block',
                    textAlign: 'left',
                    color: '#333',
                  }}
                >
                  Confirm Password
                </Text>
                <PasswordInput
                  placeholder='Re-password'
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.currentTarget.value);
                    setLocalError((prev) => ({
                      ...prev,
                      confirmPassword: undefined,
                    }));
                  }}
                  style={{
                    border: 'none',
                    borderRadius: 0,
                    padding: '8px 0',
                    backgroundColor: 'transparent',
                    transition: 'all 0.2s ease',
                  }}
                  required
                />
                {localError.confirmPassword && (
                  <Text size='xs' style={{ color: '#e03131', marginTop: 4 }}>
                    {localError.confirmPassword}
                  </Text>
                )}
              </div>

              <Button
                type='submit'
                fullWidth
                loading={loading}
                disabled={loading}
                style={buttonStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 8px 24px rgba(123,47,247,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 6px 18px rgba(123,47,247,0.28)';
                }}
              >
                Create Account
              </Button>

              <Anchor size='sm' component={Link} to='/login'>
                Đã có tài khoản? Đăng nhập
              </Anchor>
            </Stack>
          </form>
        </Paper>

        <Text
          ta='center'
          style={{
            color: 'rgba(255,255,255,0.9)',
            marginTop: 24,
            fontSize: 12,
          }}
        >
          Develop by Phucdq
        </Text>
      </Box>
    </Box>
  );
}
