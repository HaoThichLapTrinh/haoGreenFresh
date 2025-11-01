// src/api/productApi.ts
import axios from "axios";

// 🌐 Base URL backend (chỉnh nếu backend bạn chạy port khác)
const API_URL = "http://localhost:5000/api/products";

export const productApi = {
  /** 🟢 Lấy tất cả sản phẩm */
  async getAll() {
    const res = await axios.get(API_URL);
    return res.data;
  },

  /** 🟢 Lấy sản phẩm theo ID */
  async getById(id: number | string) {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  },

  /** 🟢 Thêm sản phẩm mới */
  async create(product: any) {
    const res = await axios.post(API_URL, product);
    return res.data;
  },

  /** 🟡 Cập nhật sản phẩm */
  async update(id: number | string, data: any) {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  },

  /** 🔴 Xóa sản phẩm */
  async remove(id: number | string) {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  },
};
