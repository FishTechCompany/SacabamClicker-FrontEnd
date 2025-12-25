import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

/**
 * PublicRoute - Chỉ cho phép truy cập khi CHƯA đăng nhập
 * Nếu đã đăng nhập (có token) → Redirect về /home
 * Dùng cho /login, /register
 */
type PublicRouteProps = {
  children: React.ReactElement;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = useAuthStore((state) => state.token);

  // Nếu đã có token → Redirect về home (không cho vào login/register nữa)
  if (token) {
    return <Navigate to='/home' replace />;
  }

  // Nếu chưa có token → Cho phép truy cập
  return children;
}
