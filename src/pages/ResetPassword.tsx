import { useRef, useState } from 'react'; //useRef dùng để tham chiếu đến các input OTP, còn useState để quản lý trạng thái component
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, PasswordInput, Text, Title, Group } from '@mantine/core';
import * as authService from '../api/services/authService';

const validatePasswordMessage = (password: string) => {
  if (!password) return 'Mật khẩu không được để trống';
  if (password.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự.';
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  if (!hasUpper) return 'Mật khẩu phải bao gồm chữ hoa.';
  if (!hasLower) return 'Mật khẩu phải bao gồm chữ thường.';
  if (!hasNumber) return 'Mật khẩu phải bao gồm số.';
  if (!hasSpecial)
    return 'Mật khẩu phải bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*...).';
  return '';
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string } | undefined)?.email;
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [confirmMsg, setConfirmMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]!.focus();
    }
  };

  const handleBackspace = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1]!.focus();
    }
  };

  const checkConfirm = (p: string, c: string) => {
    if (!c) return 'Vui lòng nhập lại mật khẩu để xác nhận.';
    if (p !== c) return 'Mật khẩu và xác nhận mật khẩu không khớp.';
    return 'Xác nhận mật khẩu thành công.';
  };

  const handleSubmit = async () => {
    setPasswordError('');
    const pwdMsg = validatePasswordMessage(password);
    if (pwdMsg) {
      setPasswordError(pwdMsg);
      return;
    }
    const confirmMessage = checkConfirm(password, confirm);
    setConfirmMsg(confirmMessage);
    if (confirmMessage !== 'Xác nhận mật khẩu thành công.') return;

    const otpString = otp.join('');
    if (otpString.length < 6) {
      setConfirmMsg('Vui lòng nhập đầy đủ 6 số OTP');
      return;
    }

    if (!email) {
      setConfirmMsg('Không tìm thấy email');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.resetPassword({
        email,
        otp: otpString,
        newPassword: password,
        confirmPassword: confirm,
      });

      if (response.status === 200) {
        navigate('/login');
        alert(
          'Mật khẩu đã được đặt lại thành công. Vui lòng đăng nhập bằng mật khẩu mới.'
        );
      } else {
        setConfirmMsg(response.message || 'Đặt lại mật khẩu thất bại');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Đặt lại mật khẩu thất bại';
      setConfirmMsg(message);
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
          width: 520,
          padding: 28,
          borderRadius: 12,
          background: 'linear-gradient(180deg,#ffffff, #fbfbff)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Title order={3} style={{ marginBottom: 8 }}>
          Nhập mã OTP & đặt mật khẩu mới
        </Title>
        <Text size='sm' color='dimmed' style={{ marginBottom: 14 }}>
          Mã đã được gửi tới: {email || '—'}
        </Text>

        <Group gap={8} style={{ marginBottom: 12 }}>
          {otp.map((v, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              value={v}
              onChange={(e) => handleOtpChange(i, e.currentTarget.value)}
              onKeyDown={(e) => handleBackspace(i, e)}
              maxLength={1}
              style={{
                width: 44,
                height: 44,
                textAlign: 'center' as const,
                fontSize: 18,
                borderRadius: 8,
                border: '1px solid #e6e6ef',
              }}
            />
          ))}
        </Group>

        <PasswordInput
          label={
            <Text size='sm' fw={400} color='#666'>
              Mật khẩu mới
            </Text>
          }
          placeholder='Nhập mật khẩu'
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          style={{ marginBottom: 10 }}
        />
        {passwordError && (
          <Text color='red' size='sm' style={{ marginBottom: 8 }}>
            {passwordError}
          </Text>
        )}

        <PasswordInput
          label={
            <Text size='sm' fw={400} color='#666'>
              Xác nhận mật khẩu
            </Text>
          }
          placeholder='Nhập lại mật khẩu'
          value={confirm}
          onChange={(e) => {
            setConfirm(e.currentTarget.value);
            setConfirmMsg(checkConfirm(password, e.currentTarget.value));
          }}
          style={{ marginBottom: 8 }}
        />

        {confirmMsg && (
          <Text
            size='sm'
            color={
              confirmMsg === 'Xác nhận mật khẩu thành công.' ? 'green' : 'red'
            }
            style={{ marginBottom: 12 }}
          >
            {confirmMsg}
          </Text>
        )}

        <Group justify='space-between'>
          <Button
            variant='default'
            onClick={() => navigate('/forgot')}
            disabled={loading}
            style={{
              color: '#666',
              borderColor: '#ddd',
              borderRadius: 25,
              transition: 'all 0.3s ease',
            }}
          >
            Quay lại
          </Button>
          <Button
            onClick={handleSubmit}
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
            Xác nhận & Đổi mật khẩu
          </Button>
        </Group>
      </Box>
    </Box>
  );
}
