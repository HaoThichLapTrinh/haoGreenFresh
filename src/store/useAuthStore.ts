import { create } from "zustand";

export interface User {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  phone?: string;
  active?: boolean;
}

interface AuthState {
  users: User[];
  user: User | null;
  register: (newUser: User) => boolean;
  login: (user: User) => void;
  logout: () => void;
  setUserActive: (email: string) => void;
  setUserInactive: (email: string) => void;
}

// ✅ Store
export const useAuthStore = create<AuthState>((set) => ({
  // Một vài tài khoản mặc định
  users: [
    {
      username: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      role: "admin",
      active: false,
    },
    {
      username: "User",
      email: "user@gmail.com",
      password: "123456",
      role: "user",
      active: false,
    },
  ],

  user: null,

  // Đăng ký
  register: (newUser) => {
    let success = false;
    set((state) => {
      const exists = state.users.some((u) => u.email === newUser.email);
      if (!exists) {
        success = true;
        return {
          users: [...state.users, { ...newUser, active: false }],
        };
      }
      return state;
    });
    return success;
  },

  // Đăng nhập
  login: (user) => {
    set({ user: { ...user, active: true } });
    set((state) => ({
      users: state.users.map((u) =>
        u.email === user.email ? { ...u, active: true } : u
      ),
    }));
  },

  // Đăng xuất
  logout: () => {
    set((state) => {
      if (state.user?.email) {
        return {
          user: null,
          users: state.users.map((u) =>
            u.email === state.user?.email ? { ...u, active: false } : u
          ),
        };
      }
      return { user: null };
    });
  },

  // Set user online
  setUserActive: (email) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.email === email ? { ...u, active: true } : u
      ),
    })),

  // Set user offline
  setUserInactive: (email) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.email === email ? { ...u, active: false } : u
      ),
    })),
}));
