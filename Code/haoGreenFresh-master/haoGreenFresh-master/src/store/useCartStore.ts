import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // ✅ có thể có hoặc không ảnh
};

type CartStore = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void; // ✅ thêm hàm chỉnh sửa số lượng
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      // ✅ Thêm sản phẩm vào giỏ
      addToCart: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          // Nếu đã có -> tăng số lượng
          set({
            items: get().items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          // Nếu chưa có -> thêm mới
          set({ items: [...get().items, item] });
        }
      },

      // ✅ Cập nhật số lượng sản phẩm
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          // Nếu nhập 0 hoặc nhỏ hơn -> xóa khỏi giỏ
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
        }
      },

      // ✅ Xóa 1 sản phẩm khỏi giỏ
      removeFromCart: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      // ✅ Xóa toàn bộ giỏ hàng
      clearCart: () => set({ items: [] }),

      // ✅ Tính tổng giá
      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      // ✅ Tính tổng số lượng sản phẩm
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: "cart-storage" } // ✅ Lưu giỏ hàng trong localStorage
  )
);
