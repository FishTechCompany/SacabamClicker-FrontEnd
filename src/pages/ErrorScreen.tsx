import React from 'react';
import { Box, Button, Text, Title, Container } from '@mantine/core';

interface ErrorScreenProps {
  errorCode?: number | string;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export default function ErrorScreen({
  errorCode = 500,
  title = 'Oops! Có lỗi xảy ra',
  message = 'Vui lòng thử lại sau',
  onRetry,
  onGoHome,
}: ErrorScreenProps) {
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(180deg, #7b2ff7 0%, #ff7eb3 50%, #ffb86b 100%)',
        padding: '20px',
      }}
    >
      <Container size={480} style={{ textAlign: 'center' }}>
        <Box
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.98), #ffffff 100%)',
            borderRadius: 14,
            padding: 40,
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
          }}
        >
          {/* Error Code */}
          <Text
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#7b2ff7',
              margin: '0 0 16px 0',
            }}
          >
            {errorCode}
          </Text>

          {/* Error Title */}
          <Title order={2} style={{ marginBottom: 16, color: '#333' }}>
            {title}
          </Title>

          {/* Error Message */}
          <Text
            size='sm'
            color='dimmed'
            style={{
              marginBottom: 32,
              lineHeight: 1.6,
              color: '#666',
            }}
          >
            {message}
          </Text>

          {/* Action Buttons */}
          <Box
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {onRetry && (
              <Button
                onClick={onRetry}
                style={{
                  background: 'linear-gradient(90deg,#7b2ff7,#ff6fb5)',
                  color: '#ffffff',
                  borderRadius: 25,
                  border: 'none',
                  padding: '12px 28px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 8px 24px rgba(123,47,247,0.35)';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.currentTarget as HTMLElement;
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = 'none';
                }}
              >
                Thử lại
              </Button>
            )}
            {onGoHome && (
              <Button
                variant='default'
                onClick={onGoHome}
                style={{
                  color: '#666',
                  borderColor: '#ddd',
                  borderRadius: 25,
                  padding: '12px 28px',
                  transition: 'all 0.3s ease',
                }}
              >
                Về trang chủ
              </Button>
            )}
          </Box>
        </Box>

        {/* Footer text */}
        <Text
          size='xs'
          color='dimmed'
          style={{
            marginTop: 24,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với bộ phận hỗ trợ.
        </Text>
      </Container>
    </Box>
  );
}
