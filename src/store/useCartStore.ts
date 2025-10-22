import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
  image?: string // ✅ thêm dòng này
}


type CartStore = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;   // ✅ thêm hàm này
  getTotalItems: () => number;   // ✅ thêm hàm đếm số lượng
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      clearCart: () => set({ items: [] }),

      // ✅ Hàm tính tổng giá tiền
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },

      // ✅ Hàm tính tổng số lượng sản phẩm
      getTotalItems: () => {
        const items = get().items;
        return items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    { name: "cart-storage" }
  )
);
