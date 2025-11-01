import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const authApi = {
  async register(data: { name: string; email: string; password: string }) {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  },

  async login(data: { email: string; password: string }) {
    const res = await axios.post(`${API_URL}/login`, data);
    return res.data;
  },

  async getMe(token: string) {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};
