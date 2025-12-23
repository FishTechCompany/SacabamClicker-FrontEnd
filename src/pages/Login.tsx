import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockLogin, mockSignup } from '../mocks/authMock';
import {
  Paper,
  Tabs,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Anchor,
  Box,
  Stack,
  Group,
} from '@mantine/core';

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type LoginPageProps = {
  defaultTab?: 'login' | 'signup';
};

export default function LoginPage({ defaultTab = 'login' }: LoginPageProps) {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<ValidationErrors>({});
  const [signupErrors, setSignupErrors] = useState<ValidationErrors>({});
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupConfirmMessage, setSignupConfirmMessage] = useState('');
  const [signupConfirmStatus, setSignupConfirmStatus] = useState<
    'idle' | 'error' | 'success'
  >('idle');
  const [tab, setTab] = useState<'login' | 'signup'>(defaultTab);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

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

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: ValidationErrors = {};

    if (!loginEmail) {
      errors.email = 'Email không được để trống';
    } else if (!validateEmail(loginEmail)) {
      errors.email = 'Email không hợp lệ';
    }

    const pwdMsg = validatePasswordMessage(loginPassword);
    if (pwdMsg) {
      errors.password = pwdMsg;
    }

    setLoginErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoginLoading(true);

    const res = await mockLogin({
      email: loginEmail,
      password: loginPassword,
    });

    setLoginLoading(false);

    if (res.success) {
      // Lưu token mock để đồng bộ với axios interceptor sau này (nếu cần)
      if (res.token) {
        localStorage.setItem('accessToken', res.token);
      }
      navigate('/home');
    } else {
      setLoginErrors({
        password: res.error,
      });
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: ValidationErrors = {};

    if (!signupEmail) {
      errors.email = 'Email không được để trống';
    } else if (!validateEmail(signupEmail)) {
      errors.email = 'Email không hợp lệ';
    }

    const pwdMsg = validatePasswordMessage(signupPassword);
    if (pwdMsg) {
      errors.password = pwdMsg;
    }

    if (!signupConfirmPassword) {
      errors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
    } else if (signupPassword !== signupConfirmPassword) {
      errors.confirmPassword = 'Mật khẩu và xác nhận mật khẩu không khớp';
    }

    setSignupErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSignupLoading(true);

    const res = await mockSignup({
      email: signupEmail,
      password: signupPassword,
      username: '',
    });

    setSignupLoading(false);

    if (res.success) {
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      setTab('login');
    } else {
      setSignupErrors({
        email: res.error,
      });
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
  } as React.CSSProperties;

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
          width: 560,
          maxWidth: 'calc(100% - 48px)',
          textAlign: 'center',
        }}
      >
        <Text ta='center' style={{ fontSize: 48, marginBottom: 8 }}>
          🐟
        </Text>
        <Text
          ta='center'
          style={{
            color: '#fff',
            marginTop: 0,
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          SacabamClicker
        </Text>
        <Text
          ta='center'
          style={{
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 24,
            fontSize: 14,
          }}
        >
          Click your way to the top!
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
          <Tabs
            value={tab}
            onChange={(v) => setTab(v as 'login' | 'signup')}
            variant='pills'
          >
            <Tabs.List
              style={{
                marginBottom: 20,
                display: 'flex',
                justifyContent: 'center',
                gap: 12,
                backgroundColor: 'transparent',
              }}
            >
              <Tabs.Tab
                value='login'
                style={{
                  flex: '0 1 auto',
                  minWidth: 160,
                  textAlign: 'center',
                  padding: '12px 28px',
                  borderRadius: 22,
                  background: tab === 'login' ? '#7b2ff7' : '#e6e6e6',
                  color: tab === 'login' ? '#fff' : '#9a9a9a',
                  border: 'none',
                  fontWeight: 600,
                  transition:
                    'background 0.28s ease, color 0.28s ease, transform 0.12s ease',
                  cursor: 'pointer',
                  boxShadow:
                    tab === 'login'
                      ? '0 8px 24px rgba(123,47,247,0.18)'
                      : 'none',
                }}
                onClick={() => setTab('login')}
              >
                <span style={{ marginRight: 8 }}>📋</span> Login
              </Tabs.Tab>
              <Tabs.Tab
                value='signup'
                style={{
                  flex: '0 1 auto',
                  minWidth: 160,
                  textAlign: 'center',
                  padding: '12px 28px',
                  borderRadius: 22,
                  background: tab === 'signup' ? '#7b2ff7' : '#e6e6e6',
                  color: tab === 'signup' ? '#fff' : '#9a9a9a',
                  border: 'none',
                  fontWeight: 600,
                  transition:
                    'background 0.28s ease, color 0.28s ease, transform 0.12s ease',
                  cursor: 'pointer',
                  boxShadow:
                    tab === 'signup'
                      ? '0 8px 24px rgba(123,47,247,0.18)'
                      : 'none',
                }}
                onClick={() => setTab('signup')}
              >
                <span style={{ marginRight: 8 }}>👤</span> Sign Up
              </Tabs.Tab>
            </Tabs.List>

            {/* LOGIN TAB */}
            <Tabs.Panel value='login' pt='0'>
              <form onSubmit={handleLoginSubmit}>
                <Stack gap='md'>
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
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.currentTarget.value);
                        setLoginErrors({ ...loginErrors, email: undefined });
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
                    {loginErrors.email && (
                      <Text
                        size='xs'
                        style={{ color: '#e03131', marginTop: 4 }}
                      >
                        {loginErrors.email}
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
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.currentTarget.value);
                        setLoginErrors({ ...loginErrors, password: undefined });
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
                    {loginErrors.password && (
                      <Text
                        size='xs'
                        style={{ color: '#e03131', marginTop: 4 }}
                      >
                        {loginErrors.password}
                      </Text>
                    )}
                  </div>

                  <Button
                    type='submit'
                    fullWidth
                    loading={loginLoading}
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
                    Login
                  </Button>

                  <Group justify='center'>
                    <Anchor
                      size='sm'
                      style={{ color: '#666', cursor: 'pointer' }}
                      onClick={() => navigate('/forgot-password')}
                    >
                      📧 Quên mật khẩu?
                    </Anchor>
                  </Group>
                </Stack>
              </form>
            </Tabs.Panel>

            {/* SIGNUP TAB */}
            <Tabs.Panel value='signup' pt='0'>
              <form onSubmit={handleSignupSubmit}>
                <Stack gap='md'>
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
                      value={signupEmail}
                      onChange={(e) => {
                        setSignupEmail(e.currentTarget.value);
                        setSignupErrors({ ...signupErrors, email: undefined });
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
                    {signupErrors.email && (
                      <Text
                        size='xs'
                        style={{ color: '#e03131', marginTop: 4 }}
                      >
                        {signupErrors.email}
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
                      value={signupPassword}
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        setSignupPassword(val);
                        const pwdMsg = validatePasswordMessage(val);
                        setSignupErrors({
                          ...signupErrors,
                          password: pwdMsg || undefined,
                        });

                        if (signupConfirmPassword) {
                          if (signupConfirmPassword !== val) {
                            setSignupConfirmStatus('error');
                            setSignupConfirmMessage(
                              'Mật khẩu và xác nhận mật khẩu không khớp.'
                            );
                          } else {
                            setSignupConfirmStatus('success');
                            setSignupConfirmMessage(
                              'Xác nhận mật khẩu thành công.'
                            );
                          }
                        }
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
                    {signupErrors.password && (
                      <Text
                        size='xs'
                        style={{ color: '#e03131', marginTop: 4 }}
                      >
                        {signupErrors.password}
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
                      Re-Password
                    </Text>
                    <PasswordInput
                      placeholder='Re-password'
                      value={signupConfirmPassword}
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        setSignupConfirmPassword(val);
                        setSignupErrors({
                          ...signupErrors,
                          confirmPassword: undefined,
                        });

                        if (!val) {
                          setSignupConfirmStatus('error');
                          setSignupConfirmMessage(
                            'Vui lòng nhập lại mật khẩu để xác nhận.'
                          );
                        } else if (val !== signupPassword) {
                          setSignupConfirmStatus('error');
                          setSignupConfirmMessage(
                            'Mật khẩu và xác nhận mật khẩu không khớp.'
                          );
                        } else {
                          setSignupConfirmStatus('success');
                          setSignupConfirmMessage(
                            'Xác nhận mật khẩu thành công.'
                          );
                        }
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
                    {signupConfirmStatus === 'error' &&
                      signupConfirmMessage && (
                        <Text
                          size='xs'
                          style={{ color: '#e03131', marginTop: 4 }}
                        >
                          {signupConfirmMessage}
                        </Text>
                      )}
                    {signupConfirmStatus === 'success' &&
                      signupConfirmMessage && (
                        <Text
                          size='xs'
                          style={{ color: '#2f9e44', marginTop: 4 }}
                        >
                          {signupConfirmMessage}
                        </Text>
                      )}
                  </div>

                  <Button
                    type='submit'
                    fullWidth
                    loading={signupLoading}
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
                </Stack>
              </form>
            </Tabs.Panel>
          </Tabs>
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
