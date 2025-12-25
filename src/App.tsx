import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ErrorScreen from './pages/ErrorScreen';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Chỉ cho phép khi CHƯA đăng nhập */}
        <Route
          path='/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <LoginPage defaultTab='signup' />
            </PublicRoute>
          }
        />
        <Route
          path='/forgot'
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path='/reset'
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* Protected Routes - Chỉ cho phép khi ĐÃ đăng nhập */}
        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path='/' element={<Navigate to='/login' replace />} />

        {/* 404 Error */}
        <Route
          path='*'
          element={
            <ErrorScreen
              errorCode={404}
              title='Không tìm thấy trang'
              message='Đường dẫn không hợp lệ'
              onRetry={() => window.location.replace('/login')}
              onGoHome={() => window.location.replace('/login')}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
