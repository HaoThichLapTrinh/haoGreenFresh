// src/store/useOrderStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Kiểu dữ liệu cho sản phẩm trong đơn hàng */
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/** Kiểu dữ liệu cho một đơn hàng */
export interface Order {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[]; // ✅ Danh sách sản phẩm trong đơn hàng
  total: number;
  status: "pending" | "confirmed" | "delivered" | "canceled";
  createdAt: string;
}

/** Store quản lý đơn hàng */
interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: number, status: Order["status"]) => void;
  removeOrder: (id: number) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      /** ✅ Thêm đơn hàng mới */
      addOrder: (order) => {
        const newOrder: Order = {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: "pending", // ✅ mặc định chờ xử lý
          ...order,
        };

        set({ orders: [...get().orders, newOrder] });
      },

      /** ✅ Cập nhật trạng thái đơn hàng */
      updateOrderStatus: (id, status) =>
        set({
          orders: get().orders.map((o) =>
            o.id === id ? { ...o, status } : o
          ),
        }),

      /** ✅ Xóa một đơn hàng */
      removeOrder: (id) =>
        set({ orders: get().orders.filter((o) => o.id !== id) }),

      /** ✅ Xóa toàn bộ đơn hàng */
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: "order-storage", // ✅ tên key lưu trong localStorage
    }

  )
);
