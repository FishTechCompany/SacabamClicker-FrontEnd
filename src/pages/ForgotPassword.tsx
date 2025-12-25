import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextInput, Title, Text, Group } from '@mantine/core';
import * as authService from '../api/services/authService';

const validateEmail = (email: string) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const buttonStyle = {
    background: 'linear-gradient(90deg,#7b2ff7,#ff6fb5)',
    color: '#ffffff',
    border: 'none',
    borderRadius: 25,
    boxShadow: '0 6px 18px rgba(123,47,247,0.28)',
    height: 40,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const handleSend = async () => {
    setError('');
    if (!email) {
      setError('Vui lòng nhập email.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Vui lòng nhập email hợp lệ.');
      return;
    }
    setLoading(true);
    try {
      const response = await authService.forgotPassword({ email });
      if (response.status === 200) {
        navigate('/reset', { state: { email } });
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Có lỗi xảy ra khi gửi OTP';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        background:
          'linear-gradient(180deg, #7b2ff7 0%, #ff7eb3 50%, #ffb86b 100%)',
      }}
    >
      <Box
        style={{
          width: 420,
          padding: 28,
          borderRadius: 12,
          background: 'linear-gradient(180deg,#ffffff, #fbfbff)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Title order={3} style={{ marginBottom: 8 }}>
          Quên mật khẩu
        </Title>
        <Text size='sm' color='dimmed' style={{ marginBottom: 18 }}>
          Nhập email liên kết với tài khoản của bạn. Chúng tôi sẽ gửi mã OTP để
          bạn đặt lại mật khẩu.
        </Text>

        <TextInput
          placeholder='you@example.com'
          label={
            <Text size='sm' fw={400} color='#666'>
              Email
            </Text>
          }
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={error || undefined}
          variant='default'
        />

        <Group justify='space-between' style={{ marginTop: 18 }}>
          <Button
            variant='default'
            onClick={() => navigate('/login')}
            disabled={loading}
            style={
              {
                color: '#666',
                borderColor: '#ddd',
                borderRadius: 25,
                transition: 'all 0.3s ease',
              } as any
            }
          >
            Quay lại
          </Button>
          <Button
            onClick={handleSend}
            loading={loading}
            style={buttonStyle as any}
            onMouseEnter={(e: any) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 8px 24px rgba(123,47,247,0.35)';
            }}
            onMouseLeave={(e: any) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 6px 18px rgba(123,47,247,0.28)';
            }}
          >
            Gửi mã OTP
          </Button>
        </Group>
      </Box>
    </Box>
  );
}
