import React from "react";
import { useOrderStore } from "../../../store/useOrderStore";

export default function Orders() {
  const { orders, updateOrderStatus, removeOrder } = useOrderStore();

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-green-600">📦 Quản lý đơn hàng</h1>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-green-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Khách hàng</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">SĐT</th>
              <th className="p-2 border">Tổng tiền</th>
              <th className="p-2 border">Trạng thái</th>
              <th className="p-2 border">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, index) => (
              <tr key={o.id}>
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{o.customerName}</td>
                <td className="p-2 border">{o.email}</td>
                <td className="p-2 border">{o.phone}</td>
                <td className="p-2 border text-right">
                  {o.total.toLocaleString()}₫
                </td>
                <td className="p-2 border text-center">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      updateOrderStatus(o.id, e.target.value as any)
                    }
                    className="border rounded p-1 text-sm"
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="delivered">Đã giao</option>
                    <option value="canceled">Đã hủy</option>
                  </select>
                </td>
                <td className="p-2 border text-center">
                  <button
                    onClick={() => removeOrder(o.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
