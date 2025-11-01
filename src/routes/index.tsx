import { UserRoutes } from "./userRoutes";
import { AuthRoutes } from "./authRoutes";  // ✅ Viết hoa A
import { AdminRoutes } from "./adminRoutes"; // ✅ Viết hoa A

export default function AppRoutes() {
  return (
    <>
      <UserRoutes />
      <AuthRoutes />
      <AdminRoutes />
    </>
  );
}
