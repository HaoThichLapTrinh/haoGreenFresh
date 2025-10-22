// src/store/useProductStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Kiểu dữ liệu sản phẩm */
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
  createdAt?: string;
}

/** Store quản lý sản phẩm */
interface ProductStore {
  products: Product[];
  addProduct: (p: Omit<Product, "id" | "createdAt">) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  removeProduct: (id: number) => void;
  clearProducts: () => void;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],

      /** ✅ Thêm sản phẩm mới */
      addProduct: (p) =>
        set({
          products: [
            ...get().products,
            { ...p, id: Date.now(), createdAt: new Date().toISOString() },
          ],
        }),

      /** ✅ Cập nhật sản phẩm */
      updateProduct: (id, data) =>
        set({
          products: get().products.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }),

      /** ✅ Xóa sản phẩm */
      removeProduct: (id) =>
        set({ products: get().products.filter((item) => item.id !== id) }),

      /** ✅ Xóa toàn bộ sản phẩm */
      clearProducts: () => set({ products: [] }),

      /** ✅ Lấy sản phẩm theo ID */
      getProductById: (id) => get().products.find((item) => item.id === id),
    }),
    {
      name: "product-storage", // ✅ lưu vào localStorage
    }
  )
);
