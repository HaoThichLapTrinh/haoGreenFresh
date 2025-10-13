import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  username: string
  email: string
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
  register: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      register: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' } // lưu localStorage
  )
)
