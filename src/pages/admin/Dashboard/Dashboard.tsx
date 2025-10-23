import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useOrderStore } from "../../../store/useOrderStore";

export default function Dashboard() {
  const { orders } = useOrderStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map((o) => o.customerName)).size;
  const totalProducts = 128; // ⚙️ giả lập — có thể thay bằng dữ liệu thật

  const data = [
    { name: "T2", sales: 4000 },
    { name: "T3", sales: 3000 },
    { name: "T4", sales: 5000 },
    { name: "T5", sales: 7000 },
    { name: "T6", sales: 6000 },
    { name: "T7", sales: 8000 },
    { name: "CN", sales: 6500 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-600">
        📊 Bảng điều khiển quản trị
      </h1>

      {/* Thống kê nhanh */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Tổng doanh thu" value={`${totalRevenue.toLocaleString()}₫`} color="bg-green-100 text-green-700" />
        <StatCard title="Đơn hàng" value={totalOrders} color="bg-blue-100 text-blue-700" />
        <StatCard title="Khách hàng" value={totalCustomers} color="bg-yellow-100 text-yellow-700" />
        <StatCard title="Sản phẩm" value={totalProducts} color="bg-purple-100 text-purple-700" />
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Biểu đồ doanh thu theo tuần
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: any; color: string }) {
  return (
    <div className={`p-6 rounded-2xl shadow ${color}`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
