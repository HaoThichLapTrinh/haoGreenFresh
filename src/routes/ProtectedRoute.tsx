import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean; // 👈 thêm tuỳ chọn để reuse cho cả admin & user
}

export function ProtectedRoute({ children, requireAdmin }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  // Nếu chưa đăng nhập → quay về login
  if (!user) return <Navigate to="/login" replace />;

  // Nếu yêu cầu quyền admin mà user không phải admin → quay về trang chủ
  if (requireAdmin && user.role !== "admin") return <Navigate to="/" replace />;

  // Cho phép truy cập
  return <>{children}</>;
}
