import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

/**
 * ProtectedRoute - Bảo vệ các route cần đăng nhập
 * Nếu chưa đăng nhập (không có token) → Redirect về /login
 */
type ProtectedRouteProps = {
  children: React.ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);

  // Nếu chưa có token → Redirect về login
  if (!token) {
    return <Navigate to='/login' replace />;
  }

  // Nếu có token → Cho phép truy cập
  return children;
}
