// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ✅ Route bảo vệ chỉ dành cho ADMIN
 * - Nếu chưa đăng nhập → chuyển đến trang /login
 * - Nếu đăng nhập nhưng không phải admin → quay lại /
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthStore();

  // ❌ Nếu chưa đăng nhập → quay về trang đăng nhập
  if (!user) return <Navigate to="/login" replace />;

  // ❌ Nếu đăng nhập nhưng không phải admin → quay về trang chủ
  if (user.role?.toLowerCase() !== "admin") return <Navigate to="/" replace />;

  // ✅ Nếu là admin, cho phép truy cập
  return <>{children}</>;
}
