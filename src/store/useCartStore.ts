import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          })
        } else {
          set({ items: [...get().items, { ...item }] })
        }
      },

      removeFromCart: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },

      clearCart: () => set({ items: [] }),

      // Hàm trả về tổng số lượng
      totalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

      // Hàm trả về tổng tiền
      totalPrice: () =>
        get().items.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'cart-storage', // lưu vào localStorage
    }
  )
)
