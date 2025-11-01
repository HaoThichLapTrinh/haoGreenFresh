// src/store/useProductStore.ts
import { create } from "zustand";
import { productApi } from "../api/productApi";
import { Product } from "../types/product";


interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
  addProduct: (p: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, data: Partial<Product>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  /** Lấy danh sách sản phẩm từ API */
  fetchProducts: async () => {
    const data = await productApi.getAll();
    set({ products: data });
  },

  /** Thêm sản phẩm mới qua API */
  addProduct: async (p) => {
    const newProduct = await productApi.create(p);
    set({ products: [...get().products, newProduct] });
  },

  /** Cập nhật sản phẩm */
  updateProduct: async (id, data) => {
    const updated = await productApi.update(id, data);
    set({
      products: get().products.map((item) =>
        item.id === id ? updated : item
      ),
    });
  },

  /** Xóa sản phẩm */
  removeProduct: async (id) => {
    await productApi.remove(id);
    set({ products: get().products.filter((item) => item.id !== id) });
  },

  /** Tìm sản phẩm theo ID */
  getProductById: (id) => get().products.find((item) => item.id === id),
}));
