import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Kiểu dữ liệu người dùng */
export interface User {
  id?: number;
  username: string;
  email: string;
  phone?: string;
  password?: string; // ✅ Thêm password để dùng cho register
  role: "admin" | "user";
  active?: boolean;
}

/** Trạng thái và hành động của store */
interface AuthState {
  user: User | null;
  users: User[];
  login: (user: User) => void;
  register: (user: User) => void;
  logout: () => void;
  setUserActive: (email: string) => void;
  setUserInactive: (email: string) => void;
  isAdmin: () => boolean;
  isLoggedIn: () => boolean;
}

/** ✅ Store Zustand + persist */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],

      // ✅ Đăng nhập
      login: (user) => {
        const users = get().users;
        const found = users.find(
          (u) => u.email === user.email && u.password === user.password
        );

        if (found) {
          // Đúng tài khoản → cập nhật trạng thái hoạt động
          set({
            user: { ...found, active: true },
            users: users.map((u) =>
              u.email === found.email ? { ...u, active: true } : u
            ),
          });
        } else {
          // Nếu user chưa có → thêm mới
          const newUser = {
            id: Date.now(),
            username: user.username,
            email: user.email,
            phone: user.phone || "",
            password: user.password,
            role: user.role || "user",
            active: true,
          };
          set((state) => ({
            user: newUser,
            users: [...state.users, newUser],
          }));
        }
      },

      // ✅ Đăng ký
      register: (user) =>
        set((state) => {
          const exists = state.users.some((u) => u.email === user.email);
          if (exists) return state; // Không thêm trùng email
          return {
            user,
            users: [
              ...state.users,
              { ...user, id: Date.now(), active: true },
            ],
          };
        }),

      // ✅ Đăng xuất
      logout: () => {
        const { user, users } = get();
        if (!user) return;
        set({
          user: null,
          users: users.map((u) =>
            u.email === user.email ? { ...u, active: false } : u
          ),
        });
      },

      // ✅ Đánh dấu user hoạt động
      setUserActive: (email) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.email === email ? { ...u, active: true } : u
          ),
        })),

      // ✅ Đánh dấu user không hoạt động
      setUserInactive: (email) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.email === email ? { ...u, active: false } : u
          ),
        })),

      // ✅ Kiểm tra quyền
      isAdmin: () => get().user?.role === "admin",

      // ✅ Kiểm tra đăng nhập
      isLoggedIn: () => !!get().user,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        users: state.users,
      }),
    }
  )
);
