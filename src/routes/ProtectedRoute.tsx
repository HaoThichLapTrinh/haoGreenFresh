import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { ReactNode } from "react"; 

interface ProtectedRouteProps {
  children: ReactNode; 
}

/**
 * Bảo vệ route chỉ dành cho ADMIN
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  // Nếu chưa đăng nhập hoặc không phải admin → về trang chủ
  if (!user || user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Nếu là admin → render children
  return <>{children}</>;
}
