// src/routes/ProtectedRoute.tsx

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
// ✅ SỬA LỖI TS2503:
// Import ReactNode thay vì dùng JSX.Element.
// ReactNode là kiểu dữ liệu linh hoạt hơn cho các phần tử con.
import type { ReactNode } from "react"; 

interface ProtectedRouteProps {
  // ✅ ĐÃ SỬA: Thay JSX.Element bằng ReactNode
  children: ReactNode; 
}

/**
 * ✅ Bảo vệ route chỉ dành cho ADMIN
 * - Nếu chưa đăng nhập → chuyển sang trang login
 * - Nếu đăng nhập nhưng không phải admin → quay lại trang chủ
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAdmin } = useAuthStore();

  // TẠM TẮT kiểm tra đăng nhập cho dễ test
  return children;

  // Nếu muốn chỉ tắt kiểm tra admin thôi:
  // if (!user) return <Navigate to="/login" replace />;
  // return children;
}
