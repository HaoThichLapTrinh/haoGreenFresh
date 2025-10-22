// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface ProtectedRouteProps {
  children: JSX.Element;
}

/**
 * ✅ Bảo vệ route chỉ dành cho ADMIN
 * - Nếu chưa đăng nhập → chuyển sang trang login
 * - Nếu đăng nhập nhưng không phải admin → quay lại trang chủ
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAdmin } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
