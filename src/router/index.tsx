// src/router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import { userRoutes } from "../routes/userRoutes";
import { authRoutes } from "../routes/authRoutes";
import { adminRoutes } from "../routes/adminRoutes";

const router = createBrowserRouter([
  // --- ROUTE NGƯỜI DÙNG ---
  ...userRoutes,

  // --- ROUTE ADMIN ---
  ...adminRoutes,

  // --- ĐĂNG NHẬP / ĐĂNG KÝ ---
  ...authRoutes,
]);

export default router;
