import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Kiểu dữ liệu cho người dùng */
export interface User {
  username: string;
  email: string;
  role: "admin" | "user"; // ✅ Phân quyền
}

/** Trạng thái và hành động của Auth Store */
interface AuthState {
  user: User | null;
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
  isAdmin: () => boolean; // ✅ Kiểm tra quyền admin
  isLoggedIn: () => boolean; // ✅ Kiểm tra đăng nhập
}

/** Store Zustand + Persist (lưu vào localStorage) */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      // ✅ Đăng nhập
      login: (user) => set({ user }),

      // ✅ Đăng ký
      register: (user) => set({ user }),

      // ✅ Đăng xuất
      logout: () => set({ user: null }),

      // ✅ Kiểm tra quyền admin
      isAdmin: () => get().user?.role === "admin",

      // ✅ Kiểm tra đã đăng nhập chưa
      isLoggedIn: () => !!get().user,
    }),
    {
      name: "auth-storage", // ✅ Tên key lưu trong localStorage
      partialize: (state) => ({ user: state.user }), // chỉ lưu phần user
    }
  )
);
