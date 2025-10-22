// src/pages/admin/index.tsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Products from "./Products/Products";
import Orders from "./Orders/Orders";
import Contacts from "./Contacts/Contacts";
import Users from "./Users/Users";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 bg-green-700 text-white flex flex-col p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
        <Link to="/admin/dashboard" className="hover:bg-green-600 p-2 rounded">📊 Dashboard</Link>
        <Link to="/admin/products" className="hover:bg-green-600 p-2 rounded">🛍️ Products</Link>
        <Link to="/admin/orders" className="hover:bg-green-600 p-2 rounded">📦 Orders</Link>
        <Link to="/admin/users" className="hover:bg-green-600 p-2 rounded">👤 Users</Link>
        <Link to="/admin/contacts" className="hover:bg-green-600 p-2 rounded">📩 Contacts</Link>
        <Link to="/" className="hover:bg-green-600 p-2 rounded mt-auto">🏠 Về trang chủ</Link>
      </aside>

      {/* Nội dung */}
      <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="contacts" element={<Contacts />} />
        </Routes>
      </main>
    </div>
  );
}
