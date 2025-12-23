import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ErrorScreen from './pages/ErrorScreen';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<LoginPage defaultTab='signup' />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Navigate to='/home' replace />} />
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
